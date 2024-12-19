package com.tsl.carbonintensity.dto.response;

public class LoginResponse {

    private String emailId;
    private String role;
    private String firstName;
    private String lastName;

    public LoginResponse() {
    }

    public LoginResponse(String emailId, String role, String firstName, String lastName) {
        this.emailId = emailId;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
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
