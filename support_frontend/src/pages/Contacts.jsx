import { Link } from "react-router-dom";
import "../styles/Contacts.css"

const Contacts = () => {
    return(
        <div className="contactsPage">
            <h1>Контакты</h1>
            <p className="text-start">
                Мы всегда открыты для ваших предложений, вопросов и обратной связи!
            </p>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Электронная почта
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            support@pomogi.rf
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Телефон горячей линии
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            +7 (800) 123-45-67
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Социальные сети
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            <div className="list-group">
                                <Link to="https://vk.com" target="_blank" className="list-group-item list-group-item-action">Вконтакте</Link>
                                <Link to="https://web.telegram.org" target="_blank" className="list-group-item list-group-item-action">Telegram</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1>Адрес офиса:</h1>
            <p className="text-start">
                Москва, ул. Программирования, д. 1, оф. 42
            </p>
            <p className="text-start">
                Если у вас есть вопросы о том, как присоединиться к платформе, стать волонтёром или организовать мероприятие, 
                свяжитесь с нами — мы всегда рады помочь!
            </p>
            <h1>Работаем вместе ради добра!</h1>
        </div>
    );
}

export default Contacts;