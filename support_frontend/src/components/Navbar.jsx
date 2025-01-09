import {Link} from "react-router-dom";
import { useContext } from "react";
import Cookies from 'js-cookie';
import { AuthContext } from "../context";

const Navbar = () => {
    const {isLogin, setIsLogin, profileId, setProfileId} = useContext(AuthContext);

    function logout() {
        Cookies.remove("support_access_token");
        setIsLogin(false);
    }

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
                        <Link to='/organizations' className="nav-link">
                            Организации и пользователи &#128269;
                        </Link>
                    </div>
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