import {Link} from "react-router-dom";
import "../styles/Home.css"

const Home = () => {
    return (
        <div className="homePage">
            <div className="infoText"> 
                Выберите необходимую сторону:
            </div>
            <div className="choiceDiv">
                <Link to="/give_help" style={{ textDecoration: 'none' }}>
                    <div className="giveHelp">    
                        Найти кому нужна помощь
                    </div>
                </Link>
                <Link to="/take_help" style={{ textDecoration: 'none' }}>
                    <div className="takeHelp">
                        Найти кто предлагает помощь
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Home;   