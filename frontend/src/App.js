// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
// import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Tutor_HomePage from "./pages/HomePage/Tutor-HomePage";
import Student_HomePage from "./pages/HomePage/Student-HomePage";
import InboxPage from "./pages/InboxPage/InboxPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import SearchPage from "./pages/SearchPage/SearchPage";
import Public_Tutor_HomePage from "./pages/PublicTutorPage/PublicTutorPage";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route
            path="/student"
            element={
              <PrivateRoute>
                <Student_HomePage/>
              </PrivateRoute>
            }
          />
          <Route
            path="/tutor"
            element={
              <PrivateRoute>
                <Tutor_HomePage/>
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student/search" element={<SearchPage />} />
          <Route path="/tutor" >
          <Route path=":id" element={<Public_Tutor_HomePage/>} />
          <Route path="/tutor/inbox" element={<InboxPage/>} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
