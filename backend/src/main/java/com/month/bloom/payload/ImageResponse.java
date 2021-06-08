package com.month.bloom.payload;

import java.util.List;

public class ImageResponse {	
	private String imageId;
	private byte[] data;
	
	public String getImageId() {
		return imageId;
	}
	public void setImageId(String imageId) {
		this.imageId = imageId;
	}
	
	public byte[] getData() {
		return data;
	}
	public void setData(byte[] data) {
		this.data = data;
	}

}
