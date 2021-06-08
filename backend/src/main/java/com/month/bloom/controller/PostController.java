  
package com.month.bloom.controller;

import java.net.URI;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.month.bloom.model.Comment;
import com.month.bloom.model.Post;
import com.month.bloom.model.User;
import com.month.bloom.payload.ApiResponse;
import com.month.bloom.payload.CommentRequest;
import com.month.bloom.payload.CommentResponse;
import com.month.bloom.payload.LikeRequest;
import com.month.bloom.payload.LikeResponse;
import com.month.bloom.payload.PagedResponse;
import com.month.bloom.payload.PostRequest;
import com.month.bloom.payload.PostResponse;
import com.month.bloom.payload.UserSummary;
import com.month.bloom.repository.CommentRepository;
import com.month.bloom.repository.LikeRepository;
import com.month.bloom.repository.PostRepository;
import com.month.bloom.repository.UserRepository;
import com.month.bloom.security.CurrentUser;
import com.month.bloom.security.UserPrincipal;
import com.month.bloom.service.LikeService;
import com.month.bloom.service.PostService;
import com.month.bloom.util.AppConstants;

@RestController
@RequestMapping("/api/posts")
public class PostController {

	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private LikeRepository likeRepsitory;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private PostService postService;
	
	@Autowired 
	private LikeService likeService;
	
	private static final Logger logger = LoggerFactory.getLogger(PostController.class);

	@GetMapping("/explore")
	public PagedResponse<PostResponse> getAllPosts(@CurrentUser UserPrincipal currentUser,
            									@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            									@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {
		return postService.getAllPosts(currentUser, page, size);
	}
	
	@GetMapping
	public PagedResponse<PostResponse> getFollowedUserPosts(@CurrentUser UserPrincipal currentUser,
												@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
												@RequestParam(value = "size", defaultValue = AppConstants.DEFAULT_PAGE_SIZE) int size) {	
		return postService.getFollowedUserPosts(currentUser, page, size);
	}
	
	@PostMapping
	@PreAuthorize("hasRole('USER')")
	// MultipartFile can't use JSON data (@RequestBody means use of JSON or XML data with maps your DTO bean) 
	// So Use @ModelAttribute
	public ResponseEntity<?> createPost(@Valid @ModelAttribute PostRequest postReqeust,
										@CurrentUser UserPrincipal currentUser) {
		
		Post post = postService.createPost(postReqeust, currentUser);
		
		// Rest API를 구현하는 과정에서 특정값을 포함한 URI를 전달하는 상황
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{postId}")
				.buildAndExpand(post.getId())
				.toUri();
		
		return ResponseEntity.created(location)
				.body(new ApiResponse(true, "Post Created Successfully"));
	}	
	
	@DeleteMapping
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> deletePost(@RequestParam(value ="postId") Long postId) {
		postService.deletePost(postId);
		
		return ResponseEntity.created(null)
				.body(new ApiResponse(true, "Post Successfully deleted"));
	}
	
//	@DeleteMapping
//	@PreAuthorize("hasRole('USER')")
//	public PagedResponse<PostResponse> deletePost(@CurrentUser UserPrincipal currentUser,
//										@RequestParam(value ="postId") Long postId) {
//		postService.deletePost(postId);
//	
//		return postService.getAllPosts(currentUser, 0, 30);
//	}
	
	@PostMapping("/likes")
	@PreAuthorize("hasRole('USER')")
	public LikeResponse addLike(@CurrentUser UserPrincipal currentUser, 
								@Valid @RequestBody LikeRequest likeRequest) {
		
		return likeService.storeLike(currentUser, likeRequest);
		
	}
	
	@DeleteMapping("/deletelikes")
	@PreAuthorize("hasRole('USER')")
	public LikeResponse cancelLike(@CurrentUser UserPrincipal currentUser,
										@Valid @RequestBody LikeRequest likeRequest) {
		
		return likeService.cancelLike(currentUser, likeRequest);
	}

	// comment
	@PostMapping("/comments")
	@PreAuthorize("hasRole('USER')")
	public CommentResponse saveComment(@CurrentUser UserPrincipal currentUser, 
									    @Valid @RequestBody CommentRequest commentRequest) {
		System.out.println(commentRequest.getText()+ " : "+ commentRequest.getP_comment_id());
		Comment comment = postService.createComment(currentUser, commentRequest);
		
		User user= userRepository.getOne(currentUser.getId());
		
		if(commentRequest.getP_comment_id() == null) {
			if(user.getUserProfileImage() != null) {
				UserSummary userSummary = new UserSummary(user.getId(), user.getUsername(), user.getName(), user.getUserProfileImage().getData());
				CommentResponse commentResponse = new CommentResponse(comment.getId(), commentRequest.getText(),
						userSummary, comment.getCreatedAt(), null);
				return commentResponse;
			}
			else {
				UserSummary userSummary = new UserSummary(user.getId(), user.getUsername(), user.getName(), null);
				CommentResponse commentResponse = new CommentResponse(comment.getId(), commentRequest.getText(),
						 userSummary, comment.getCreatedAt(), null);
				return commentResponse;
			}
		}
		else {
			if(user.getUserProfileImage() != null) {
				UserSummary userSummary = new UserSummary(user.getId(), user.getUsername(), user.getName(), user.getUserProfileImage().getData());
				CommentResponse commentResponse = new CommentResponse(comment.getId(), commentRequest.getText(),
						userSummary, comment.getCreatedAt(), commentRequest.getP_comment_id());
				return commentResponse;
			}
			else {
				UserSummary userSummary = new UserSummary(user.getId(), user.getUsername(), user.getName(), null);
				CommentResponse commentResponse = new CommentResponse(comment.getId(), commentRequest.getText(),
						userSummary, comment.getCreatedAt(), commentRequest.getP_comment_id());
				return commentResponse;
			}
			
		}
		
	}
	
	@DeleteMapping("/deletecomments")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> deleteComment(@CurrentUser UserPrincipal currentUser, 
											@RequestParam(value = "commentId") Long commentId) {
		Comment comment = commentRepository.getOne(commentId);
		commentRepository.delete(comment);
		
		return ResponseEntity.created(null)
				.body(new ApiResponse(true, "Post Successfully deleted"));
	}
	
	@GetMapping("/updateIsDeletedcomments")
	@PreAuthorize("hasRole('USER')")
	public CommentResponse updateIsDeletedComment(@RequestParam(value = "commentId") Long commentId) {
		Comment comment = commentRepository.getOne(commentId);
		commentRepository.updateIsDelete(commentId, "Deleted Comment");
		
		if(comment.getUser().getUserProfileImage() != null) {
			UserSummary userSummary = new UserSummary(comment.getUser().getId(), comment.getUser().getUsername(), comment.getUser().getName(), comment.getUser().getUserProfileImage().getData());
			CommentResponse commentResponse = new CommentResponse(comment.getId(), comment.getText(), 
					userSummary, comment.getCreatedAt(), comment.getComment().getId());
			return commentResponse;
		}
		else {
			UserSummary userSummary = new UserSummary(comment.getUser().getId(), comment.getUser().getUsername(), comment.getUser().getName(), null);
			CommentResponse commentResponse = new CommentResponse(comment.getId(), comment.getText(),
					userSummary, comment.getCreatedAt(), comment.getComment().getId());
			return commentResponse;
		}
	}

}
