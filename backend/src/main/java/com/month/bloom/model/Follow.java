package com.month.bloom.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.month.bloom.model.audit.DateAudit;

@Entity
@Table(name = "followes")
public class Follow extends DateAudit{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne
	@JoinColumn(name = "following_id", nullable = false)
	User following;
	
	@ManyToOne
	@JoinColumn(name = "follower_id", nullable = false)
	User follower;
	

	public Follow() {
		
	}


	public Follow(User follower, User following) {
		this.follower = follower;
		this.following = following;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public User getFollower() {
		return follower;
	}


	public void setFollower(User follower) {
		this.follower = follower;
	}


	public User getFollowing() {
		return following;
	}


	public void setFollowing(User following) {
		this.following = following;
	}

}
