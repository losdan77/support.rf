import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../hooks/useFetching";
import { AuthContext } from "../context";
import AdditionalProfileInformation from "../components/AdditionalProfileInformation";
import Spiner from "../components/Spiner";
import EditProfileModal from "../components/EditProfileModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import CreateEventModal from "../components/CreateEventModal";
import MyPlaceModal from "../components/MyPlaceModal";
import "../styles/Profile.css"

const Profile = () => {
    const API_URL = process.env.REACT_APP_API_URL;    
    const {isLogin, setIsLogin, profileId, setProfileId, accessToken, setAccessToken } = useContext(AuthContext);
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
    const [visiableMyPlaceModal, setVisiableMyPlaceModal] = useState(false);
    const [file, setFile] = useState(null);
    const [updateFile, setUpdateFile] = useState(false);
    const [loadUploadFile, setLoadUploadFile] = useState(false);

    async function getProfileInfo(id) {
      try {
        const response = await axios.get(`${API_URL}/organizations/profile/${id}`);
        return response;
      }
      catch(error) {
        alert('Ошибка сервера');
      }
    }    

    async function uploadProfileImage(e) {
      e.preventDefault();
      try {
        const response = await axios.post(`${API_URL}/images/add_profile_image_to_s3?id_profile=${profileId}&access_token=${accessToken}`,
          {file},
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUpdateFile(!updateFile);
      }
      catch(error) {
        alert("Ошибка сервера");
      }
      finally {
        setFile(null);
      }
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
    
    useEffect(() => {
      if (updateFile) {
        setLoadUploadFile(true);
        setTimeout(() => {
          fetchProfileById();
          setLoadUploadFile(false);
        }, 4000);
      }
    }, [updateFile])

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
                {/* {profileInfo.photo_url ?
                  <img src={`${profileInfo.photo_url}`} className="card-img-top profile-photo" alt="Фото"/> : null
                } */}
                {profileInfo.photo_url ? (
                  <div className="profile-photo-container">
                    <div
                      className="profile-photo-blur"
                      style={{ backgroundImage: `url(${profileInfo.photo_url})` }}
                    ></div>
                    <img
                      src={`${profileInfo.photo_url}`}
                      className="profile-photo"
                      alt="Фото"
                    />
                  </div>
                ) : null}
                { isAdmin 
                  ?
                  <form>
                    <div className="input-group">
                      <input 
                        type="file" 
                        className="form-control" 
                        id="inputGroupFile04" 
                        aria-describedby="inputGroupFileAddon04" 
                        aria-label="Upload"
                        onChange={e => setFile(e.target.files[0])}
                      />
                      { loadUploadFile
                        ?
                        <button className="btn btn-primary" type="button" disabled>
                          <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                          <span role="status">Loading...</span>
                        </button>
                        :
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button" 
                          id="inputGroupFileAddon04"
                          onClick={uploadProfileImage}
                        >
                          Загрузить фото
                        </button>
                      }
                    </div>
                  </form> : null
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
                      className="btn btn-primary my-2 me-2"
                      onClick={() => setVisiableEditModal(true)}
                    >
                      Редактировать профиль
                    </button>
                    <button
                      type="button" 
                      className="btn btn-primary my-2 me-2"
                      onClick={() => setVisiableChangeModal(true)}
                    >
                      Сменить пароль
                    </button>
                    <button
                      type="button" 
                      className="btn btn-primary my-2 me-2"
                      onClick={() => setVisiableCreateModal(true)}
                    >
                      Добавить событие
                    </button>
                    <button
                      type="button" 
                      className="btn btn-primary my-2 me-2"
                      onClick={() => setVisiableMyPlaceModal(true)}
                    >
                      Указать свое местоположение
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
                    <MyPlaceModal
                      visiable={visiableMyPlaceModal}
                      onClose={() => setVisiableMyPlaceModal(false)}
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