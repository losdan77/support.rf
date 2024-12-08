import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css"
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";


const Profile = () => {
    const params = useParams();
    const [profileInfo, setProfileInfo] = useState({}); // eslint-disable-next-line
    const [fetchProfileById, isLoading, error] = useFetching( async () => {
        const response = await getProfileInfo(params.id);   
        setProfileInfo(response.data);       
    })

    async function getProfileInfo(id) {
        const response = await axios.get(`http://localhost:8000/organizations/profile/${id}`)
        return response;
    }    

    useEffect(() => {
        fetchProfileById();
    }, [])

    return (
        <div className="profilePage">
            {isLoading
                ?
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>   
                :
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-4 text-bg-secondary">
                        <img src={profileInfo.photo_url}/>
                    </div>
                    <div className="col-8 text-bg-secondary">
                    { 
                    profileInfo.FIO
                        ? profileInfo.FIO
                        : profileInfo.name_organization 
                    }
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 text-bg-secondary">
                        Почта: {profileInfo.email}
                    </div>
                    <div className="col-6 text-bg-secondary">
                        Дата регистрации: {profileInfo.created_at}
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 text-bg-secondary">
                        Номер телефона: {profileInfo.phone_1}
                    </div>
                    <div className="col-6 text-bg-secondary">
                        Дополнительный телефон: {profileInfo.phone_2}
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 text-bg-secondary">
                        Город: {profileInfo.city}
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 text-bg-secondary">
                        {profileInfo.about}
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Profile;   