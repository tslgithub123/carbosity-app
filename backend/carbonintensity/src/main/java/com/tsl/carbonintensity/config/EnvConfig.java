package com.tsl.carbonintensity.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Paths;

@Configuration
public class EnvConfig {

    @Bean
    public Dotenv dotenv() {
        System.out.println("Loading .env file from " + Paths.get(System.getProperty("user.dir"), ".env").toString());
        Dotenv dotenv = Dotenv.configure().directory(Paths.get(System.getProperty("user.dir"), ".env").toString()).load();
        System.out.println("SPRING_DATASOURCE_URL: " + dotenv.get("SPRING_DATASOURCE_URL"));
        return dotenv;
    }
}

