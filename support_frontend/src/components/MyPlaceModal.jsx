import axios from "axios";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import "../styles/MyPlaceModal.css"

const MyPlaceModal = ({visiable, onClose, accessToken}) => {
    const API_URL = process.env.REACT_APP_API_URL; 
    const [successUpdatePlaceAlert, setSuccessUpdatePlaceAlert] = useState(false); 
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    async function updateMyPlace() {
        try {
            const response = await axios.post(`${API_URL}/organizations/update_my_place?latitude=${latitude}&longitude=${longitude}&access_token=${accessToken}`);
            console.log(response);
            
            if (response.status === 200) {
                setSuccessUpdatePlaceAlert(true);
                setTimeout(() => {
                    setSuccessUpdatePlaceAlert(false);
                    onClose();
                }, 1000);
            }
        }
        catch(error) {
            alert("Ошибка сервера");
            console.log(error);
            
        }
    }

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setLatitude(e.latlng.lat);
                setLongitude(e.latlng.lng);
            },
        });

        return latitude && longitude ? (
            <Marker position={[latitude, longitude]} />
        ) : null;
    };

    const DefaultIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });
      
    L.Marker.prototype.options.icon = DefaultIcon;

    if (!visiable) return null;

    return(
        <div className="my-place-modal-overlay" onClick={onClose}>
            <div 
                className="my-place-modal-content" 
                onClick={(e) => e.stopPropagation()} 
            >
                <button 
                    className="close-button" 
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2>Мое местопожение</h2>
                <p>Указание своего местоположения, будет влиять на сортировку 
                    событий - первыми будут указываться близжайшие к Вам события.</p>
                <form className="row g-3">
                    <div className="col-12">
                        <label className="form-label">Выберите место на карте</label>
                        <MapContainer 
                            center={[55.75, 37.605]} 
                            zoom={13}
                            preferCanvas={true} // Ускоряет рендеринг, используя canvas
                            zoomAnimation={false} // Отключение анимации зума для повышения производительности
                            scrollWheelZoom={true} // Включить прокрутку мыши
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                maxZoom={20} // Максимальный зум карты
                                tileSize={256} // Размер тайлов
                                updateWhenIdle={true} // Загружать только видимые тайлы
                                detectRetina={true} // Адаптация для экранов Retina    
                            />
                            <LocationMarker />
                        </MapContainer>
                        <p>
                            Координаты: {latitude} {longitude}
                        </p>
                    </div>
                    <div className="col-12">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            onClick={updateMyPlace}
                        >
                            Сохранить
                        </button>
                    </div>
                    { successUpdatePlaceAlert
                        ?
                    <div className="alert alert-success" role="alert">
                        Местоположение успешно сохранено!
                    </div>
                        : null
                    }
                </form>
            </div>
        </div>
    );
}

export default MyPlaceModal;