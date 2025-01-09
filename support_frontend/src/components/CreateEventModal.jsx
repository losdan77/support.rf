import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../styles/CreateEventModal.css"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';


const CreateEventModal = ({visiable, onClose, accessToken}) => {
    const API_URL = process.env.REACT_APP_API_URL; 
    const [successCreateEventAlert, setSuccessCreateEventAlert] = useState(false); 
    const [needHelp, setNeedHelp] = useState(false);
    const [cities, setCities] = useState([]);
    const [citiesError, setCitiesError] = useState(false);
    const [themeEvent, setThemeEvent] = useState([]);
    const [idThemeEvent, setIdThemeEvent] = useState(1);
    const [typeEvent, setTypeEvent] = useState([]);
    const [typeEventError, setTypeEventError] = useState(false);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [createData, setCreateData] = useState({
        city: '',
        text: '',
        peopleCount: 0,
        shortText: '',
        selectedTypeEvent: ''
    })

    async function getAllCity() {
        try {
            const response = await axios.get(`${API_URL}/organizations/all_city`);
            setCities(response.data);
        }
        catch(error) {        
            alert("Ошибка сервера");
        }
    }

    async function getAllThemeEvent() {
        try {
            const response = await axios.get(`${API_URL}/events/all_theme_event`);
            setThemeEvent(response.data);
        }
        catch(error) {        
            alert("Ошибка сервера");
        }
    }

    async function getAllTypeEventByTheme() {
        try {
            const response = await axios.get(`${API_URL}/events/all_type_event_by_theme?id_theme_event=${idThemeEvent}`);
            setTypeEvent(response.data);
        }
        catch(error) {        
            alert("Ошибка сервера");
        }
    }

    async function createEvent(e) {
        e.preventDefault();
        if (!createData.city) {
            setCitiesError(true);
            return;
        }
        if (!createData.selectedTypeEvent) {
            setTypeEventError(true);
            return;
        }
        try {
            const response = await axios.post(`${API_URL}/events/add_event`,
                {
                    need_help: needHelp,
                    city: createData.city,
                    text: createData.text,
                    people_count: createData.peopleCount,
                    short_text: createData.shortText,
                    type_event: createData.selectedTypeEvent,
                    latitude: String(latitude),
                    longitude: String(longitude),
                    access_token: accessToken
                }
            )
            if (response.status === 200) {
                setSuccessCreateEventAlert(true);
                setTimeout(() => {
                    setSuccessCreateEventAlert(false);
                    onClose();
                }, 1000);
            }
        }
        catch(error) {
            alert("Ошибка сервера");
        }
        finally {
            setCreateData({
                city: '',
                text: '',
                peopleCount: 0,
                shortText: '',
                selectedTypeEvent: ''
            })
            setCitiesError(false);
            setTypeEventError(false);
        }
    }

    useEffect(() => {
        getAllCity();
        getAllThemeEvent();
        getAllTypeEventByTheme();
    }, []);

    useEffect(() => {
        getAllTypeEventByTheme();
    }, [idThemeEvent])

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
        <div className="create-event-modal-overlay" onClick={onClose}>
            <div 
                className="create-event-modal-content" 
                onClick={(e) => e.stopPropagation()} 
            >
                <button 
                    className="close-button" 
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2>Создание события</h2>
                <form className="row g-3">
                    <div className="col-12">
                        <div className="form-check">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="gridCheck"
                                value={needHelp}
                                onChange={() => setNeedHelp(!needHelp)}
                            />
                            <label className="form-check-label" htmlFor="gridCheck">
                                Просьба о помощи
                            </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputShortText" className="form-label">Короткий текст (виден в списке событий)</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputShortText"
                            value={createData.shortText}   
                            onChange={e => setCreateData({...createData, shortText: e.target.value})} 
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputText" className="form-label">Полный текст (виден на странице события)</label>
                        <textarea 
                            type="text" 
                            className="form-control" 
                            id="inputText"
                            value={createData.text}   
                            onChange={e => setCreateData({...createData, text: e.target.value})} 
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputCity" className="form-label">Город</label>
                        <select 
                            id="inputCity" 
                            className="form-select"
                            value={createData.city}
                            onChange={e => setCreateData({...createData, city: e.target.value})}
                        >
                            <option value="">Выберите город</option>
                        {cities.map((city) => (
                            <option key={city.id} value={city.city}>{city.city}</option>
                        ))}
                        </select>
                        {citiesError ? <p className="text-danger">Пожалуйста, выберите город</p> : null}
                    </div>
                    <div className="col-6">
                        { needHelp 
                            ?
                        <label htmlFor="inputCountPeople" className="form-label">Необходимо человек</label>
                            :
                        <label htmlFor="inputCountPeople" className="form-label">Имеется человек</label>
                        }
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputCountPeople"
                            value={createData.peopleCount}   
                            onChange={e => setCreateData({...createData, peopleCount: e.target.value})} 
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">Тема события</label>
                        <select 
                            id="inputState" 
                            className="form-select"
                            value={idThemeEvent}
                            onChange={e => setIdThemeEvent(e.target.value)}
                        >
                        {themeEvent.map((theme) => (
                            <option key={theme.id} value={theme.id}>{theme.theme_event}</option>
                        ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">Тип события</label>
                        <select 
                            id="inputState" 
                            className="form-select"
                            value={createData.selectedTypeEvent}
                            onChange={e => setCreateData({...createData, selectedTypeEvent: e.target.value})}
                        >
                            <option value=""> Тип события </option>
                        {typeEvent.map((type) => (
                            <option key={type.id} value={type.type_event}>{type.type_event}</option>
                        ))}
                        </select>
                        {typeEventError ? <p className="text-danger">Пожалуйста, выберите тип события</p> : null}
                    </div>
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
                    { successCreateEventAlert 
                        ?
                    <div className="alert alert-success" role="alert">
                        Событие успешно создано!
                    </div>
                        : null
                    }
                    <div className="col-12">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            onClick={createEvent}
                        >
                            Отправить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateEventModal;