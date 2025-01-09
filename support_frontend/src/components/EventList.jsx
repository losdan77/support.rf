import EventItem from "./EventItem";

const EventList = ({events, title, profileId}) => {
    return(
        <div className="Events">
            <p className="text-start fs-2 mt-2">{title}</p>
            {events.map(event =>
                <EventItem event={event} key={event.id} profileId={profileId}/>
            )}
        </div>
    )
}

export default EventList;