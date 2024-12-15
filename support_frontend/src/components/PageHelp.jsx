import "../styles/PageHelp.css"
import EventList from "./EventList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useFetching } from "../hooks/useFetching";
import Spiner from "./Spiner";


const PageHelp = (props) => {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('');
    const [fetchEvents, isLoading, error] = useFetching( async () => {
        const response = await getEvents(filter);
        setEvents(response.data);
    })
    const [fetchFilterEvents, isFilterLoading, errorFilter] = useFetching( async () => {
        const response = await getFilterEvents(filter);
        setEvents(response.data);
    })
    
    async function getEvents() {
        const response = await axios.get(`http://localhost:8000/events/get_all_event?need_help=${props.needHelp}`);
        return response;
    }

    async function getFilterEvents(searchText, accessToken) {
        if (accessToken) {
            const response = await axios.get(`http://localhost:8000/events/find_event_by_text_or_short_text?need_help=${props.needHelp}&text=${searchText}&access_token=${accessToken}`);
            return response;
        }
        const response = await axios.get(`http://localhost:8000/events/find_event_by_text_or_short_text?need_help=${props.needHelp}&text=${searchText}`);
        return response;
    }

    useEffect( () => {
        fetchEvents(); // eslint-disable-next-line
      }, [])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
                fetchFilterEvents(filter);
        }, 500);

        return () => clearTimeout(delayDebounceFn); // eslint-disable-next-line
    }, [filter]);

    return (
        <div className="giveHelpPage">
            <div className="giveHelpInfoPage">
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
                        ? 
                        <Spiner/>
                        :
                        (events.length === 0)
                            ? <h1 className="titleEvents">Событий нет</h1> :
                <EventList events={events} title='Список событий:'/>
                }
            </div>
        </div>
    );
};

export default PageHelp;   