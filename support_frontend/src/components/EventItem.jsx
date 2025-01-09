import { Link } from "react-router-dom";

const EventItem = (props) => {   
    return(
        <Link to={`/event/${props.event.id}`} style={{ textDecoration: "none" }} className="link-opacity-10-hover">
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-3">
                <img src={`${props.event.photo_url}`} className="img-fluid rounded-start" alt="Фото" />
                </div>
                <div className="col-md-9">
                <div className="card-body">
                    {props.event.FIO
                        ?
                        <h5 className="card-title">{props.event.FIO}</h5>
                        :
                        <h5 className="card-title">{props.event.name_organization}</h5>
                    }
                    <p className="card-text">{props.event.short_text}</p>
                    <p className="card-text">Тип события: {props.event.type_event}</p>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <p className="card-text">
                            <small className="text-body-secondary">Дата создания: {props.event.created_at}</small>
                        </p>
                        <p className="card-text">
                            <small className="text-body-secondary">Необходимо человек: {props.event.people_count}</small>
                        </p>
                        <p className="card-text">
                            <small className="text-body-secondary">Город: {props.event.city}</small>
                        </p>
                    </div>  
                    { (props.profileId === props.event.id_organization) 
                        ? 
                        <button className="close-button" style={{marginRight: "2vw"}}> 
                            &#x270E;                                                                                             
                        </button> 
                        : null
                    }  
                </div>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default EventItem;