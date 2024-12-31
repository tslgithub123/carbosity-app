package com.tsl.carbonintensity.controller;

import com.tsl.carbonintensity.api.ApiResponse;
import com.tsl.carbonintensity.api.ResponseHelper;
import com.tsl.carbonintensity.dto.request.LoginRequestDto;
import com.tsl.carbonintensity.dto.request.RegistrationRequestDto;
import com.tsl.carbonintensity.entity.Email;
import com.tsl.carbonintensity.entity.User;
import com.tsl.carbonintensity.exception.UserNotFoundException;
import com.tsl.carbonintensity.repository.EmailRepository;
import com.tsl.carbonintensity.repository.UserRepository;
import com.tsl.carbonintensity.security.JwtUtils;
import com.tsl.carbonintensity.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;
    private final EmailRepository emailRepository;
    private final UserService userService;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, JwtUtils jwtUtils, PasswordEncoder passwordEncoder, EmailRepository emailRepository, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        this.passwordEncoder = passwordEncoder;
        this.emailRepository = emailRepository;
        this.userService = userService;
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

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Object>> register(@RequestBody RegistrationRequestDto request) {
        System.out.println("Registering user: " + request);
        try {
            if (request.getEmailAddress() == null || request.getPassword() == null) {
                return ResponseHelper.buildValidationErrorResponse(
                        "VALIDATION_ERROR",
                        Map.of(
                                "email", "Email address is required",
                                "password", "Password is required"
                        )
                );
            }

            if (userRepository.checkByEmail(request.getEmailAddress()) != null) {
                return ResponseHelper.buildErrorResponse("EMAIL_ALREADY_EXISTS", "USER_ALREADY_EXISTS", HttpStatus.CONFLICT);
            }

            // Save user in a transactional service method
            User user = userService.createUser(request);

            // Authenticate manually or move to a committed transaction
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    request.getEmailAddress(),
                    request.getPassword()
            );

            String jwt = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());

            return ResponseHelper.buildAuthResponse(jwt, "SUCCESS", "REGISTRATION_SUCCESS", user);
        } catch (Exception ex) {
            return ResponseHelper.buildInternalServerErrorResponse(ex);
        }
    }




    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(UUID.randomUUID().toString());
    }
}
