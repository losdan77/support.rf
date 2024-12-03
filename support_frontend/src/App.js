import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from './components/AppRouter';
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Navbar/>
        <AppRouter/>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
