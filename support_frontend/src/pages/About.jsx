import "../styles/About.css"

const About = () => {
    return(
        <div className="aboutPage">
            <h1>О нас</h1>
            <p className="text-start">Добро пожаловать на платформу <strong>Помоги.рф</strong> — место, где волонтёры, 
                общественные организации и нуждающиеся объединяются для создания лучшего мира.
            </p>
            <p className="text-start">Наша цель — стать связующим звеном между теми, кто готов помогать, 
                и теми, кто нуждается в поддержке. Мы верим, что каждый вклад, 
                даже самый маленький, может изменить чью-то жизнь.
            </p>
            <h1>Что делает наш проект особенным?</h1>
            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Объединение усилий
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            Мы создаём пространство, где волонтёры и организации могут легко взаимодействовать, планировать мероприятия и оказывать помощь.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Современные технологии
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            Наш сайт построен на мощном backend'е, разработанном на Python (FastAPI), и удобном frontend'е, написанном на React. Это обеспечивает быстрое и надёжное взаимодействие для всех пользователей.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Поддержка профессионалов
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
                        <div className="accordion-body">
                            Платформа создана при поддержке Федерации спортивного программирования. Наш разработчик имеет 1 взрослый разряд по спортивному программированию, что подтверждает его профессионализм и опыт.
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-center" style={{marginTop: "2vh"}}>
                Присоединяйтесь к нам, чтобы вместе создавать добро и менять жизни к лучшему!
            </p>
        </div>
    );
}

export default About;