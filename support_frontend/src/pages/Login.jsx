import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import Cookies from 'js-cookie';
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const [loginData, setLoginData] = useState({email: '', password: ''})  
    const navigate = useNavigate();
    const { setIsLogin } = useAuth();
    const { setProfileId } = useAuth(); //
  

    async function login(e) {
        e.preventDefault()
        const email = loginData.email
        const password = loginData.password

        try {
            const response = await axios.post('http://localhost:8000/organizations/login',
                {email, password}
            )
            
            Cookies.set("support_access_token", response.data, {expires: 1});
            
            const accessToken = response.data
            
            const response_me = await axios.post(`http://localhost:8000/organizations/me?access_token=${accessToken}`)
            
            setIsLogin(true);
            setProfileId(response_me.data.id)
            navigate(`/profile/${response_me.data.id}`);
        }
        catch(error) {        
            if (error.status === 401) {
                alert("Неверный email или пароль");
            } else {
                alert("Ошибка сервера. Попробуйте позже");
            }
        }

        setLoginData({email: '', password: ''})
    }


    return (
        <div className="authPage">
            <div className="authForm">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email адрес</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp"
                            value={loginData.email}
                            onChange={e => setLoginData({...loginData, email: e.target.value})}
                        />
                        <div id="emailHelp" className="form-text">Мы никогда не делимся Вашим адресом.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1"
                            value={loginData.password}
                            onChange={e => setLoginData({...loginData, password: e.target.value})}
                        />
                    </div>
                    <div className="mb-3 form-check">
                        <Link to="/registration" style={{ textDecoration: 'none' }}>
                            <p className="link-dark">Нет аккаунта?</p>
                        </Link>
                    </div>
                    <div className="mb-3 form-check">
                        <Link to="/recovery_password" style={{ textDecoration: 'none' }}>
                            <p className="link-dark">Забыли пароль?</p>
                        </Link>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={login}
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;   