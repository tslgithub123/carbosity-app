package com.tsl.carbonintensity.service;

import com.tsl.carbonintensity.entity.User;
import com.tsl.carbonintensity.repository.UserRepository;

import com.tsl.carbonintensity.security.UserDetailsImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(emailId)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + emailId));
        return UserDetailsImpl.build(user);
    }
}

