package mk.server.rentacar.controller;

import mk.server.rentacar.model.Car;
import mk.server.rentacar.service.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cars")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping("/")
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Optional<Car> selectedCar = carService.getCarById(id);
        return selectedCar.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        Car savedCarList = carService.saveCar(car);
        return new ResponseEntity<>(savedCarList, HttpStatus.CREATED);
    }

    @PostMapping("/collection/")
    public ResponseEntity<List<Car>> addCars(@RequestBody List<Car> listOfCars) {
        List<Car> savedCarList = carService.saveListOfCars(listOfCars);
        return new ResponseEntity<>(savedCarList, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car updatedCar) {
        try {
            Car car = carService.updateCar(id, updatedCar);
            return ResponseEntity.ok(car);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarById(@PathVariable Long id) {
        try {
            carService.removeCarById(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
