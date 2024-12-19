package com.tsl.carbonintensity.controller;

import com.tsl.carbonintensity.api.ApiResponse;
import com.tsl.carbonintensity.api.ResponseHelper;
import com.tsl.carbonintensity.dto.request.LoginRequestDto;
import com.tsl.carbonintensity.dto.response.LoginResponseDto;
import com.tsl.carbonintensity.entity.User;
import com.tsl.carbonintensity.exception.UserNotFoundException;
import com.tsl.carbonintensity.repository.UserRepository;
import com.tsl.carbonintensity.security.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;

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
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(@RequestBody LoginRequestDto request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmailAddress(), request.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = userRepository.findByEmail(request.getEmailAddress())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
        String jwt = jwtUtils.generateToken((UserDetails) authentication.getPrincipal());
        return ResponseHelper.buildSuccessResponse("SUCCESS", "LOGIN_SUCCESS", new LoginResponseDto(jwt,user.getEmail().getEmailAddress(),user.getRoles().toString(),user.getFirstName(), user.getLastName()));
    }

    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(UUID.randomUUID().toString());
    }
}
