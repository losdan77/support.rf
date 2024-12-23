import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import GiveHelp from '../pages/GiveHelp';
import TakeHelp from '../pages/TakeHelp';
import Registration from "../pages/Registration";
import DontRememberPassword from "../pages/DontRememberPassword";
import Profile from "../pages/Profile"
import EventPage from "../pages/EventPage"
import ErrorPage from "../pages/ErrorPage";
import Organizations from "../pages/Organizations";
import VerifyRecoveryPasswordCode from "../pages/VerifyRecoveryPasswordCode";
import CreateNewPassword from "../pages/CreateNewPassword";
import About from "../pages/About";
import Contacts from "../pages/Contacts";

const AppRouter = () => {
    return (
        <Routes>
            <Route index path="/" element={<Home/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/give_help" element={<GiveHelp/>}/>
            <Route exact path="/take_help" element={<TakeHelp/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/contacts" element={<Contacts/>}/>
            <Route exact path="/dont_remember_password" element={<DontRememberPassword/>}/>
            <Route exact path="/verify_recovery_password_code" element={<VerifyRecoveryPasswordCode/>}/>
            <Route exact path="/create_new_password" element={<CreateNewPassword/>}/>
            <Route exact path="/registration" element={<Registration/>}/>
            <Route exact path="/organizations" element={<Organizations/>}/>
            <Route exact path="/profile/:id" element={<Profile/>}/>
            <Route exact path="/event/:id" element={<EventPage/>}/>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>  
    );
};

export default AppRouter;