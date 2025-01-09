import {Link} from "react-router-dom";
import "../styles/Home.css"

const Home = () => {
    return (
        <div className="homePage">
            <div className="infoText">
                Выберите необходимую сторону:
            </div>
            <div className="choiceDiv">
                <Link to="/give_help" className="choice giveHelp">
                    Найти кому нужна помощь
                </Link>
                <Link to="/take_help" className="choice takeHelp">
                    Найти кто предлагает помощь
                </Link>
            </div>
        </div>
    );
};

export default Home;   