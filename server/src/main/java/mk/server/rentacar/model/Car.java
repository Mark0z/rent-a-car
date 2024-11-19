package mk.server.rentacar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cars")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private String model;
    @Column(nullable = false)
    private Integer year;
    @Column(name = "fuel_type", nullable = false)
    private String fuelType;
    @Column(name = "price_per_day", nullable = false)
    private BigDecimal pricePerDay;
    @Column(nullable = false)
    private Integer mileage;
    @Column(name = "transmission_types", nullable = false)
    private String transmission;
    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;
    @Column(name = "registration_number", nullable = false)
    private String registrationNumber;

    @OneToMany(mappedBy = "car")
    private Set<Reservation> reservations = new HashSet<>();
}
