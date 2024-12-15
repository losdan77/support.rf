import { Link } from "react-router-dom";

const EventItem = (props) => {
    return(
        <Link to={`/event/${props.event.id}`} style={{ textDecoration: "none" }} className="link-opacity-10-hover">
        <div className="card mb-3" style={{maxWidth: '90vw'}}>
            <div className="row g-0">
                <div className="col-md-4">
                {props.event.photo_url ?
                <img src={props.event.photo_url} className="img-fluid rounded-start" alt="..."/> : <p>Фото</p>
                }
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    {props.event.FIO
                        ?
                        <h5 className="card-title">{props.event.FIO}</h5>
                        :
                        <h5 className="card-title">{props.event.name_organization}</h5>
                    }
                    <p className="card-text">{props.event.short_text}</p>
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
                </div>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default EventItem;