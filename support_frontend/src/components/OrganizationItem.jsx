import { Link } from "react-router-dom";

const OrganizationItem = (props) => {
    return (
        <Link to={`/profile/${props.organization.id}`} style={{ textDecoration: "none" }}>
            <div className="card mb-3" style={{maxWidth: '60vw', maxHeight: '10vh'}}> 
                <div className="row g-0">
                    <div className="col-md-4">
                        <img 
                            src={`${props.organization.photo_url}`}
                            className="img-fluid rounded-start" 
                            alt="Фото"
                            style={{maxHeight: '9vh'}} //
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            {props.organization.FIO
                                ?
                                <h5 className="card-title">{props.organization.FIO}</h5>
                                :
                                <h5 className="card-title">{props.organization.name_organization}</h5>
                            } 
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default OrganizationItem