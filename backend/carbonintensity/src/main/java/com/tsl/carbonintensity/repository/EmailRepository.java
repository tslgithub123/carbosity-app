package com.tsl.carbonintensity.repository;

import com.tsl.carbonintensity.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface EmailRepository extends JpaRepository<Email, UUID> {

}
