import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import { AuthContext } from "../context";
import AuthorModal from "../components/AuthorModal";
import Spiner from "../components/Spiner";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import "../styles/EventPage.css"

const PageHelp = () => {
    const API_URL = process.env.REACT_APP_API_URL; 
    const params = useParams();
    const navigate = useNavigate();
    const {isLogin, profileId, accessToken} = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [event, setEvent] = useState({});
    const [visiableModal, setVisiableModal] = useState(false);
    const [fetchEventById, isLoading, error] = useFetching( async () => {
        const response = await getEventById(params.id);
        setEvent(response.data);
        setCoordinationLatitude(response.data.latitude);
        setCoordinationLongitude(response.data.longitude);
    })
    const [file, setFile] = useState(null);
    const [updateFile, setUpdateFile] = useState(false);
    const [loadUploadFile, setLoadUploadFile] = useState(false);
    const [successSendEmailAlert, setSuccessSendEmailAlert] = useState(false);
    const [coordinationLatitude, setCoordinationLatitude] = useState(55.7);
    const [coordinationLongitude, setCoordinationLongitude] = useState(37.6);

    async function getEventById(id) {
        try {
            const response = await axios.get(`${API_URL}/events/get_event_by_id?id_event=${id}`);
            return response;       
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    } 

    async function deleteEvent() {
        try {
            const response = await axios.delete(`${API_URL}/events/delete_event_by_id?id_event=${params.id}&access_token=${accessToken}`);
            if (response.status === 200) {
                navigate(-1);
            }
            return response;       
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }
    
    async function sendHelpEmail() {
        try {
            const response = await axios.post(`${API_URL}/events/send_help_message_on_email?email=${event.email}&short_text=${event.short_text}&access_token=${accessToken}`);
            if (response.status === 200) {
                showSuccessSendEmailAlert();
            }
            return response;       
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }

    function showSuccessSendEmailAlert() {
        setSuccessSendEmailAlert(true);
        setTimeout(() => {
            setSuccessSendEmailAlert(false);
        }, 4000);
    }

    async function uploadEventImage(e) {
        e.preventDefault();
        try {
          const response = await axios.post(`${API_URL}/images/add_event_image_to_s3?id_event=${event.id}&access_token=${accessToken}`,
            {file},
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setUpdateFile(!updateFile);
        }
        catch(error) {
          alert("Ошибка сервера");
        }
        finally {
          setFile(null);
        }
      }

    function checkIsAdmin() {
        if (event.id_organization == profileId) {
            setIsAdmin(true);
        }
        else {
            setIsAdmin(false);
        }
    }

    useEffect(() => {
        fetchEventById();
    }, [params]) // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        checkIsAdmin();        
    }, [event])

    useEffect(() => {
        if (updateFile) {
          setLoadUploadFile(true);
          setTimeout(() => {
            fetchEventById();
            setLoadUploadFile(false);
          }, 4000);
        }
    }, [updateFile])
    
    const StaticLocationMarker = ({latitude, longitude}) => {
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
    
    return(
        <div className="eventPage p-5">
            {isLoading
                ?
                <Spiner/> :
                    (error)
                    ? <h1 className="errorEvents">Ошибка {error}</h1> 
                        :
                    <div>
                        <div className="card mb-3">
                            {event.photo_url ? (
                            <div className="profile-photo-container">
                                <div
                                className="profile-photo-blur"
                                style={{ backgroundImage: `url(${event.photo_url})` }}
                                ></div>
                                <img
                                src={`${event.photo_url}`}
                                className="profile-photo"
                                alt="Фото"
                                />
                            </div>
                            ) : null}
                            { isAdmin 
                                ?
                            <form>
                                <div className="input-group">
                                <input 
                                    type="file" 
                                    className="form-control" 
                                    id="inputGroupFile04" 
                                    aria-describedby="inputGroupFileAddon04" 
                                    aria-label="Upload"
                                    onChange={e => setFile(e.target.files[0])}
                                />
                                { loadUploadFile
                                    ?
                                    <button className="btn btn-primary" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span role="status">Loading...</span>
                                    </button>
                                    :
                                    <button 
                                    className="btn btn-outline-secondary" 
                                    type="button" 
                                    id="inputGroupFileAddon04"
                                    onClick={uploadEventImage}
                                    >
                                    Загрузить фото
                                    </button>
                                }
                                </div>
                            </form> : null
                            }
                            <div className="card-body">
                                <h5 className="card-title">{event.short_text}</h5>
                                <p className="card-text">{event.text}</p>
                                <p className="card-text">
                                    Город: {event.city} {(event.latitude && event.longitude) ? <span>({event.latitude};{event.longitude})</span> : null}
                                </p>
                                <p className="card-text">Тип события: {event.type_event}</p>
                                <p className="card-text">Необходимое количество человек: {event.people_count}</p>
                                <MapContainer 
                                    center={[coordinationLatitude, coordinationLongitude]} 
                                    zoom={5}
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
                                    <StaticLocationMarker latitude={coordinationLatitude} longitude={coordinationLongitude} />
                                </MapContainer>
                                <button 
                                    type="button" 
                                    className="btn btn-primary me-2 my-2"
                                    onClick={() => setVisiableModal(true)}
                                >
                                    Информация об авторе
                                </button>
                                { isAdmin
                                    ?
                                    <button 
                                        type="button" 
                                        className="btn btn-danger my-2"
                                        onClick={deleteEvent}
                                    >
                                        Удалить событие
                                    </button>
                                    :
                                    <button 
                                        type="button" 
                                        className="btn btn-primary my-2"
                                        onClick={sendHelpEmail}
                                    >
                                        Откликнуться на событие
                                    </button>
                                }
                                { successSendEmailAlert 
                                    ?
                                <div className="alert alert-success" role="alert">
                                    Отклик успешно отправлен
                                </div>
                                    : null
                                }
                                <AuthorModal 
                                    visiable={visiableModal}
                                    onClose={() => setVisiableModal(false)}
                                    author={event}
                                />
                                <p className="card-text"><small className="text-body-secondary">Дата публикации: {event.created_at}</small></p>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default PageHelp;