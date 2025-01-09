import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/CreateNewPassword.css"

const CreateNewPassword = () => {
    const API_URL = process.env.REACT_APP_API_URL; 
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [formData, setFormData] = useState({
        new_password: "",
        verify_new_password: ""
    });

    async function createNewPassword(e) {
        e.preventDefault()

        try {
            const response = await axios.post(`${API_URL}/organizations/create_new_password`,
                {
                    email,
                    new_password: formData.new_password,
                    verify_new_password: formData.verify_new_password,
                }
            )
            navigate("/login");
        }
        catch(error) {
            if (error.response.data.detail === "Пароли не совпадают") {
                alert("Пароли не совпадают");
            }
            else {
                alert("Ошибка сервера");
            }
        }
        finally {
            setFormData({
                new_password: "",
                verify_new_password: ""
            })
        }
    }
    
    return (
        <div className="createNewPasswordPage">
            <div className="createNewPasswordForm">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputNewPassword" className="form-label">Новый пароль</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputNewPassword" 
                            aria-describedby="emailHelp"
                            value={formData.new_password}
                            onChange={e => setFormData({...formData, new_password: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputNewVerifyPassword" className="form-label">Подтвердите новый пароль</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputNewVerifyPassword" 
                            aria-describedby="emailHelp"
                            value={formData.verify_new_password}
                            onChange={e => setFormData({...formData, verify_new_password: e.target.value})}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={createNewPassword}
                    >
                        Сохранить
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateNewPassword;