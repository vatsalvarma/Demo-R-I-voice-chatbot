package com.rishee.chatbot.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Entity
@Table(name = "properties")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String location;
    private BigDecimal priceMin;
    private BigDecimal priceMax;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private Double latitude;
    private Double longitude;
    
    @Column(columnDefinition = "TEXT")
    private String googleMapsLink;
    
    private String propertyStatus;
    private String projectType;
}
