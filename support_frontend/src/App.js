import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from './components/AppRouter';
import Footer from "./components/Footer";
import { AuthProvider } from "./hooks/useAuth";


function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter basename="/">
          <Navbar/>
          <AppRouter/>
          <Footer/>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
