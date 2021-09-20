import Login from "./components/pages/login/Login";
import Register from "./components/pages/register/Register";
import TopBar from "./components/topbar/TopBar";
import Home from "./components/pages/home/Home";
import Settings from "./components/pages/settings/Settings";
import Write from "./components/pages/write/Write";
import Single from "./components/pages/single/Single";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Link
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Footer from "./components/Footer/Footer";
import Contact from "./components/pages/contact/Contact";
import About from "./components/pages/about/About";
import "./App.css";

function App() {
  const { user } = useContext(Context);
  return (
    <div className="appContainer">
      <Router>
        <div className="navbarContainer">
          <TopBar />
        </div>
        <div className="contentContainer">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/contact"><Contact /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/register">{user ? <Home /> : <Register />}</Route>
            <Route path="/login">{user ? <Home /> : <Login />}</Route>
            <Route path="/write">{user ? <Write /> : <Login />}</Route>
            <Route path="/settings">{user ? <Settings /> : <Login />}</Route>
            <Route path="/post/:postId">
              <Single />
            </Route>
          </Switch>

        </div>
        <div className="footerContainer">
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
