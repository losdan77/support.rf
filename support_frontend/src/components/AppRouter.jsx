import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import GiveHelp from '../pages/GiveHelp';
import TakeHelp from '../pages/TakeHelp';
import Registration from "../pages/Registration";
import RecoveryPassword from "../pages/RecoveryPassword";
import Profile from "../pages/Profile"

const AppRouter = () => {
    return (
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/give_help" element={<GiveHelp/>}/>
            <Route exact path="/take_help" element={<TakeHelp/>}/>
            <Route exact path="/recovery_password" element={<RecoveryPassword/>}/>
            <Route exact path="/registration" element={<Registration/>}/>
            <Route exact path="/profile/:id" element={<Profile/>}/>
        </Routes>  
    );
};

export default AppRouter;