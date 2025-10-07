package com.wecp.car_rental_management_system.controller;


import com.wecp.car_rental_management_system.dto.BookingDto;
import com.wecp.car_rental_management_system.entity.Booking;
import com.wecp.car_rental_management_system.entity.Car;
import com.wecp.car_rental_management_system.entity.User;
import com.wecp.car_rental_management_system.service.BookingService;
import com.wecp.car_rental_management_system.service.CarService;
import com.wecp.car_rental_management_system.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class CustomerController {

    @Autowired
    private CarService carService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserService userService;

    @GetMapping("/api/customers/cars/available")
    public ResponseEntity<List<Car>> getAvailableCars() {
        // get all available cars.
        // note: return all the cars where car status is "available"
        List<Car> availabCars = carService.getAvailableCars();
        return ResponseEntity.ok(availabCars);
    }

    @PostMapping("/api/customers/booking")
    public ResponseEntity<Booking> bookCar(@RequestParam Long userId, @RequestParam Long carId,
                                           @RequestBody BookingDto bookingDto) {
        // book a car
        return new ResponseEntity<Booking>(bookingService.bookCar(userId, carId, bookingDto), HttpStatus.OK);
    }

    @GetMapping("/api/customers/bookings/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable Long userId){
        return new ResponseEntity<>(bookingService.getBookingsByUserId(userId), HttpStatus.OK);
    }

      @PutMapping("/api/customer/update/{id}")
        public ResponseEntity<User> updateAgentProfile(@PathVariable Long id, @RequestBody User updatedUser) {
            User user = userService.updateUser(id, updatedUser);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
     
        @GetMapping("/api/customer/{id}")
        public ResponseEntity<User> getCustomerById(@PathVariable Long id) {
            User user = userService.getUserById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
     
     
        @PutMapping("/api/customer/change-password/{id}")
        public ResponseEntity<String> changeCustomerPassword(@PathVariable Long id, @RequestBody Map<String, String> passwords) {
            userService.changePassword(id, passwords);
            return ResponseEntity.ok("Customer password updated successfully");
        }


}
