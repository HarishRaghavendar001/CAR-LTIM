
package com.wecp.car_rental_management_system.controller;


import com.wecp.car_rental_management_system.entity.Booking;
import com.wecp.car_rental_management_system.entity.CarCategory;
import com.wecp.car_rental_management_system.entity.Payment;
import com.wecp.car_rental_management_system.entity.User;
import com.wecp.car_rental_management_system.service.BookingService;
import com.wecp.car_rental_management_system.service.CarCategoryService;
import com.wecp.car_rental_management_system.service.PaymentService;
import com.wecp.car_rental_management_system.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class AdministratorController {
    
    @Autowired
    private PaymentService paymentService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private CarCategoryService carCategoryService;

    @Autowired
    private UserService userService;


    @PostMapping("/api/administrator/car-categories")
    public ResponseEntity<CarCategory> createCarCategory(@RequestBody CarCategory carCategory) {
        // create car category
        return new ResponseEntity<CarCategory>(carCategoryService.addCarCategory(carCategory), HttpStatus.OK);
    }


    @GetMapping("/api/administrator/car-categories")
    public ResponseEntity<List<CarCategory>> getAllCarCategories() {
        // get all car categories
        return new ResponseEntity<>(carCategoryService.getAllCarCategories(),HttpStatus.OK);
    }

    @PutMapping("/api/administrator/car-categories/{categoryId}")
    public ResponseEntity<CarCategory> updateCarCategory(@PathVariable Long categoryId, @RequestBody CarCategory updatedCarCategory) {
      // update car category
      return new ResponseEntity<CarCategory>(carCategoryService.updateCarCategory(categoryId, updatedCarCategory), HttpStatus.OK);
    }

    @GetMapping("/api/administrator/reports/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        // get all bookings
        return new ResponseEntity<>(bookingService.getAllBookings(), HttpStatus.OK);
    }

    @GetMapping("/api/administrator/reports/payments")
    public ResponseEntity<List<Payment>> getAllPayments() {
       return new ResponseEntity<List<Payment>>(paymentService.getAllPayments(),HttpStatus.OK);
    }

    @PutMapping("/api/admin/update/{id}")
    public ResponseEntity<User> updateAgentProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
     
    @GetMapping("/api/admin/{id}")
    public ResponseEntity<User> getAdminById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
     
    // @PutMapping("/api/admin/change-password/{id}")
    // public ResponseEntity<String> changeAdminPassword(@PathVariable Long id, @RequestBody Map<String, String> passwords) {
    //     userService.changePassword(id, passwords);
    //     return ResponseEntity.ok(("Admin password updated successfully"));
    // }
     
    @PutMapping("/api/admin/change-password/{id}")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestBody Map<String, String> passwordData) {
        try {
            // String oldPassword = passwordData.get("oldPassword");
            // String newPassword = passwordData.get("newPassword");
     
            String result = userService.changePassword(id, passwordData);
     
            // Return JSON so Angular can parse it
            return ResponseEntity.ok(Map.of("message", result));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(Map.of("message", ex.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An error occurred while updating the password."));
        }
     
     
    }
}
