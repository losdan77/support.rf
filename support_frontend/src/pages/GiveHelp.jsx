import "../styles/GiveHelp.css"
import EventList from "../components/EventList";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


const GiveHelp = () => {
    const [events, setEvents] = useState([]);

    async function getEvents() {
        const response = await axios.get("http://localhost:8000/events/get_all_event?need_help=false")
        console.log(response);
        setEvents(response.data)
    }

    useEffect( () => {
        getEvents();
      }, [events])

    return (
        <div className="giveHelpPage">
            <div className="giveHelpInfoPage">
               <EventList events={events} title='Список событий:'/>
            </div>
        </div>
    );
};

export default GiveHelp;   