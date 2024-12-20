package com.tsl.carbonintensity.controller;

import com.tsl.carbonintensity.api.ApiResponse;
import com.tsl.carbonintensity.api.ResponseHelper;
import com.tsl.carbonintensity.dto.request.LoginRequestDto;
import com.tsl.carbonintensity.dto.response.LoginResponseDto;
import com.tsl.carbonintensity.entity.User;
import com.tsl.carbonintensity.exception.UserNotFoundException;
import com.tsl.carbonintensity.repository.UserRepository;
import com.tsl.carbonintensity.security.JwtUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Object>> login(@RequestBody LoginRequestDto request) {
        try {
            if (request.getEmailAddress() == null || request.getPassword() == null) {
                return ResponseHelper.buildValidationErrorResponse(
                        "VALIDATION_ERROR",
                        Map.of(
                                "emailAddress", "Email address is required",
                                "password", "Password is required"
                        )
                );
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmailAddress(), request.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            User user = userRepository.findByEmail(request.getEmailAddress())
                    .orElseThrow(() -> new UserNotFoundException("User not found"));

//            if (!user.isEnabled() || user.isLocked()) {
//                return ResponseHelper.buildNotAllowedResponse("Account is locked or disabled.");
//            }

            String jwt;
            try {
                jwt = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());
            } catch (Exception e) {
                return ResponseHelper.buildInternalServerErrorResponse(e);
            }

            return ResponseHelper.buildAuthResponse(jwt, "SUCCESS", "LOGIN_SUCCESS", user);

        } catch (BadCredentialsException ex) {
            return ResponseHelper.buildUnauthorizedResponse("INVALID_CREDENTIALS");
        } catch (UserNotFoundException ex) {
            return ResponseHelper.buildNotFoundResponse("User", request.getEmailAddress());
        } catch (LockedException | DisabledException ex) {
            return ResponseHelper.buildNotAllowedResponse("Your account is locked or disabled.");
        } catch (Exception ex) {
            return ResponseHelper.buildInternalServerErrorResponse(ex);
        }
    }



    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(UUID.randomUUID().toString());
    }
}
