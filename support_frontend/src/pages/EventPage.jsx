import "../styles/EventPage.css"
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useFetching } from "../hooks/useFetching";
import axios from "axios";
import AuthorModal from "../components/AuthorModal";
import Spiner from "../components/Spiner";

const PageHelp = () => {
    const params = useParams();
    const [event, setEvent] = useState({});
    const [visiableModal, setVisiableModal] = useState(false);
    const [fetchEventById, isLoading, error] = useFetching( async () => {
        const response = await getEventById(params.id);
        setEvent(response.data);
    })

    async function getEventById(id) {
        const response = await axios.get(`http://localhost:8000/events/get_event_by_id?id_event=${id}`);
        return response;       
    } 

    useEffect(() => {
        fetchEventById();
    }, [params]) // eslint-disable-next-line react-hooks/exhaustive-deps

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
                            <img src={`/images/${event.photo_url}`} className="card-img-top" alt="..." style={{maxHeight: "20vh"}}/>
                            <div className="card-body">
                                <h5 className="card-title">{event.short_text}</h5>
                                <p className="card-text">{event.text}</p>
                                <p className="card-text">
                                    Город: {event.city} {(event.latitude && event.longitude) ? <span>({event.latitude};{event.longitude})</span> : null}
                                </p>
                                <p className="card-text">Тип события: {event.type_event}</p>
                                <p className="card-text">Необходимое количество человек: {event.people_count}</p>
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    onClick={() => setVisiableModal(true)}
                                >
                                    Информация об авторе
                                </button>
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