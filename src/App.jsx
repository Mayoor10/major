import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/UserLogin/SignUp";
import { useEffect } from "react";
import { getUserAuth } from "./actions";
import { connect } from "react-redux";
import PostModal from "./components/PostModal";
import AttendanceTable from './components/AttendanceTable'; 
function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/create" element={<PostModal/>} /> */}
          <Route path="/attendance" element={<AttendanceTable />} />


          <Route
            path="/home"
            element={
              <>
                {/* <Header /> */}
                <Home />
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);