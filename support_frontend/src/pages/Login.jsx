import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/Login.css"

const Login = () => {
    const [loginData, setLoginData] = useState({email: '', password: ''})

    const showLoginData = (e) => {
        e.preventDefault()
        console.log(loginData);
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
                        onClick={showLoginData}
                    >
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;   