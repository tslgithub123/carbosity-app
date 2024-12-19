package com.tsl.carbonintensity.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class ApiConfig {

    @Bean
    public OpenAPI defineOpenApi() {
        Server server = new Server();
        server.setUrl("http://localhost:8085");
        server.setDescription("Development");

        Contact myContact = new Contact();
        myContact.setName("Dhananjay Yelwande");
        myContact.setEmail("yelwandedhananjay@gmail.com");
        Info information = new Info()
                .title("Carbon Intensity Project")
                .version("1.0")
                .description("This API exposes endpoints of Carbon Intensity Application.")
                .contact(myContact);
        return new OpenAPI().info(information).servers(List.of(server));
    }
}
