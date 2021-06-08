package com.month.bloom.payload;

import java.time.Instant;
import java.util.List;

import com.month.bloom.model.Comment;

public class CommentResponse {
	private Long id;
	private String text;
	private UserSummary createdBy;
	private Instant creationDateTime;
	private Long p_comment_id; 
	
	public CommentResponse() {
		
	}
	
	public CommentResponse(Long id, String text, UserSummary createdBy, Instant creationDateTime, Long p_comment_id) {
		this.id = id;
		this.text = text;
		this.createdBy = createdBy;
		this.creationDateTime = creationDateTime;
		this.p_comment_id = p_comment_id;
	}
	public CommentResponse(String text, UserSummary createdBy, Instant creationDateTime, Long p_comment_id) {
		this.text = text;
		this.createdBy = createdBy;
		this.creationDateTime = creationDateTime;
		this.p_comment_id = p_comment_id;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public UserSummary getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(UserSummary createdBy) {
		this.createdBy = createdBy;
	}
	public Instant getCreationDateTime() {
		return creationDateTime;
	}
	public void setCreationDateTime(Instant creationDateTime) {
		this.creationDateTime = creationDateTime;
	}
	public Long getP_comment_id() {
		return p_comment_id;
	}
	public void setP_comment_id(Long p_comment_id) {
		this.p_comment_id = p_comment_id;
	}
	
	

}
