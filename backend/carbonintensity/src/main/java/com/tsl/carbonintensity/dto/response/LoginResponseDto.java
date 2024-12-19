package com.tsl.carbonintensity.dto.response;

public class LoginResponseDto {
    private String token;
    private String emailAddress;
    private String role;
    private String firstName;
    private String lastName;

    public LoginResponseDto() {
    }

    public LoginResponseDto(String token, String emailAddress, String role, String firstName, String lastName) {
        this.token = token;
        this.emailAddress = emailAddress;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
}
