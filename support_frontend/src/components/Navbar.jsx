import {Link} from "react-router-dom";
import {useState} from "react";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const Navbar = () => {
    const {isLogin, setIsLogin} = useAuth();
    const {profileId, setProfileId} = useAuth(); //

    function logout() {
        Cookies.remove("support_access_token");
        setIsLogin(false);
    }

    async function checkMe(accessToken) {
        const response_me = await axios.post(`http://localhost:8000/organizations/me?access_token=${accessToken}`)
        setProfileId(response_me.data.id);
    }
    
    useEffect(() => {
        const accessToken = Cookies.get("support_access_token")        
        if (accessToken) {
            setIsLogin(true); 
            checkMe(accessToken);
        }
    }, [setIsLogin])

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand">
                    Помоги.рф
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to='/about' className="nav-link">
                            О нас
                        </Link>
                    </div>
                    <div className="navbar-nav">
                        <Link to='/contacts' className="nav-link">
                            Контакты
                        </Link>
                    </div>
                    {isLogin 
                        ?
                    <>
                    <div className="navbar-nav">
                        <Link to={`/profile/${profileId}`} className="nav-link">
                            Профиль
                        </Link>
                    </div>
                    <div className="navbar-nav">
                        <Link to='/' className="nav-link" onClick={logout}>
                            Выйти
                        </Link>
                    </div>
                    </>
                        :
                    <div className="navbar-nav">
                        <Link to='/login' className="nav-link">
                            Войти
                        </Link>
                    </div>
                    }
                </div>    
            </div>
        </nav>
    );
};

export default Navbar;