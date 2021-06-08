package com.month.bloom.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.month.bloom.model.Like;
import com.month.bloom.model.LikeCount;
import com.month.bloom.model.Post;
import com.month.bloom.model.User;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long>{

	@Query("SELECT NEW com.month.bloom.model.LikeCount(l.post.id, count(l.id)) FROM Like l WHERE l.post.id = :postId")
	LikeCount countTotalLikesByPostIds(@Param("postId") Long postId);

	@Query("SELECT l FROM Like l WHERE l.user.id = :userId and l.post.id in :postId")
	List<Like> findByUserIdAndPostIdIn(@Param("userId") Long userId, @Param("postId") List<Long> postId);
	
	Optional<Like> findByUserAndPost(User user, Post post);
	
	Long countByPost(Post post);
}
