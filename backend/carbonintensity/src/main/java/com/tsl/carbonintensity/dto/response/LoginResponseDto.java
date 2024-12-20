package com.tsl.carbonintensity.dto.response;

import com.tsl.carbonintensity.entity.User;

public class LoginResponseDto {
    private String token;
    private User user;

    public LoginResponseDto() {
    }

    public LoginResponseDto(String token, User user){
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
