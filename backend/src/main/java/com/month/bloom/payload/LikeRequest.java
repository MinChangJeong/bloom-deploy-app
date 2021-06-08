package com.month.bloom.payload;

public class LikeRequest {
	private Long postId;
	private boolean checkedLike;

	public Long getPostId() {
		return postId;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}

	public boolean isCheckedLike() {
		return checkedLike;
	}

	public void setCheckedLike(boolean checkedLike) {
		this.checkedLike = checkedLike;
	}
	
	
}
