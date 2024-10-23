import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import { Container } from 'react-bootstrap';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapFavorite = ({ realts }) => {
  const [markers, setMarkers] = useState([]);

  const fetchCoordinates = async (realt) => {
    const { country, city, street, house } = realt;
    const address = country + ', ' + city + ', ул.' + street + ' ' + house;

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: address,
          format: 'json',
        },
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return [lat, lon];
      } else {
        console.warn(`Координаты не найдены для адреса: ${address}`);
        return null;
      }
    } catch (error) {
      console.error("Ошибка при геокодировании:", error);
      return null;
    }
  };

  useEffect(() => {
    const loadMarkers = async () => {
      const newMarkers = await Promise.all(
        realts.map(async (realt) => {
          const coords = await fetchCoordinates(realt);
          if (coords) {
            return { ...realt, coordinates: coords };
          }
          return null;
        })
      );
      setMarkers(newMarkers.filter(marker => marker !== null));
    };

    loadMarkers();
  }, [realts]);

  return (
    <Container className='mt-3'>
      <MapContainer center={[53.9045, 27.5590]} zoom={12} style={{ height: '450px', width: '98%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((realt) => (
          <Marker key={realt.id} position={realt.coordinates}>
            <Popup>
              <strong>{realt.name}</strong><br />
              {realt.city}, {realt.street} {realt.house}<br />
              {realt.dealType.id === 2 ? <>Цена: {realt.price}$</> : <>Цена аренды: {realt.price}$/мес.</>}<br />
              {realt.type.typeName}: {realt.area} м²<br/>
              Количество комнат: {realt.roomsCount}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Container>
  );
};

export default MapFavorite;