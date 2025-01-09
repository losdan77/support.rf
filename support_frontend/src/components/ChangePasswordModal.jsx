import { useState } from "react";
import axios from "axios";
import "../styles/ChangePasswordModal.css"

const ChangePasswordModal = ({visiable, onClose, accessToken}) => {
    const API_URL = process.env.REACT_APP_API_URL; 
    const [successChangePasswordAlert, setSuccessChangePasswordAlert] = useState(false); 
    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
        verify_new_password: ""
    });

    async function changePassword(e) {
        e.preventDefault()

        try {
            const response = await axios.post(`${API_URL}/organizations/change_password`,
                {
                    old_password: formData.old_password,
                    new_password: formData.new_password,
                    verify_new_password: formData.verify_new_password,
                    access_token: accessToken
                }
            )
            if (response.status === 200) {
                setSuccessChangePasswordAlert(true);
                setTimeout(() => {
                    setSuccessChangePasswordAlert(false);
                    onClose();
                }, 1000);
            }
        }
        catch(error) {
            console.log(error.response.data.detail);
            if (error.response.data.detail === "Старый пароль не совпадает") {
                alert("Старый пароль не совпадает");
            }
            else if (error.response.data.detail === "Новый пароль должен отличаться от старого") {
                alert("Новый пароль должен отличаться от старого");
            }
            else if (error.response.data.detail === "Пароли не совпадают") {
                alert("Новые пароли не совпадают");
            }
            else {
                alert("Ошибка сервера");
            }
        }
        finally {
            setFormData({
                old_password: "",
                new_password: "",
                verify_new_password: ""
            })
        }
    }

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
                <h2>Смена пароля</h2>
                <form className="row g-3">
                    <div className="col-md-12">        
                        <label htmlFor="inputOldPassword" className="form-label">Старый пароль</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="inputOldPassword"
                            value={formData.old_password}
                            onChange={e => setFormData({...formData, old_password: e.target.value})}
                        />  
                    </div>
                    <div className="col-md-12">        
                        <label htmlFor="inputNewPassword" className="form-label">Новый пароль</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="inputNewPassword"
                            value={formData.new_password}
                            onChange={e => setFormData({...formData, new_password: e.target.value})}
                        />  
                    </div>
                    <div className="col-md-12">        
                        <label htmlFor="inputVerifyNewPassword" className="form-label">Подтвердите новый пароль</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="inputVerifyPassword"
                            value={formData.verify_new_password}
                            onChange={e => setFormData({...formData, verify_new_password: e.target.value})}
                        />  
                    </div>
                    <div className="col-12">
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            onClick={changePassword}
                        >
                            Сохранить
                        </button>
                    </div>
                    { successChangePasswordAlert 
                        ?
                    <div className="alert alert-success" role="alert">
                        Пароль успешно изменен!
                    </div>
                        : null
                    }
                </form>      
            </div>
        </div>
    );
}

export default ChangePasswordModal;