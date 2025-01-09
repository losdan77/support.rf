import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/VerifyRecoveryPasswordCode.css"

const VerifyRecoveryPasswordCode = () => {
    const API_URL = process.env.REACT_APP_API_URL;   
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [codeData, setCodeData] = useState("");
    
    async function verifyCode(e) {
        e.preventDefault()
        const code = codeData

        try {
            const response = await axios.post(`${API_URL}/organizations/verify_singlemode_code_from_mail?email=${email}&code=${code}`);
            if (response.data === false) {
                alert("Неверный код")
            }
            if (response.data === true) {
                navigate("/create_new_password", { state: { email } });
            }
        }
        catch(error) {
            alert("Ошибка сервера. Попробуйте позже");
        }
        setCodeData("");
    }

    return (
        <div className="verifyRecoveryPasswordCodePage">
            <div className="verifyRecoveryPasswordCodeForm">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputCode" className="form-label">Код подтверждения из почты</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputCode" 
                            aria-describedby="emailHelp"
                            value={codeData}
                            onChange={e => setCodeData(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">Далее вы создадите новый пароль</div>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={verifyCode}
                    >
                        Проверить
                    </button>
                </form>
            </div>
        </div>
    );
}

export default VerifyRecoveryPasswordCode;