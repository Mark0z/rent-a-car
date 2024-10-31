package mk.server.rentacar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.server.rentacar.model.enums.FuelTypes;
import mk.server.rentacar.model.enums.TransmissionTypes;

import java.text.DecimalFormat;
import java.time.Year;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cars")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cars {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private String model;
    @Column(nullable = false)
    private Year year;
    @Column(name = "fuel_type",nullable = false)
    private Enum<FuelTypes> fuelType;
    @Column(name = "price_per_day",nullable = false)
    private DecimalFormat pricePerDay;
    @Column(nullable = false)
    private Integer mileage;
    @Column(nullable = false)
    private Enum<TransmissionTypes> transmission;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "registration_number", nullable = false)
    private String registrationNumber;

    @OneToMany(mappedBy = "cars")
    private Set<Reservations> reservations = new HashSet<>();
}
