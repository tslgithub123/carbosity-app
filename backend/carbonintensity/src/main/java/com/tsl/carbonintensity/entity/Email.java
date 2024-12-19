package com.tsl.carbonintensity.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import java.util.UUID;


@Entity
@Table(name = "email")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Email {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Size(max = 255)
    @NotNull
    @Column(name = "email_address", nullable = false)
    private String emailAddress;

    @Column(name = "email_status")
    private String emailStatus;

    public Email() {
    }

    public Email(UUID id, String emailAddress, String emailStatus) {
        this.id = id;
        this.emailAddress = emailAddress;
        this.emailStatus = emailStatus;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailId(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getEmailStatus() {
        return emailStatus;
    }

    public void setEmailStatus(String emailStatus) {
        this.emailStatus = emailStatus;
    }

    @Override
    public String toString() {
        return "Email{" +
                "id=" + id +
                ", emailAddress='" + emailAddress + '\'' +
                ", emailStatus='" + emailStatus + '\'' +
                '}';
    }
}