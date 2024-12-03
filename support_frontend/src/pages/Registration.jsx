import "../styles/Registration.css"

const Registration = () => {
    return (
        <div className="registrationPage">
            <div className="registrationForm">
            <form className="row g-3">
                <div className="col-md-12">
                    <label htmlFor="inputEmail4" className="form-label">Email*</label>
                    <input type="email" className="form-control" id="inputEmail4"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Пароль*</label>
                    <input type="password" className="form-control" id="inputPassword4"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputPassword4" className="form-label">Повторите пароль*</label>
                    <input type="password" className="form-control" id="inputPassword4"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputUrl" className="form-label">Веб-сайт</label>
                    <input type="text" className="form-control" id="inputUrl" placeholder="https://myblog.ru"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputOrganization" className="form-label">Название организации</label>
                    <input type="text" className="form-control" id="inputOrganization" placeholder="Добродел"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputFIO" className="form-label">ФИО</label>
                    <input type="text" className="form-control" id="inputFIO" placeholder="Иванов Иван Иванович"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">Номер телефона</label>
                    <input type="text" className="form-control" id="inputCity"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputState" className="form-label">Город</label>
                    <select id="inputState" className="form-select">
                    <option selected></option>
                    <option>Москва</option>
                    <option>Орел</option>
                    </select>
                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck"/>
                        <label className="form-check-label" htmlFor="gridCheck">
                            Организация
                        </label>
                    </div>
                </div>
                <div className="col-12">
                    <button type="submit" class="btn btn-primary">Зарегестрироваться</button>
                </div>
            </form>
            </div>
        </div>
    );
};

export default Registration