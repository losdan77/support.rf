import "../styles/DontRememberPassword.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DontRememberPassword = () => {
    const [emailData, setEmailData] = useState("");
    const navigate = useNavigate();

    async function recoveryPassword(e) {
        e.preventDefault()
        const email = emailData

        try {
            await axios.post(`http://localhost:8000/organizations/dont_remember_password?email=${email}`)
            navigate("/verify_recovery_password_code", { state: { email } });
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
        <div className="dontRememberPasswordPage">
            <div className="dontRememberPasswordForm">
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
                        <div id="emailHelp" className="form-text">На Вашу почту придет код подтверждения</div>
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

export default DontRememberPassword;