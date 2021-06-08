package com.month.bloom.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.month.bloom.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	
	@Modifying  
	@Transactional
	@Query("UPDATE Comment c SET c.text = :text, c.isDeleted = true  WHERE c.id = :commentId")
	void updateIsDelete(@Param("commentId") Long commentId, @Param("text") String text);
}
