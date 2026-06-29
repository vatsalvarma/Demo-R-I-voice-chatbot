import React, { useState } from 'react';
import { MapPin, Navigation, Info } from 'lucide-react';
import { MapComponent } from './MapComponent';

export const PropertyCard = ({ property, userLocation, setUserLocation }) => {
  const [showMap, setShowMap] = useState(false);
  const [distance, setDistance] = useState(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const handleDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const uLoc = [position.coords.latitude, position.coords.longitude];
        setUserLocation(uLoc);
        setShowMap(true);
        const dist = calculateDistance(uLoc[0], uLoc[1], property.lat, property.lng);
        setDistance(dist);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="min-w-[240px] bg-white rounded-xl overflow-hidden shadow-md flex-shrink-0 border border-gray-100">
      <img src={property.image} alt={property.name} className="w-full h-[120px] object-cover" />
      <div className="p-3">
        <h4 className="font-bold text-brand-dark text-sm">{property.name}</h4>
        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
          <MapPin size={12} /> {property.location}
        </p>
        <p className="font-semibold text-brand-gold mt-1 text-sm">{property.price}</p>
        
        {distance && (
          <p className="text-xs text-green-600 mt-2 font-semibold bg-green-50 p-1 rounded">
            📍 You are {distance} KM away
          </p>
        )}

        <div className="flex gap-2 mt-3">
          <button 
            onClick={handleDirections}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-xs py-1.5 rounded flex items-center justify-center gap-1 transition"
          >
            <Navigation size={12} /> Directions
          </button>
          <button className="flex-1 bg-brand-dark text-white hover:bg-brand-gold text-xs py-1.5 rounded flex items-center justify-center gap-1 transition">
            <Info size={12} /> Details
          </button>
        </div>

        {showMap && (
          <div className="mt-3">
            <MapComponent propertyLocation={[property.lat, property.lng]} userLocation={userLocation} />
            <a 
              href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${property.lat},${property.lng}&travelmode=driving`} 
              target="_blank" 
              rel="noreferrer"
              className="block text-center text-xs text-blue-500 mt-2 hover:underline"
            >
              Open in Google Maps
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
