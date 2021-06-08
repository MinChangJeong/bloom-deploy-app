package com.month.bloom.payload;

import javax.validation.constraints.NotBlank;

public class CommentRequest {
	private Long postId;
	
	private Long p_comment_id;
	
	@NotBlank
	private String text;

	public Long getPostId() {
		return postId;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}

	public Long getP_comment_id() {
		return p_comment_id;
	}

	public void setP_comment_id(Long p_comment_id) {
		this.p_comment_id = p_comment_id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

}
