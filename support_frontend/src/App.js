import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from './components/AppRouter';
import Footer from "./components/Footer";
import { AuthContext } from "./context";
import { useState , useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
//import { AuthProvider } from "./hooks/useAuth";


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  async function checkMe(accessToken) {
    try {
        const response_me = await axios.post(`http://localhost:8000/organizations/me?access_token=${accessToken}`);
        setProfileId(response_me.data.id);
    }    
    catch(error) {
        alert("Ошибка сервера. Попробуйте позже");
    }
  }

  useEffect(() => {
    const accessToken = Cookies.get("support_access_token");        
    if (accessToken) {
        setIsLogin(true); 
        setAccessToken(accessToken)
        checkMe(accessToken);
    }
  }, [setIsLogin, checkMe, isLogin])

  return (
    <div>
      <AuthContext.Provider value={{ 
        isLogin,
        setIsLogin,
        profileId, 
        setProfileId,
        accessToken,
        setAccessToken
      }}>
        <BrowserRouter basename="/">
          <Navbar/>
          <AppRouter/>
          <Footer/>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
