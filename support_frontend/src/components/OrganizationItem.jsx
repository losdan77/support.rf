import { Link } from "react-router-dom";

const OrganizationItem = (props) => {
    return (
        <Link to={`/profile/${props.organization.id}`} style={{ textDecoration: "none" }}>
            <div className="card mb-3"> 
                <div className="row g-0">
                    <div className="col-md-1">
                        <img 
                            src={`${props.organization.photo_url}`}
                            className="img-fluid rounded-start" 
                            alt="Фото"
                        />
                    </div>
                    <div className="col-md-11">
                        <div className="card-body text-center">
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