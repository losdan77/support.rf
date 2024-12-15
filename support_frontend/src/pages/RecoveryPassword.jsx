import "../styles/RecoveryPassword.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RecoveryPassword = () => {
    const [emailData, setEmailData] = useState("");
    const navigate = useNavigate();

    async function recoveryPassword(e) {
        e.preventDefault()
        const email = emailData

        try {
            await axios.post(`http://localhost:8000/organizations/dont_remember_password?email=${email}`)
            navigate("/login")
        }
        catch(error) {
            if (error.status === 404) {
                alert("Пользователя с таким адресом не существует");
            }
            else {
                alert("Ошибка сервера. Попробуйте позже");
            }
        }

        setEmailData("")
    }

    return (
        <div className="recoveryPasswordPage">
            <div className="recoveryPasswordForm">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email адрес</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp"
                            value={emailData}
                            onChange={e => setEmailData(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">На Вашу почту придет новый пароль</div>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={recoveryPassword}
                    >
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RecoveryPassword;