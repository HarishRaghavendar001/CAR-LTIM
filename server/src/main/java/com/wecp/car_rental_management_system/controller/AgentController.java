
package com.wecp.car_rental_management_system.controller;


import com.wecp.car_rental_management_system.entity.Booking;
import com.wecp.car_rental_management_system.entity.Car;
import com.wecp.car_rental_management_system.entity.CarCategory;
import com.wecp.car_rental_management_system.entity.Payment;
import com.wecp.car_rental_management_system.entity.User;
import com.wecp.car_rental_management_system.service.BookingService;
import com.wecp.car_rental_management_system.service.CarCategoryService;
import com.wecp.car_rental_management_system.service.CarService;
import com.wecp.car_rental_management_system.service.PaymentService;
import com.wecp.car_rental_management_system.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
public class AgentController {

    @Autowired
    private CarService carService;

    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private BookingService bookingService;

    @Autowired
    private CarCategoryService carCategoryService;

    @Autowired
    private UserService userService;

    @PostMapping("/api/agent/car")
    public ResponseEntity<Car> addCar(@RequestBody Car car) {
        return new ResponseEntity<>(carService.addCar(car), HttpStatus.CREATED);
    }

    @GetMapping("/api/agent/cars")
    public ResponseEntity<List<Car>> getAllCars() {
        return new ResponseEntity<>(carService.getAllCars(), HttpStatus.OK);
    }

    @PutMapping("/api/agent/car/{carId}")
    public ResponseEntity<Car> updateCar(@PathVariable Long carId, @RequestBody Car updatedCar) {
        return new ResponseEntity<>(carService.updateCar(carId, updatedCar), HttpStatus.OK);
    }
    @DeleteMapping("/api/agent/car/{carId}")
        public ResponseEntity<String> deleteCar(@PathVariable Long carId) {
            boolean deleted = carService.deleteCar(carId);
            if (deleted) {
                return ResponseEntity.ok("Car deleted successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Car not found");
            }
        }
   


    @GetMapping("/api/agent/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return new ResponseEntity<>(bookingService.getAllBookings(), HttpStatus.OK);
    }

    @PutMapping("/api/agent/bookings/{bookingId}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long bookingId, @RequestParam String status) {
        return new ResponseEntity<>(bookingService.updateBookingStatus(bookingId, status), HttpStatus.OK);
    }

    // @PostMapping("/api/agent/payment/{bookingId}")
    // public ResponseEntity<Payment> createPayment(@PathVariable Long bookingId, @RequestBody Payment paymentRequest) {
    //     return new ResponseEntity<>(paymentService.createPayment(bookingId, paymentRequest), HttpStatus.OK);
    // }
@PostMapping("/api/agent/payment/{bookingId}")
public ResponseEntity<Payment> createPayment(@PathVariable Long bookingId, @RequestBody Payment paymentRequest) {
    return new ResponseEntity<>(paymentService.createPayment(bookingId, paymentRequest), HttpStatus.OK);
}


    

    // Corrected: Only one @GetMapping for car categories
    @GetMapping("/api/agent/car-categories")
    public ResponseEntity<List<CarCategory>> getCarCategoriesForAgent() {
        return new ResponseEntity<>(carCategoryService.getAllCarCategories(), HttpStatus.OK);
    }

    @GetMapping("/api/agent/car/{carId}")
    public ResponseEntity<Car> getCarById(@PathVariable Long carId) {
        Car car = carService.getCarById(carId);
        return new ResponseEntity<>(car, HttpStatus.OK);
    }

    @PutMapping("/api/agent/update/{id}")
        public ResponseEntity<User> updateAgentProfile(@PathVariable Long id, @RequestBody User updatedUser) {
            User user = userService.updateUser(id, updatedUser);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
     
        @GetMapping("/api/agent/{id}")
        public ResponseEntity<User> getAgentById(@PathVariable Long id) {
            User user = userService.getUserById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
     
       
        @PutMapping("/api/agent/change-password/{id}")
        public ResponseEntity<String> changeAgentPassword(@PathVariable Long id, @RequestBody Map<String, String> passwords) {
            userService.changePassword(id, passwords);
            return ResponseEntity.ok("Agent password updated successfully");
        }
     


}
