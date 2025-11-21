package com.warehouse.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.FileWriter;

@Component
public class SSLConfig {

    @PostConstruct
    public void init() throws Exception {
        String caCert = System.getenv("DB_SSL_CA");
        if (caCert != null) {
            FileWriter writer = new FileWriter("aiven-ca.pem");
            writer.write(caCert);
            writer.close();
            System.out.println("Aiven CA certificate written to aiven-ca.pem");
        } else {
            System.out.println("DB_SSL_CA is not set. SSL will fail.");
        }
    }
}
