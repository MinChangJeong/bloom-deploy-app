package com.month.bloom.model;

public class LikeCount {
	private Long postId;
	private Long likeCount;

	public LikeCount(Long postId, Long likeCount) {
		this.postId = postId;
		this.likeCount = likeCount;
	}
	
	public Long getPostId() {
		return postId;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}

	public Long getLikeCount() {
		return likeCount;
	}

	public void setLikeCount(Long likeCount) {
		this.likeCount = likeCount;
	}

	 
}
