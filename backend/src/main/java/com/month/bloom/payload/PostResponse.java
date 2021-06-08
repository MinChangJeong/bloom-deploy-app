package com.month.bloom.payload;

import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

public class PostResponse {
	private Long id;
	private String content;
	private List<ImageResponse> images;
	private List<CommentResponse> comments;
	private UserSummary createdBy;
	private Instant creationDateTime;
	
	@JsonInclude(JsonInclude.Include.NON_NULL)
	private boolean pushedLike;
	private Long totalLikes;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public List<ImageResponse> getImages() {
		return images;
	}
	public void setImages(List<ImageResponse> images) {
		this.images = images;
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
	public List<CommentResponse> getComments() {
		return comments;
	}
	public void setComments(List<CommentResponse> comments) {
		this.comments = comments;
	}
	
}
