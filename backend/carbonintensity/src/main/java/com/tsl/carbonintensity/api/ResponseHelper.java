package com.tsl.carbonintensity.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Map;

public class ResponseHelper {

    /**
     * Build a generic success response.
     *
     * @param status     The status of the response (e.g., SUCCESS).
     * @param messageKey The message key to retrieve from the Message class.
     * @param data       The response data payload.
     * @return A ResponseEntity containing the ApiResponse.
     */
    public static <T> ResponseEntity<ApiResponse<T>> buildSuccessResponse(String status, String messageKey, T data) {
        ApiResponse<T> response = new ApiResponse<>(status, messageKey, data);
        return ResponseEntity.ok(response);
    }

    /**
     * Build an error response.
     *
     * @param status     The status of the response (e.g., ERROR).
     * @param messageKey The message key to retrieve from the Message class.
     * @param httpStatus The HTTP status for the error response.
     * @return A ResponseEntity containing the ApiResponse.
     */
    public static ResponseEntity<ApiResponse<Object>> buildErrorResponse(String status, String messageKey, HttpStatus httpStatus) {
        ApiResponse<Object> response = new ApiResponse<>(status, messageKey, null);
        return ResponseEntity.status(httpStatus).body(response);
    }

    /**
     * Build an authentication response.
     *
     * @param status     The status of the response (e.g., SUCCESS).
     * @param messageKey The message key to retrieve from the Message class.
     * @param data      The response data payload with token.
     * @return A ResponseEntity containing the ApiResponse.
     */
    public static <T> ResponseEntity<ApiResponse<T>>  buildAuthResponse(String token, String status, String messageKey, T data) {
        ApiResponse<T> response = new ApiResponse<>(status, messageKey, data);
        return ResponseEntity.ok().header("Authorization", "Bearer " + token).body(response);
    }

    /**
     * Build a not found response for a specific entity.
     *
     * @param entityName The name of the entity (e.g., "User").
     * @param entityId   The ID of the entity.
     * @return A ResponseEntity containing the ApiResponse.
     */
    public static ResponseEntity<ApiResponse<Object>> buildNotFoundResponse(String entityName, String entityId) {
        String messageKey = "ENTITY_NOT_FOUND";
        String formattedMessage = String.format(Message.get(messageKey), entityName, entityId);
        ApiResponse<Object> response = new ApiResponse<>(Status.ERROR, formattedMessage, null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    /**
     * Build a conflict response, typically for duplicate resources.
     *
     * @param messageKey The message key to retrieve from the Message class.
     * @return A ResponseEntity containing the ApiResponse.
     */
    public static ResponseEntity<ApiResponse<Object>> buildConflictResponse(String messageKey) {
        ApiResponse<Object> response = new ApiResponse<>(Status.ERROR, messageKey, null);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    /**
     * Build a validation error response.
     *
     * @param validationErrors   A map of validation errors with field names as keys and error messages as values.
     * @return A ResponseEntity containing the ApiResponse.
     */
    public static ResponseEntity<ApiResponse<Object>> buildValidationErrorResponse(String messageKey, Map<String, String> validationErrors) {
        ApiResponse<Object> response = new ApiResponse<>(Status.ERROR, messageKey, validationErrors);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    /**
     * Build a rate limit exceeded response.
     *
     * @return A ResponseEntity containing the ApiResponse.
     */
    public static ResponseEntity<ApiResponse<Object>> buildRateLimitExceededResponse(String message, String token) {
        ApiResponse<Object> response = new ApiResponse<>(Status.ERROR, message, null);
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(response);
    }

    /**
     * Build an unauthorized response.
     *
     * @param messageKey The message key to retrieve from the Message class.
     * @return A ResponseEntity containing the ApiResponse.
     */
    public static ResponseEntity<ApiResponse<Object>> buildUnauthorizedResponse(String messageKey) {
        ApiResponse<Object> response = new ApiResponse<>(Status.ERROR, messageKey, null);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    /**
     * Build a forbidden response for unauthorized actions.
     *
     * @param action The action the user is not allowed to perform.
     * @return A ResponseEntity containing the ApiResponse.
     */
    public static ResponseEntity<ApiResponse<Object>> buildNotAllowedResponse(String action) {
        String formattedMessage = String.format("You are not allowed to perform this action: %s", action);
        ApiResponse<Object> response = new ApiResponse<>(Status.ERROR, formattedMessage, null);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
    }

    /**
     * Build an internal server error response.
     *
     * @param ex    The exception to include in the response.
     * @return A ResponseEntity containing the ApiResponse.
     */
    public static ResponseEntity<ApiResponse<Object>> buildInternalServerErrorResponse(Exception ex) {
        ApiResponse<Object> response = new ApiResponse<>(Status.ERROR, "INTERNAL_SERVER_ERROR", ex.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}




