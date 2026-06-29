export const conversationTree = {
  start: {
    id: 'start',
    message: "👋 Welcome to Rishee Infra. We're here to help you find your dream property.",
    options: [
      { text: "🏡 Buy Property", next: "buy_property" },
      { text: "🏢 Apartments", next: "apartments" },
      { text: "🏠 Villas", next: "villas" },
      { text: "🌾 Open Plots", next: "plots" },
      { text: "📞 Contact Sales", next: "contact_sales" },
      { text: "🎙 Talk to Assistant", next: "voice_mode" }
    ]
  },
  buy_property: {
    id: 'buy_property',
    message: "Wonderful! What type of property are you looking for?",
    options: [
      { text: "Villas", next: "villas" },
      { text: "Apartments", next: "apartments" },
      { text: "Open Plots", next: "plots" }
    ]
  },
  villas: {
    id: 'villas',
    message: "Great choice! Where would you prefer your villa to be located?",
    options: [
      { text: "Gachibowli", next: "budget_villas" },
      { text: "Kokapet", next: "budget_villas" },
      { text: "Jubilee Hills", next: "budget_villas" }
    ]
  },
  apartments: {
    id: 'apartments',
    message: "We have some amazing luxury apartments. Which location do you prefer?",
    options: [
      { text: "Hitech City", next: "budget_apartments" },
      { text: "Kukatpally", next: "budget_apartments" },
      { text: "Madhapur", next: "budget_apartments" }
    ]
  },
  plots: {
    id: 'plots',
    message: "Looking for an investment? Where would you like to buy an open plot?",
    options: [
      { text: "Shamshabad", next: "budget_plots" },
      { text: "Mokila", next: "budget_plots" },
      { text: "Shadnagar", next: "budget_plots" }
    ]
  },
  budget_villas: {
    id: 'budget_villas',
    message: "What is your budget range for a villa?",
    options: [
      { text: "3Cr - 5Cr", next: "show_villas" },
      { text: "5Cr - 10Cr", next: "show_villas" },
      { text: "Above 10Cr", next: "show_villas" }
    ]
  },
  budget_apartments: {
    id: 'budget_apartments',
    message: "What is your budget range for an apartment?",
    options: [
      { text: "1Cr - 2Cr", next: "show_apartments" },
      { text: "2Cr - 4Cr", next: "show_apartments" },
      { text: "Above 4Cr", next: "show_apartments" }
    ]
  },
  budget_plots: {
    id: 'budget_plots',
    message: "What is your budget range for a plot?",
    options: [
      { text: "50L - 1Cr", next: "show_plots" },
      { text: "1Cr - 2Cr", next: "show_plots" }
    ]
  },
  show_villas: {
    id: 'show_villas',
    message: "Here are some premium villas matching your criteria:",
    type: "property_list",
    properties: [
      {
        id: 1,
        name: "Rishee Royal Villas",
        location: "Gachibowli, Hyderabad",
        price: "4.2 Cr",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
        amenities: ["Private Pool", "Gym", "Clubhouse"],
        lat: 17.4401,
        lng: 78.3489
      },
      {
        id: 2,
        name: "Rishee Imperial",
        location: "Jubilee Hills, Hyderabad",
        price: "12.5 Cr",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=60",
        amenities: ["Home Theater", "Smart Home", "Golf View"],
        lat: 17.4326,
        lng: 78.4071
      },
      {
        id: 3,
        name: "Rishee Serenity",
        location: "Kokapet, Hyderabad",
        price: "6.8 Cr",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
        amenities: ["Lake View", "24/7 Security", "Jogging Track"],
        lat: 17.3931,
        lng: 78.3305
      }
    ],
    options: [
      { text: "Search Again", next: "start" },
      { text: "Book Site Visit", next: "book_visit" }
    ]
  },
  show_apartments: {
    id: 'show_apartments',
    message: "Here are our luxury apartments:",
    type: "property_list",
    properties: [
      {
        id: 4,
        name: "Rishee Sky Towers",
        location: "Hitech City, Hyderabad",
        price: "3.5 Cr",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60",
        amenities: ["Infinity Pool", "Helipad", "Spa"],
        lat: 17.4435,
        lng: 78.3772
      }
    ],
    options: [
      { text: "Search Again", next: "start" },
      { text: "Book Site Visit", next: "book_visit" }
    ]
  },
  show_plots: {
    id: 'show_plots',
    message: "Here are some premium open plots:",
    type: "property_list",
    properties: [
      {
        id: 5,
        name: "Rishee Green County",
        location: "Shamshabad, Hyderabad",
        price: "85 Lakhs",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60",
        amenities: ["Gated Community", "Black Top Roads", "Underground Cabling"],
        lat: 17.2625,
        lng: 78.3968
      },
      {
        id: 6,
        name: "Rishee Meadows",
        location: "Mokila, Hyderabad",
        price: "1.2 Cr",
        image: "https://images.unsplash.com/photo-1584738766473-61c083514bf4?w=800&auto=format&fit=crop&q=60",
        amenities: ["Clubhouse", "Park", "Vastu Compliant"],
        lat: 17.4497,
        lng: 78.2039
      }
    ],
    options: [
      { text: "Search Again", next: "start" },
      { text: "Book Site Visit", next: "book_visit" }
    ]
  },
  book_visit: {
    id: 'book_visit',
    message: "Please fill out this form to schedule a site visit.",
    type: "booking_form",
    options: [
      { text: "Cancel", next: "start" }
    ]
  },
  contact_sales: {
    id: 'contact_sales',
    message: "You can reach our sales team at +91 9876543210 or email sales@risheeinfra.com.",
    options: [
      { text: "Back to Home", next: "start" }
    ]
  },
  voice_mode: {
    id: 'voice_mode',
    message: "Voice mode activated. Please click the microphone button to start speaking.",
    options: [
      { text: "Cancel Voice Mode", next: "start" }
    ]
  },
  fallback: {
    id: 'fallback',
    message: "I'm sorry, I didn't quite catch that. Could you select an option from below?",
    options: [
      { text: "Start Over", next: "start" },
      { text: "Contact Support", next: "contact_sales" }
    ]
  }
};
