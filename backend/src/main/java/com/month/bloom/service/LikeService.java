package com.month.bloom.service;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.month.bloom.exception.BadRequestException;
import com.month.bloom.exception.ResourceNotFoundException;
import com.month.bloom.model.Like;
import com.month.bloom.model.Post;
import com.month.bloom.model.User;
import com.month.bloom.payload.LikeRequest;
import com.month.bloom.payload.LikeResponse;
import com.month.bloom.repository.LikeRepository;
import com.month.bloom.repository.PostRepository;
import com.month.bloom.repository.UserRepository;
import com.month.bloom.security.UserPrincipal;

@Service
public class LikeService {
   
   @Autowired
   private LikeRepository likeRepository;
   
   @Autowired
   private PostRepository postRepository;
   
   @Autowired 
   private UserRepository userRepository;
   
   private static final  Logger logger = LoggerFactory.getLogger(LikeService.class);
   
   public LikeResponse storeLike(UserPrincipal currentUser, LikeRequest likeRequest) {
	   Post post = postRepository.getOne(likeRequest.getPostId());
	   User user = userRepository.getOne(currentUser.getId());
	   
	   Like like = new Like(post, user);
	   
	   likeRepository.save(like);
	   
	   LikeResponse likeResponse = new LikeResponse();
	   likeResponse.setPushedLike(likeRequest.isCheckedLike());
	   likeResponse.setTotalLikes(likeRepository.countByPost(post));
	   
	   return likeResponse;
   }
   
   public LikeResponse cancelLike(UserPrincipal currentUser, LikeRequest likeRequest) {
	   Post post = postRepository.getOne(likeRequest.getPostId());
	   User user = userRepository.getOne(currentUser.getId());
	   Like like = likeRepository.findByUserAndPost(user, post)
			   				.orElseThrow(() -> new ResourceNotFoundException("Like", "like", likeRequest));
   
	   likeRepository.delete(like);
	   
	   LikeResponse likeResponse = new LikeResponse();
	   likeResponse.setPushedLike(likeResponse.isPushedLike());
	   likeResponse.setTotalLikes(likeRepository.countByPost(post));
	   
	   return likeResponse;
   }
   
}