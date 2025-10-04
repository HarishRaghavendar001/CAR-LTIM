
package com.wecp.car_rental_management_system.controller;


import com.wecp.car_rental_management_system.entity.Booking;
import com.wecp.car_rental_management_system.entity.Car;
import com.wecp.car_rental_management_system.entity.CarCategory;
import com.wecp.car_rental_management_system.entity.Payment;
import com.wecp.car_rental_management_system.service.BookingService;
import com.wecp.car_rental_management_system.service.CarCategoryService;
import com.wecp.car_rental_management_system.service.CarService;
import com.wecp.car_rental_management_system.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// @RestController
// public class AgentController {

//     @Autowired
//     private CarService carService;

//     @Autowired
//     private PaymentService paymentService;
    
//     @Autowired
//     private BookingService bookingService;

//     @Autowired
//     private CarCategoryService carCategoryService;



//     @PostMapping("/api/agent/car")
//     public ResponseEntity<Car> addCar(@RequestBody Car car) {
//         // add a car and return created car
//         return new ResponseEntity<Car>(carService.addCar(car), HttpStatus.CREATED);
//     }

//     @GetMapping("/api/agent/cars")
//     public ResponseEntity<List<Car>> getAllCars() {
//         // get all cars
//         return new ResponseEntity<List<Car>>(carService.getAllCars(), HttpStatus.OK);
//     }

//     @PutMapping("/api/agent/car/{carId}")
//     public ResponseEntity<Car> updateCar(@PathVariable Long carId, @RequestBody Car updatedCar) {
//         // update a car
//         return new ResponseEntity<Car>(carService.updateCar(carId, updatedCar), HttpStatus.OK);
//     }

//     @GetMapping("/api/agent/bookings")
//     public ResponseEntity<List<Booking>> getAllBookings() {
//         // get all bookings
//         return new ResponseEntity<>(bookingService.getAllBookings(),HttpStatus.OK);
//     }

//     @PutMapping("/api/agent/bookings/{bookingId}/status")
//     public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long bookingId, @RequestParam String status) {
//        // update booking status
//        return new ResponseEntity<>(bookingService.updateBookingStatus(bookingId, status), HttpStatus.OK);
//     }

//     @PostMapping("/api/agent/payment/{bookingId}")
//     public ResponseEntity<Payment> createPayment(@PathVariable Long bookingId,
//                                                    @RequestBody Payment paymentRequest) {
//         return new ResponseEntity<>(paymentService.createPayment(bookingId, paymentRequest),HttpStatus.OK);
//     }

//     @GetMapping("/api/agent/car-categories")
//     public ResponseEntity<List<CarCategory>> getCarCategoriesForAgent() {
//         return new ResponseEntity<>(carCategoryService.getAllCarCategories(), HttpStatus.OK);
//     }

//     @GetMapping("/api/agent/car-categories")
//     public ResponseEntity<List<CarCategory>> getAllCarCategoriesForAgent() {
//         return new ResponseEntity<>(carCategoryService.getAllCarCategories(), HttpStatus.OK);
//     }


// }

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

    @GetMapping("/api/agent/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return new ResponseEntity<>(bookingService.getAllBookings(), HttpStatus.OK);
    }

    @PutMapping("/api/agent/bookings/{bookingId}/status")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long bookingId, @RequestParam String status) {
        return new ResponseEntity<>(bookingService.updateBookingStatus(bookingId, status), HttpStatus.OK);
    }

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


}
