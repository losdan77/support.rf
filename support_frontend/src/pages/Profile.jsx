import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Profile.css"
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import AdditionalProfileInformation from "../components/AdditionalProfileInformation";
import { useAuth } from "../hooks/useAuth";
import Cookies from 'js-cookie';
import Spiner from "../components/Spiner";
import EditProfileModal from "../components/EditProfileModal";


const Profile = () => {
    const {isLogin, setIsLogin} = useAuth();
    const {profileId, setProfileId} = useAuth(); 
    const [isAdmin, setIsAdmin] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const params = useParams();
    const [profileInfo, setProfileInfo] = useState({}); 
    const [fetchProfileById, isLoading, error] = useFetching( async () => {
        const response = await getProfileInfo(params.id);   
        setProfileInfo(response.data);     
    })
    const [eventButtonVisible, setEventButtonVisible] = useState(true);
    const [visiableModal, setVisiableModal] = useState(false);

    async function getProfileInfo(id) {
        const response = await axios.get(`http://localhost:8000/organizations/profile/${id}`)
        return response;
    }    

    function checkIsAdmin() {
        console.log(params.id);
        console.log(profileId);
        console.log(params.id == profileId);
        
        
        
        if (params.id == profileId) {
            setIsAdmin(true);
        }
        else {
            setIsAdmin(false);
        }
    }

    useEffect(() => {
        const accessTokenFromCookies = Cookies.get("support_access_token")       
        if (accessTokenFromCookies) {
            setAccessToken(accessTokenFromCookies);   
            checkMe(accessTokenFromCookies);
        }
        fetchProfileById();
        checkIsAdmin();
    }, [params, visiableModal, setIsLogin, isLogin, profileId])

    async function checkMe(accessToken) {
        try {
            const response_me = await axios.post(`http://localhost:8000/organizations/me?access_token=${accessToken}`);
            setProfileId(response_me.data.id);
        }    
        catch(error) {
            alert("Ошибка сервера. Попробуйте позже");
        }
    }
    
    // useEffect(() => {
    //     const accessTokenFromCookies = Cookies.get("support_access_token")       
    //     if (accessTokenFromCookies) {
    //         setAccessToken(accessTokenFromCookies);   
    //         checkMe(accessTokenFromCookies);
    //     }
    // }, [setIsLogin, isLogin, profileId])

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
                <img src={profileInfo.photo_url} className="card-img-top" alt="..."/> : null
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
                  <button
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => setVisiableModal(true)}
                  >
                    Редактировать профиль
                  </button>
                        : null
                  }
                    <EditProfileModal
                        visiable={visiableModal}
                        onClose={() => setVisiableModal(false)}
                        profileInfo={profileInfo}
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
            />
        </div>
    );
};

export default Profile;   