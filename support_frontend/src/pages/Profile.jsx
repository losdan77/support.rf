import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css"
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import AdditionalProfileInformation from "../components/AdditionalProfileInformation";
import Spiner from "../components/Spiner";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import CreateEventModal from "../components/CreateEventModal";
import { AuthContext } from "../context";


const Profile = () => {
    const {isLogin, setIsLogin, profileId, setProfileId, accessToken, setAccessToken } = useContext(AuthContext)
    const [isAdmin, setIsAdmin] = useState(false);
    const params = useParams();
    const [profileInfo, setProfileInfo] = useState({}); 
    const [fetchProfileById, isLoading, error] = useFetching( async () => {
        const response = await getProfileInfo(params.id);   
        setProfileInfo(response.data);             
    })
    const [eventButtonVisible, setEventButtonVisible] = useState(true);
    const [visiableEditModal, setVisiableEditModal] = useState(false);
    const [visiableChangeModal, setVisiableChangeModal] = useState(false);
    const [visiableCreateModal, setVisiableCreateModal] = useState(false);

    async function getProfileInfo(id) {
        const response = await axios.get(`http://localhost:8000/organizations/profile/${id}`)
        return response;
    }    

    function checkIsAdmin() {
        if (params.id == profileId) {
            setIsAdmin(true);
        }
        else {
            setIsAdmin(false);
        }
    }

    useEffect(() => {
        fetchProfileById();
        checkIsAdmin();
    }, [params, visiableEditModal, visiableChangeModal, setIsLogin, isLogin, profileId])

    
    return (
        <div className="profilePage p-5">
            <div className="card mb-3">
            {isLoading
                ?
            <Spiner/> 
                :
                (error)
                ? <h1 className="errorEvents">Ошибка {error}</h1> 
                    :
                <>
                {profileInfo.photo_url ?
                <img src={`/images/${profileInfo.photo_url}`} className="card-img-top" alt="..." style={{maxHeight: "20vw"}}/> : null
                }
                <div className="card-body">
                  <h5 className="card-title">
                    { 
                    profileInfo.FIO
                        ? profileInfo.FIO
                        : profileInfo.name_organization 
                    }
                </h5>
                  <p className="card-text">{profileInfo.about}</p>
                  <p className="card-text">Почта: {profileInfo.email}</p>
                  <p className="card-text">Номер телефона: {profileInfo.phone_1}</p>
                  <p className="card-text">Дополнительный телефон: {profileInfo.phone_2}</p>
                  <p className="card-text">Город: {profileInfo.city}</p>
                  { isAdmin
                        ?
                    <>
                    <button
                      type="button" 
                      className="btn btn-primary m-2"
                      onClick={() => setVisiableEditModal(true)}
                    >
                      Редактировать профиль
                    </button>
                    <button
                      type="button" 
                      className="btn btn-primary m-2"
                      onClick={() => setVisiableChangeModal(true)}
                    >
                      Сменить пароль
                    </button>
                    <button
                      type="button" 
                      className="btn btn-primary m-2"
                      onClick={() => setVisiableCreateModal(true)}
                    >
                      Добавить событие
                    </button>
                    </>
                        : null
                  }
                    <EditProfileModal
                        visiable={visiableEditModal}
                        onClose={() => setVisiableEditModal(false)}
                        profileInfo={profileInfo}
                        accessToken={accessToken}
                    />
                    <ChangePasswordModal
                        visiable={visiableChangeModal}
                        onClose={() => setVisiableChangeModal(false)}
                        accessToken={accessToken}
                    />
                    <CreateEventModal
                        visiable={visiableCreateModal}
                        onClose={() => setVisiableCreateModal(false)}
                        accessToken={accessToken}
                    />
                  <p className="card-text"><small className="text-body-secondary">Дата регистрации: {profileInfo.created_at}</small></p>
                </div>
                </>
            }
            </div>
            <AdditionalProfileInformation
                eventButtonVisible={eventButtonVisible}
                setEventButtonVisible={setEventButtonVisible}
                accessToken={accessToken}
                profileId={profileId}
            />
        </div>
    );
};

export default Profile;   