package com.tsl.carbonintensity.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "calculations")
public class Calculation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @Column(name = "input_amount", nullable = false)
    private BigDecimal inputAmount;

    @Column(name = "carbon_emission", nullable = false)
    private BigDecimal carbonEmission;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "calculation_type_id", referencedColumnName = "id", nullable = false)
//    private CalculationType calculationType;

    // Constructors, Getters, Setters

    public Calculation() {
    }

    public Calculation(BigDecimal inputAmount, BigDecimal carbonEmission, LocalDateTime timestamp, User user, CalculationType calculationType) {
        this.inputAmount = inputAmount;
        this.carbonEmission = carbonEmission;
        this.timestamp = timestamp;
        this.user = user;
//        this.calculationType = calculationType;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public BigDecimal getInputAmount() {
        return inputAmount;
    }

    public void setInputAmount(BigDecimal inputAmount) {
        this.inputAmount = inputAmount;
    }

    public BigDecimal getCarbonEmission() {
        return carbonEmission;
    }

    public void setCarbonEmission(BigDecimal carbonEmission) {
        this.carbonEmission = carbonEmission;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

//    public CalculationType getCalculationType() {
//        return calculationType;
//    }
//
//    public void setCalculationType(CalculationType calculationType) {
//        this.calculationType = calculationType;
//    }
}
