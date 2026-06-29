-- Users and Authentication
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    role VARCHAR(50) DEFAULT 'USER',
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Properties
CREATE TABLE properties (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_min DECIMAL(15,2),
    price_max DECIMAL(15,2),
    description TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    google_maps_link TEXT,
    property_status VARCHAR(50),
    project_type VARCHAR(50), -- Villa, Open Plot, Apartment
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE property_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT,
    image_url TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

CREATE TABLE amenities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    property_id BIGINT,
    amenity_name VARCHAR(100),
    FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
);

-- Bookings
CREATE TABLE bookings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    property_id BIGINT,
    booking_date DATE,
    booking_time TIME,
    status VARCHAR(50) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (property_id) REFERENCES properties(id)
);

-- Conversation Flows (Rule-based Chatbot)
CREATE TABLE conversation_nodes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    node_key VARCHAR(100) UNIQUE NOT NULL,
    message_text TEXT NOT NULL,
    message_type VARCHAR(50) DEFAULT 'TEXT' -- TEXT, PROPERTY_CARD, MAP, SUGGESTIONS
);

CREATE TABLE conversation_options (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    parent_node_id BIGINT,
    option_text VARCHAR(255) NOT NULL,
    next_node_id BIGINT,
    action_type VARCHAR(50), -- NAVIGATE, BOOK_VISIT, CALL
    FOREIGN KEY (parent_node_id) REFERENCES conversation_nodes(id) ON DELETE CASCADE,
    FOREIGN KEY (next_node_id) REFERENCES conversation_nodes(id)
);

CREATE TABLE faqs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100)
);
