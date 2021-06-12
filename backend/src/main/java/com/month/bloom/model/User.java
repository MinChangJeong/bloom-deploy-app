package com.month.bloom.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NaturalId;

import com.month.bloom.model.audit.DateAudit;


@Entity
@Table(name = "users", uniqueConstraints = { 
		@UniqueConstraint(columnNames = { "username" }),
		@UniqueConstraint(columnNames = { "email" }), 
		@UniqueConstraint(columnNames = { "phoneNumber" })

})
public class User extends DateAudit {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 40)
	private String name;

	@NotBlank
	@Size(max = 40)
	private String username;

	@NaturalId
	@NotBlank
	@Size(max = 40)
	@Email
	private String email;

	@NotBlank
	@Size(min = 6, max = 30)
	private String password;

	@Size(max = 50)
	private String phoneNumber;
	
	@Size(max = 300)
	private String bio;

	// relation Role
	@ManyToMany(
			fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", 
				joinColumns = 
					@JoinColumn(name = "user_id"), 
				inverseJoinColumns = 
					@JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	//relation Follow (Recursive Relationship , ManyToMany Relationship)
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id", referencedColumnName = "id")
    private UserProfileImage userProfileImage;
	
	public User() {

	}

	public User(String name, String username, String email, String password) {
		this.name = name;
		this.username = username;
		this.email = email;
		this.password = password;
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	
	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public UserProfileImage getUserProfileImage() {
		return userProfileImage;
	}

	public void setUserProfileImage(UserProfileImage userProfileImage) {
		this.userProfileImage = userProfileImage;
	}

	
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

}
