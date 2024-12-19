package com.tsl.carbonintensity.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "role")
public class Role implements GrantedAuthority {

    @Id
    @JsonIgnore
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @JsonIgnore
    @Column(name = "name", unique = true, nullable = false, length = 50)
    private String name;

    @Override
    public String getAuthority() {
        return name;
    }

    public Role() {
        super();
    }

    public Role(UUID id, String name) {
        super();
        this.id = id;
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
