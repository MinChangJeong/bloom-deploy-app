package com.month.bloom.util;

import java.util.List;
import java.util.stream.Collectors;

import com.month.bloom.model.Post;
import com.month.bloom.model.User;
import com.month.bloom.payload.CommentResponse;
import com.month.bloom.payload.ImageResponse;
import com.month.bloom.payload.PostResponse;
import com.month.bloom.payload.UserSummary;

public class ModelMapper {
	public static PostResponse mapPostToPostResponse(Post post, Long totalLikesCount, User creator, Long userLike) {
		PostResponse postResponse = new PostResponse();
		postResponse.setId(post.getId());
		postResponse.setContent(post.getContent());
		postResponse.setCreationDateTime(post.getCreatedAt());
		
		UserSummary creatorSummary;
		if(creator.getUserProfileImage() != null) {
			creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName(), creator.getUserProfileImage().getData());
			postResponse.setCreatedBy(creatorSummary);
		}
		else {
			creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName(), null);
			postResponse.setCreatedBy(creatorSummary);
		}
		
		List<ImageResponse> imageResponses = post.getImages().stream().map(image -> {
			ImageResponse imageResponse = new ImageResponse();
			imageResponse.setImageId(image.getId());
			imageResponse.setData(image.getData());
			return imageResponse;
		}).collect(Collectors.toList());
		postResponse.setImages(imageResponses);
		
		List<CommentResponse> commentResponses = post.getComments().stream().map(comment -> {
			CommentResponse commentResponse = new CommentResponse();
			commentResponse.setId(comment.getId());
			commentResponse.setText(comment.getText());
			
			// comments안에 대댓글에 대한 정보를 가져오는데 문제가 있음 근데 왜 로컬은 되는데 ubuntu는 안되지?
			User createUser = comment.getUser();
			System.out.println(comment.getPost().getId()+" : "+comment.getText()+" / "+createUser.getId()+":"+createUser.getUsername());
			if(createUser.getUserProfileImage() != null) {
				UserSummary userSummary = new UserSummary(createUser.getId(), createUser.getUsername(), createUser.getName(), createUser.getUserProfileImage().getData());
				commentResponse.setCreatedBy(userSummary);
			}
			else {
				UserSummary userSummary = new UserSummary(createUser.getId(), createUser.getUsername(), createUser.getName(), null);
				commentResponse.setCreatedBy(userSummary);
			}
			
			commentResponse.setCreationDateTime(comment.getCreatedAt());
			if(comment.getComment() != null) {
				commentResponse.setP_comment_id(comment.getComment().getId());
			} 
			else {
				commentResponse.setP_comment_id(null);
			}
			
			return commentResponse;
		}).collect(Collectors.toList());
		postResponse.setComments(commentResponses);
		
		// totalLikeCountMap : {postId : totalLikeCount}
		postResponse.setTotalLikes(totalLikesCount);
		
		if(userLike != null) {
			postResponse.setPushedLike(true);
		} else
			postResponse.setPushedLike(false);

		return postResponse;
		
	}
	
}
