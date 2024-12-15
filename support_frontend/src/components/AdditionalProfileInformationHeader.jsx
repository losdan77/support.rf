import React from "react";
import { Link } from "react-router-dom";

const AdditionalProfileInformationHeader = ({eventButtonVisible, setEventButtonVisible}) => {
    return (
        <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
                { eventButtonVisible
                    ?
                <>
                <li className="nav-item">
                    <Link
                        className="nav-link active" 
                        aria-current="true" 
                        href="#"
                        onClick={() => setEventButtonVisible(true)}
                    >
                        События
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        className="nav-link" 
                        href="#"
                        onClick={() => setEventButtonVisible(false)}
                    >
                        Комментарии
                    </Link>
                </li>
                </>
                    :
                <>
                <li className="nav-item">
                    <Link 
                        className="nav-link" 
                        aria-current="true" 
                        href="#"
                        onClick={() => setEventButtonVisible(true)}
                    >
                        События
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        className="nav-link active" 
                        href="#"
                        onClick={() => setEventButtonVisible(false)}
                    >
                        Комментарии
                    </Link>
                </li>
                </>
                }
            </ul>
        </div>
    );
}

export default AdditionalProfileInformationHeader;