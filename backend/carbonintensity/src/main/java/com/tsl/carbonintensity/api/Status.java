package com.tsl.carbonintensity.api;

public class Status {
    // general api status
    public static final String SUCCESS = "SUCCESS";
    public static final String ERROR = "ERROR";
    public static final String IN_PROGRESS = "IN_PROGRESS";
    public static final String FAILED_VALIDATION = "FAILED_VALIDATION";
    public static final String FAILED_AUTHENTICATION = "FAILED_AUTHENTICATION";

    // login status
    public static final String INVALID_CREDENTIALS = "INVALID_CREDENTIALS";
    public static final String LOGIN_FAILED = "LOGIN_FAILED";
    public static final String USER_NOT_FOUND = "USER_NOT_FOUND";


    // user status
    public static final String ACTIVE = "ACTIVE";
    public static final String INACTIVE = "INACTIVE";
    public static final String SUSPENDED = "SUSPENDED";
    public static final String LOCKED = "LOCKED";
    public static final String DELETED = "DELETED";
}