package com.yourapp.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.FileWriter;

@Component
public class SSLConfig {

    @PostConstruct
    public void init() throws Exception {
        String caCert = System.getenv("AIVEN_CA_CERT");
        if (caCert != null) {
            FileWriter fw = new FileWriter("aiven-ca.pem");
            fw.write(caCert);
            fw.close();
        }
    }
}
