package com.tsl.carbonintensity.service;

import com.tsl.carbonintensity.repository.EmailRepository;
import com.tsl.carbonintensity.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class userService {
    private final UserRepository userRepository;
    private final EmailRepository emailRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, EmailRepository emailRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailRepository = emailRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User createUser(RegistrationRequestDto request) {
        // Validate inputs (optional: you might already do this at the controller level)
        if (request.getEmailAddress() == null || request.getPassword() == null) {
            throw new IllegalArgumentException("Email and Password are required");
        }

        // Check if the email already exists
        if (userRepository.checkByEmail(request.getEmailAddress()) != null) {
            throw new IllegalStateException("User with this email already exists");
        }

        // Create and save Email entity
        Email email = new Email();
        email.setEmailId(request.getEmailAddress());
        email.setEmailStatus("ACTIVE");
        emailRepository.save(email);

        // Create and save User entity
        User user = new User();
        user.setEmail(email);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhoneNumber(request.getPhoneNumber());
        userRepository.save(user);

        return user;
    }
}
