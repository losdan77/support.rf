import EventItem from "./EventItem";

const EventList = ({events, title}) => {
    return(
        <div className="Events">
            <h1 className="titleEvents">{title}</h1>
            {events.map(event =>
                <EventItem event={event} key={event.id}/>
            )}
        </div>
    )
}

export default EventList;