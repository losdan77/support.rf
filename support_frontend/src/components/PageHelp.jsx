import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import { AuthContext } from "../context";
import EventList from "./EventList";
import Spiner from "./Spiner";
import { getPageCount, getPagesArray } from "../utils/pages";
import Paginator from "./Paginator";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "../styles/PageHelp.css"

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const PageHelp = (props) => {
    const API_URL = process.env.REACT_APP_API_URL; 
    const {isLogin, profileId, accessToken} = useContext(AuthContext)
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('');
    const [totalEventPages, setTotalEventPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    let pagesArray = getPagesArray(totalEventPages);
    const [fetchEvents, isLoading, error] = useFetching( async () => {
        const response = await getEvents();
        setEvents(response.data);
    })
    const [fetchFilterEvents, isFilterLoading, errorFilter] = useFetching( async () => {
        const response = await getFilterEvents(filter);
        setEvents(response.data);
    })
    
    async function getEvents() {
        try {
            const response = await axios.get(`${API_URL}/events/get_all_event?need_help=${props.needHelp}&limit=${limit}&page=${page}`);
            return response;    
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }

    async function getFilterEvents(searchText) {
        try {
            if (accessToken) {
                const response = await axios.get(`${API_URL}/events/find_event_by_text_or_short_text?need_help=${props.needHelp}&text=${searchText}&access_token=${accessToken}&limit=${limit}&page=${page}`);
                return response;
            }
            const response = await axios.get(`${API_URL}/events/find_event_by_text_or_short_text?need_help=${props.needHelp}&text=${searchText}&limit=${limit}&page=${page}`);   
            return response;
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }

    async function getEventCount() {
        try {
            const response = await axios.get(`${API_URL}/events/get_event_count?need_help=${props.needHelp}&text=${filter}`);
            setTotalEventPages(getPageCount(response.data.count, limit));
        }
        catch(error) {
            alert("Ошибка сервера");
        }
    }

    useEffect( () => {
        fetchEvents(); // eslint-disable-next-line
        getEventCount();
      }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchFilterEvents(filter);
            getEventCount();
        }, 400);

        return () => clearTimeout(delayDebounceFn); // eslint-disable-next-line
    }, [page]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setPage(1);
            fetchFilterEvents(filter);
            getEventCount();
        }, 400);

        return () => clearTimeout(delayDebounceFn); // eslint-disable-next-line
    }, [filter]);

    const eventsWithCoordinates = events.filter(
        (event) => event.latitude && event.longitude
    );

    return (
        <div className="giveHelpPage">
            <div className="giveHelpInfoPage">
                { isLogin ? null :
                    <div className="alert alert-warning" role="alert">
                        Если вы авторизуетесь и укажете ваше местоположение в профиле, то сначала будут отображаться ближайшие события!
                    </div>
                }
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroupPrepend2">Поиск</span>
                    </div>
                    <input 
                        type="text"
                        className="form-control"
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                        placeholder="Введите текст..."
                    />
                </div>
                {(error | errorFilter)
                    ? <h1 className="errorEvents">Ошибка {error | errorFilter}</h1> :
                    (isLoading | isFilterLoading)
                        ? <Spiner/> :
                        (events.length === 0)
                            ? <h1 className="titleEvents">Событий нет</h1> :
                <>
                <div style={{ height: "500px", marginTop: "20px" }}>
                    <MapContainer
                        center={[55.7558, 37.6173]} // Центр карты (пример: Москва)
                        zoom={5}
                        style={{ height: "100%", width: "100%" }}
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
                        {eventsWithCoordinates.map((event) => (
                        <Marker
                            key={event.id}
                            position={[event.latitude, event.longitude]}
                        >
                            <Popup>
                                <Link to={`/event/${event.id}`} style={{ textDecoration: 'none'}}>
                                    <strong>{event.short_text}</strong>
                                </Link>
                                <br />
                            </Popup>
                        </Marker>
                        ))}
                    </MapContainer>
                </div>
                <EventList events={events} title='Список событий:' profileId={profileId}/>
                </>
                }
                <Paginator page={page} pagesArray={pagesArray} totalPages={totalEventPages} setPage={setPage}/>
            </div>
        </div>
    );
};

export default PageHelp;   