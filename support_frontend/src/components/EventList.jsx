import EventItem from "./EventItem";

const EventList = ({events, title, profileId}) => {
    return(
        <div className="Events">
            <h1 className="titleEvents">{title}</h1>
            {events.map(event =>
                <EventItem event={event} key={event.id} profileId={profileId}/>
            )}
        </div>
    )
}

export default EventList;