package mk.server.rentacar.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import mk.server.rentacar.model.enums.StatusTypes;

import java.text.DecimalFormat;
import java.util.Date;

@Entity
@Table(name = "reservations")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reservations {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users users;
    @ManyToOne
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Cars cars;

    @Column(name = "start_date",nullable = false)
    private Date startDate;
    @Column(name = "end_date",nullable = false)
    private Date endDate;
    private Enum<StatusTypes> status;
    @Column(name = "total_price",nullable = false)
    private DecimalFormat totalPrice;
}
