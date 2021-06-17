package com.month.bloom.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
//import org.springframework.security.crypto.password.;

import com.month.bloom.exception.FileStorageException;
import com.month.bloom.model.User;
import com.month.bloom.model.UserProfileImage;
import com.month.bloom.payload.ApiResponse;
import com.month.bloom.payload.ProfileImageRequest;
import com.month.bloom.payload.UserEditInfo;
import com.month.bloom.repository.UserRepository;
import com.month.bloom.security.CurrentUser;
import com.month.bloom.security.UserPrincipal;

@RestController
@RequestMapping("/api")
public class AccountsController {

	@Autowired
	private UserRepository userRepository;


	// 1. Edit Profile
	// set => profile image, phonNum
	// update => username, name, Bio, email, 
	
	// 2. Change Password
	// Old Password => true => New Password, Confirm New Password
	
	@PostMapping("/accounts/edits/image")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> editUserProfileImage(@CurrentUser UserPrincipal currentUser,
										@Valid @ModelAttribute ProfileImageRequest imageRequest) {
		MultipartFile file = imageRequest.getImage();
		
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());
		
        User user = userRepository.getOne(currentUser.getId());
        
        
		try {
            if(fileName.contains("..")) {
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            UserProfileImage userProfileImage = new UserProfileImage();
            userProfileImage.setFileName(fileName);
            userProfileImage.setFileType(file.getContentType());
            userProfileImage.setData(file.getBytes());
            
            user.setUserProfileImage(userProfileImage);
            
        } catch (IOException ex) {
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
		
		userRepository.save(user);
		
		
		return ResponseEntity.created(null)
				.body(new ApiResponse(true, "Profile Image Successfully Updated!")); 
	}
	
	
	@PostMapping("/accounts/edit")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> editUserInfo(@Valid @RequestBody UserEditInfo userEditInfo) {
		User user = userRepository.getOne(userEditInfo.getUserId());
		
		if(!user.getUsername().equals(userEditInfo.getUsername())) {
			if(userRepository.existsByUsername(userEditInfo.getUsername())) {
	            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
	                    HttpStatus.BAD_REQUEST);
	        }
		}
		if(!user.getEmail().equals(userEditInfo.getEmail())) {
	        if(userRepository.existsByEmail(userEditInfo.getEmail())) {
	            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
	                    HttpStatus.BAD_REQUEST);
	        }
		}
          
        userRepository.updateUser(userEditInfo.getUserId(),
        						userEditInfo.getUsername(),
        						userEditInfo.getName(),
        						userEditInfo.getBio(),
        						userEditInfo.getEmail(),
        						userEditInfo.getPhoneNumber());
        
        return ResponseEntity.created(null)
        		.body(new ApiResponse(true, "User Info Successfully Udated!"));
        
	}
	
//	@PostMapping("/accounts/edit/password")
//	@PreAuthorize("hasRole('USER')")
//	public ResponseEntity<?> editUserPassword(@CurrentUser UserPrincipal currentUser,
//												@Valid @RequestBody PasswordRequest passwordRequest){
//		User user = userRepository.getOne(currentUser.getId());
//		
//		
//	}
	
	@GetMapping("/accounts/deleteUser")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> deleteUser(@CurrentUser UserPrincipal currentUser) {
		User user = userRepository.getOne(currentUser.getId());
		
		userRepository.delete(user);
		
		return ResponseEntity.created(null)
					.body(new ApiResponse(true, "User Successfully Deleted"));
	}
}
