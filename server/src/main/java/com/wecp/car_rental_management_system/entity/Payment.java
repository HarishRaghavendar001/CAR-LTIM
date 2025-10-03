package com.wecp.car_rental_management_system.entity;

import javax.persistence.*;
import java.util.Date;

// @Table(name = "payments") // do not change this line i.e table name
// public class Payment {
//     // implement entity
// }

@Entity
@Table(name = "payments") // do not change this line i.e table name
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    @Temporal(TemporalType.DATE)
    private Date date;

    private String method;
    private String status;

    @OneToOne
    @JoinColumn(name = "booking_id")
    private Booking booking;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Booking getBooking() {
        return booking;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Payment(Long id, Double amount, Date date, String method, String status, Booking booking) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.method = method;
        this.status = status;
        this.booking = booking;
    }

    // Getters and Setters
}
