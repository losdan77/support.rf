import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "../styles/EditProfileModal.css"

const EditProfileModal = ({visiable, onClose, profileInfo, accessToken}) => {
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        FIO: profileInfo.FIO || "",
        name_organization: profileInfo.name_organization || "",
        about: profileInfo.about,
        city: profileInfo.city,
        phone_1: profileInfo.phone_1,
        phone_2: profileInfo.phone_2,
        site_url: profileInfo.site_url
    });

    async function getAllCity() {
        try {
            const response = await axios.get("http://localhost:8000/organizations/all_city");
            setCities(response.data);
        }
        catch(error) {        
            alert("Ошибка сервера");
        }
    }

    async function editProfileCommit(e) {
        e.preventDefault();

        try {
            const response = await axios.put(`http://localhost:8000/organizations/edit_profile/${profileInfo.id}`,
                {
                    name_organization: formData.name_organization,
                    site_url: formData.site_url,
                    phone_1: formData.phone_1,
                    phone_2: formData.phone_2,
                    about: formData.about,
                    FIO: formData.FIO,
                    city: formData.city,
                    access_token: accessToken
                }
            )
            if (response.status === 200) {
                onClose();
            }
            
        }
        catch(error) {
            alert("Ошибка сервера");
        }

    }

    useEffect(() => {
        getAllCity();
        //console.log(formData);
    }, [profileInfo])

    if (!visiable) return null;
    return (
        <div className="edit-profile-modal-overlay" onClick={onClose}>
            <div 
                className="edit-profile-modal-content" 
                onClick={(e) => e.stopPropagation()} 
            >
                <button 
                    className="close-button" 
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2>Редактировать профиль</h2>
                <form className="row g-3">
                    <div className="col-md-12">
                        { formData.FIO 
                            ?
                        <>
                        <label htmlFor="inputFIO" className="form-label">ФИО</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputFIO"
                            value={formData.FIO}
                            onChange={e => setFormData({...formData, FIO: e.target.value})}
                        />
                        </>
                            :
                        <>
                        <label htmlFor="inputFIO" className="form-label">Название организации</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputFIO"
                            value={formData.name_organization}
                            onChange={e => setFormData({...formData, name_organization: e.target.value})}
                        />    
                        </>
                        }
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAbout" className="form-label">О себе</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputAbout"
                            value={formData.about}   
                            onChange={e => setFormData({...formData, about: e.target.value})} 
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="inputPhone1" className="form-label">Номер телефона</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            id="inputPhone1"
                            value={formData.phone_1}
                            onChange={e => setFormData({...formData, phone_1: e.target.value})}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="inputPhone2" className="form-label">Дополнительный телефон</label>
                        <input 
                            type="tel" 
                            className="form-control" 
                            id="inputPhone2"
                            value={formData.phone_2}  
                            onChange={e => setFormData({...formData, phone_2: e.target.value})}  
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputURL" className="form-label">Веб-страница</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputURL"
                            value={formData.site_url}
                            onChange={e => setFormData({...formData, site_url: e.target.value})}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="inputCity" className="form-label">Город</label>
                        <select 
                            id="inputCity" 
                            className="form-select"
                            value={formData.city}  
                            onChange={e => setFormData({...formData, city: e.target.value})}  
                        >
                        {cities.map((city) => (
                            <option key={city.id} value={city.city}>{city.city}</option>
                        ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            onClick={editProfileCommit}
                        >
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfileModal;