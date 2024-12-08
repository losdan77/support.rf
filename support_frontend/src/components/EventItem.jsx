const EventItem = (props) => {
    return(
        <div className="card mb-3" style={{maxWidth: '90vw'}}>
            <div className="row g-0">
                <div className="col-md-4">
                <img src={props.event.photo_url} className="img-fluid rounded-start" alt="..."/>
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
    )
}

export default EventItem;