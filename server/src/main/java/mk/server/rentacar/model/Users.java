package mk.server.rentacar.model;

import jakarta.persistence.*;
import lombok.*;
import mk.server.rentacar.model.enums.Roles;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(nullable = false)
    private Enum<Roles> role;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(nullable = false)
    private String phone;
    @Column(name = "date_joined", nullable = false)
    private Date dateJoined;
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
    @Column(name = "loyalty_points", nullable = false)
    private Integer loyaltyPoints;

    @OneToMany(mappedBy = "users")
    private Set<Reservations> reservations = new HashSet<>();
}
