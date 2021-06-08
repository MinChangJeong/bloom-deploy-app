package com.month.bloom.payload;

import java.time.Instant;

public class UserProfile {
   private Long id; 
   private String username;
   private String name;
   private Instant joinedAt;
   private Long postCount;
   // 프로필 이미지
   private byte[] profileImage;
   // 팔로우, 팔로잉 수 
   private Long totalFollowers;
   private Long totalFollowings;

   private String bio;
   private String phoneNumber;
   
   public UserProfile(Long id, String username, String name, Instant joinedAt, Long postCount, byte[] profileImage,
         Long totalFollowers, Long totalFollowings, String bio, String phoneNumber) {
      this.id = id;
      this.username = username;
      this.name = name;
      this.joinedAt = joinedAt;
      this.postCount = postCount;
      this.profileImage = profileImage;
      this.totalFollowers = totalFollowers;
      this.totalFollowings = totalFollowings;
      this.bio = bio;
      this.phoneNumber = phoneNumber;
   }

   public Long getId() {
      return id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public String getUsername() {
      return username;
   }

   public void setUsername(String username) {
      this.username = username;
   }

   public String getName() {
      return name;
   }

   public void setName(String name) {
      this.name = name;
   }

   public Instant getJoinedAt() {
      return joinedAt;
   }

   public void setJoinedAt(Instant joinedAt) {
      this.joinedAt = joinedAt;
   }

   public Long getPostCount() {
      return postCount;
   }

   public void setPostCount(Long postCount) {
      this.postCount = postCount;
   }

   public byte[] getProfileImage() {
      return profileImage;
   }

   public void setProfileImage(byte[] profileImage) {
      this.profileImage = profileImage;
   }

   public Long getTotalFollowers() {
      return totalFollowers;
   }

   public void setTotalFollowers(Long totalFollowers) {
      this.totalFollowers = totalFollowers;
   }

   public Long getTotalFollowings() {
      return totalFollowings;
   }

   public void setTotalFollowings(Long totalFollowings) {
      this.totalFollowings = totalFollowings;
   }

   public String getBio() {
      return bio;
   }

   public void setBio(String bio) {
      this.bio = bio;
   }

   public String getPhoneNumber() {
      return phoneNumber;
   }

   public void setPhoneNumber(String phoneNumber) {
      this.phoneNumber = phoneNumber;
   }
   
}