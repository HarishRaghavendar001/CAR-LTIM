package com.wecp.car_rental_management_system.service;

import com.wecp.car_rental_management_system.entity.Booking;
import com.wecp.car_rental_management_system.entity.Payment;
import com.wecp.car_rental_management_system.repository.BookingRepository;
import com.wecp.car_rental_management_system.repository.PaymentRepository;
import com.wecp.car_rental_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


// public class PaymentService {
//     // implement payment service
// }
@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment createPayment(Long bookingId, Payment paymentRequest) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow();
        paymentRequest.setBooking(booking);
        booking.setPayment(paymentRequest);
        booking.setPaymentStatus(paymentRequest.getStatus());
        bookingRepository.save(booking);
        return paymentRepository.save(paymentRequest);
    }
}