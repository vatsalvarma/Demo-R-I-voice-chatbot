package com.rishee.chatbot.controller;

import com.rishee.chatbot.model.Property;
import com.rishee.chatbot.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {
    
    @Autowired
    private PropertyRepository propertyRepository;
    
    @GetMapping
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }
    
    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyRepository.save(property);
    }
}
