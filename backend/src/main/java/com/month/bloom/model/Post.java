package com.month.bloom.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import com.month.bloom.model.audit.UserDateAudit;

@Entity
@Table(name="posts")
public class Post extends UserDateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 140)
	private String content;

	@OneToMany(
			mappedBy="post",
			cascade = CascadeType.ALL,
			fetch = FetchType.EAGER,
			orphanRemoval = true)
    @Fetch(FetchMode.SELECT)
    @BatchSize(size = 30)
    private List<Image> images = new ArrayList<>();

	@OneToMany(
			mappedBy="post",
			cascade = CascadeType.ALL,
			orphanRemoval = true)
	private List<Comment> comments = new ArrayList<>();
	
	@OneToMany(
			mappedBy="post",
			cascade = CascadeType.ALL,
			fetch = FetchType.EAGER,
			orphanRemoval = true)
	private List<Like> likes = new ArrayList<>();
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
	
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

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}
		
	public void addImage(Image image) {
		images.add(image);
		image.setPost(this);
	}
	
	
	public void removeImage(Image image) {
		images.remove(image);
		image.setPost(this);
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	
	public void addComment(Comment comment) {
		comments.add(comment);
		comment.setPost(this);
	}
	
	public void removeComment(Comment comment) {
		comments.remove(comment);
		comment.setPost(this);
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Like> getLikes() {
		return likes;
	}

	public void setLikes(List<Like> likes) {
		this.likes = likes;
	}
	
	
	
	
}
