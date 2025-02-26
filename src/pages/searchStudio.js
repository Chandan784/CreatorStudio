import { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import "../app/globals.css";

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const NearestStudioSearch = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [studios, setStudios] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 12.9716, lng: 77.5946 });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    libraries,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
          fetchStudios(latitude, longitude);
        },
        () => console.error("Error fetching location")
      );
    }
  }, []);

  const fetchStudios = async (lat, lng) => {
    // Dummy data: Fetch from API in real scenario
    const fetchedStudios = [
      { id: 1, name: "Studio A", lat: 12.972, lng: 77.595 },
      { id: 2, name: "Studio B", lat: 12.97, lng: 77.59 },
      { id: 3, name: "Studio C", lat: 12.969, lng: 77.588 },
    ];

    const studiosWithDistance = fetchedStudios.map((studio) => {
      const distance = getDistanceFromLatLonInKm(
        lat,
        lng,
        studio.lat,
        studio.lng
      );
      return { ...studio, distance };
    });

    setStudios(studiosWithDistance.sort((a, b) => a.distance - b.distance));
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  if (!isLoaded) return <p>Loading Maps...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Find Nearest Studios</h2>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={14}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}
        {studios.map((studio) => (
          <Marker
            key={studio.id}
            position={{ lat: studio.lat, lng: studio.lng }}
            title={studio.name}
          />
        ))}
      </GoogleMap>
      <div className="mt-4">
        {studios.map((studio) => (
          <div key={studio.id} className="p-3 border-b flex items-center">
            <FaMapMarkerAlt className="text-red-500 mr-2" />
            <p>
              {studio.name} - {studio.distance.toFixed(2)} km away
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearestStudioSearch;
