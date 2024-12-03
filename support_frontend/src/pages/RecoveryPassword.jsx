import "../styles/RecoveryPassword.css"

const RecoveryPassword = () => {
    return (
        <div className="recoveryPasswordPage">
            <div className="recoveryPasswordForm">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email адрес</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">На Вашу почту придет новый пароль</div>
                    </div>
                    <button type="submit" className="btn btn-primary">Отправить</button>
                </form>
            </div>
        </div>
    );
};

export default RecoveryPassword;