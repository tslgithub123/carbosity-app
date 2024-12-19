package com.tsl.carbonintensity.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequestDto {
    private String emailId;
    private String password;

    public LoginRequestDto() {
    }

    public LoginRequestDto(String emailId, String password) {
        this.emailId = emailId;
        this.password = password;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "LoginRequestDto{" +
                "username='" + emailId + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}

