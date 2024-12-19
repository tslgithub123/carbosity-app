package com.tsl.carbonintensity.api;

import java.util.HashMap;
import java.util.Map;

public class Message {

    private static final Map<String, String> messages = new HashMap<>();

    // Static block to initialize predefined messages
    static {
        // Success Messages parameterized types
        messages.put("USER_CREATED", "User created successfully.");
        messages.put("REGISTRATION_SUCCESS", "Registration successful.");
        messages.put("REGISTRATION_FAILURE", "Registration failed.");
        messages.put("LOGIN_SUCCESS", "Login successful.");
        messages.put("OPERATION_COMPLETED", "Operation completed successfully.");
        messages.put("DATA_RETRIEVED", "Data retrieved successfully.");
        messages.put("USER_UPDATED", "User updated successfully.");

        // Error Messages
        messages.put("USER_ALREADY_EXISTS", "User already exists.");
        messages.put("VALIDATION_ERROR", "Validation failed. Please check the provided details.");
        messages.put("ACCESS_DENIED", "Access denied. You do not have the required permissions.");
        messages.put("RESOURCE_NOT_FOUND", "The requested resource could not be found.");
        messages.put("CONFLICT", "A conflict occurred with the existing data.");
        messages.put("INTERNAL_ERROR", "An unexpected error occurred. Please try again later.");

        // Account Status Messages
        messages.put("ACCOUNT_LOCKED", "The account is locked.");
        messages.put("ACCOUNT_SUSPENDED", "The account is suspended.");
        messages.put("ACCOUNT_PENDING", "The account is pending approval.");
        messages.put("ACCOUNT_IN_REVIEW", "The account is under review.");
        messages.put("ACCOUNT_REJECTED", "The account registration request was rejected.");
        messages.put("ACCOUNT_CORRECTION", "The account requires corrections.");
        messages.put("ACCOUNT_INACTIVE", "The account is inactive. Reactivation is required.");

        // Login & Authentication Messages
        messages.put("INVALID_CREDENTIALS", "Invalid username or password.");
        messages.put("TOKEN_EXPIRED", "The authentication token has expired.");
        messages.put("TOKEN_INVALID", "The authentication token is invalid.");

        // Resource Messages
        messages.put("RESOURCE_CREATED", "Resource created successfully.");
        messages.put("RESOURCE_UPDATED", "Resource updated successfully.");
        messages.put("RESOURCE_DELETED", "Resource deleted successfully.");
        messages.put("RESOURCE_NOT_AVAILABLE", "The requested resource is not available.");

        // Miscellaneous Messages
        messages.put("RATE_LIMIT_EXCEEDED", "Too many requests. Please try again later.");
        messages.put("EMAIL_SENT", "Email sent successfully.");
        messages.put("EMAIL_FAILED", "Failed to send the email.");
        messages.put("PASSWORD_RESET", "Password reset successfully.");
        messages.put("PASSWORD_RESET_FAILED", "Password reset failed.");
    }

    /**
     * Retrieves a message by key.
     *
     * @param key The key of the message.
     * @return The corresponding message, or a default message if the key is not found.
     */
    public static String get(String key) {
        return messages.getOrDefault(key, "Unknown message key: " + key);
    }

    /**
     * Adds or updates a message dynamically.
     *
     * @param key   The key of the message.
     * @param value The message to associate with the key.
     */
    public static void addOrUpdate(String key, String value) {
        messages.put(key, value);
    }

    /**
     * Removes a message by key.
     *
     * @param key The key of the message.
     * @return True if the message was removed, false otherwise.
     */
    public static boolean remove(String key) {
        return messages.remove(key) != null;
    }

    /**
     * Checks if a message exists for a given key.
     *
     * @param key The key to check.
     * @return True if a message exists, false otherwise.
     */
    public static boolean exists(String key) {
        return messages.containsKey(key);
    }
}



