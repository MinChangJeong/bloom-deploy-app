package com.month.bloom.payload;

public class LikeResponse {
	private boolean pushedLike;
	private Long totalLikes;
	
	public boolean isPushedLike() {
		return pushedLike;
	}
	public void setPushedLike(boolean pushedLike) {
		this.pushedLike = pushedLike;
	}
	public Long getTotalLikes() {
		return totalLikes;
	}
	public void setTotalLikes(Long totalLikes) {
		this.totalLikes = totalLikes;
	}
	
	
}
