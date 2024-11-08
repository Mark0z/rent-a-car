package mk.server.rentacar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class RentacarServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(RentacarServerApplication.class, args);
    }

}
