package com.tsl.carbonintensity.repository;

import com.tsl.carbonintensity.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {
  @Query("SELECT u FROM User u WHERE u.email.emailAddress = :email")
  Optional<User> findByEmail(String email);
}