import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Registration.css"

const Registration = () => {
    const API_URL = process.env.REACT_APP_API_URL;   
    const [regData, setRegData] = useState({
        email: '', 
        password: '',
        password_verify: '',
        name_organization: '',
        site_url: '',
        phone_1: '',
        phone_2: '',
        about: '',
        FIO: '',
        city: ''
    }) 
    const [isOrganization, setIsOrganization] = useState(false);
    const [cities, setCities] = useState([])
    const [citiesError, setCitiesError] = useState(false)
    const navigate = useNavigate();

    async function registration(e) {
        e.preventDefault()
        if (!regData.city) {
            setCitiesError(true);
            return;
        }

        let id_type_organization = null 
        if (isOrganization) {
            id_type_organization =  2
        }
        else {
            id_type_organization =  1
        }

        try {
            const response = await axios.post(`${API_URL}/organizations/registr`,
                {
                    email: regData.email,
                    password: regData.password,
                    password_verify: regData.password_verify,
                    name_organization: regData.name_organization,
                    site_url: regData.site_url,
                    phone_1: regData.phone_1,
                    phone_2: regData.phone_2,
                    about: regData.about,
                    FIO: regData.FIO,
                    city: regData.city,
                    id_type_organization
                }
            )
            if (response.status === 200) {
                navigate(`/login`);
            }
        }
        catch(error) {
            console.log(error);
            
            if (error.status === 409) {
                alert("Пароли не совпадают");
            } 
            if (error.status === 401) {
                if (error.response.data.detail === "Данный пользовать уже существует") {
                    alert("Данный пользователь уже существует");
                }
                if (error.response.data.detail === "Короткий пароль") {
                    alert("Слишком короткий пароль, минимум 5 символов");
                }
            } 
            else {
                alert("Ошибка сервера. Попробуйте позже");
            }
        }
        finally {
            setRegData({
                email: '', 
                password: '',
                password_verify: '',
                name_organization: '',
                site_url: '',
                phone_1: '',
                phone_2: '',
                about: '',
                FIO: '',
                city: ''
            })
            setCitiesError(false);
        }
    }

    async function getAllCity() {
        try {
            const response = await axios.get(`${API_URL}/organizations/all_city`);
            setCities(response.data);
        }
        catch(error) {        
            alert("server error");
        }
    }

    useEffect(() => {
        getAllCity();
    }, []);

    return (
        <div className="registrationPage">
            <div className="registrationForm">
            <form className="row g-3">
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label">Email*</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="inputEmail"
                        value={regData.email}
                        onChange={e => setRegData({...regData, email: e.target.value})}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword" className="form-label">Пароль*</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="inputPassword"
                        value={regData.password}
                        onChange={e => setRegData({...regData, password: e.target.value})}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword" className="form-label">Повторите пароль*</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="inputPasswordSecond"
                        value={regData.password_verify}
                        onChange={e => setRegData({...regData, password_verify: e.target.value})}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputUrl" className="form-label">Веб-сайт</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputUrl" 
                        placeholder="https://myblog.ru"
                        value={regData.site_url}
                        onChange={e => setRegData({...regData, site_url: e.target.value})}
                    />
                </div>
                {isOrganization
                    ?
                <div className="col-12">
                    <label htmlFor="inputOrganization" className="form-label">Название организации</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputOrganization" 
                        placeholder="Добродел"
                        value={regData.name_organization}
                        onChange={e => setRegData({...regData, name_organization: e.target.value})}
                    />
                </div>
                    :
                <div className="col-12">
                    <label htmlFor="inputFIO" className="form-label">ФИО</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="inputFIO" 
                        placeholder="Иванов Иван Иванович"
                        value={regData.FIO}
                        onChange={e => setRegData({...regData, FIO: e.target.value})}
                    />
                </div>
                }   
                <div className="col-md-6">
                    <label htmlFor="inputPhone" className="form-label">Номер телефона</label>
                    <input 
                        type="tel" 
                        className="form-control" 
                        id="inputPhone"
                        value={regData.phone_1}
                        onChange={e => setRegData({...regData, phone_1: e.target.value})}
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputSecondPhone" className="form-label">Дополнительный номер телефона</label>
                    <input 
                        type="tel" 
                        className="form-control" 
                        id="inputSecondPhone"
                        value={regData.phone_2}
                        onChange={e => setRegData({...regData, phone_2: e.target.value})}
                    />
                </div>      
                <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">Город</label>
                    <select 
                        id="inputState" 
                        className="form-select"
                        value={regData.city}
                        onChange={e => setRegData({...regData, city: e.target.value})}
                    >
                        <option value="">Выберите город</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.city}>{city.city}</option>
                    ))}
                    </select>
                    {citiesError ? <p className="text-danger">Пожалуйста, выберите город</p> : null}
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            id="gridCheck"
                            value={isOrganization}
                            onChange={() => setIsOrganization(!isOrganization)}
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Организация
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        onClick={registration}
                    >
                        Зарегестрироваться
                    </button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Registration