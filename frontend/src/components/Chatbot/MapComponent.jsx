import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

// Fix leafet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Routing = ({ source, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!source || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(source[0], source[1]),
        L.latLng(destination[0], destination[1])
      ],
      routeWhileDragging: false,
      showAlternatives: false,
      fitSelectedRoutes: true,
      show: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: '#3b82f6', weight: 4 }]
      },
      createMarker: function(i, waypoint, n) {
        return L.marker(waypoint.latLng, {
          draggable: false,
          icon: L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconAnchor: [12, 41]
          })
        }).bindPopup(i === 0 ? "Your Location" : "Destination");
      }
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, source, destination]);

  return null;
};

export const MapComponent = ({ propertyLocation, userLocation }) => {
  const center = userLocation ? [
    (propertyLocation[0] + userLocation[0]) / 2,
    (propertyLocation[1] + userLocation[1]) / 2
  ] : propertyLocation;

  return (
    <div className="h-[200px] w-full rounded-xl overflow-hidden shadow-inner mt-2">
      <MapContainer center={center} zoom={12} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {!userLocation && (
          <Marker position={propertyLocation}>
            <Popup>Property Location</Popup>
          </Marker>
        )}
        
        {userLocation && (
          <Routing source={userLocation} destination={propertyLocation} />
        )}
      </MapContainer>
    </div>
  );
};
