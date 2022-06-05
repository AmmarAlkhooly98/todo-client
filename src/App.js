import "./App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Todos from "./components/Todos";
import UserProfile from "./components/UserProfile";
import Home from "./components/Home";
import RequireAuth from "./RequireAuth";
import Notifications from "./components/Notifications";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Notifications />
      <Routes>
        <Route exact path="/" index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route exact path="/todos" index element={<Todos />} />
          <Route exact path="/profile" index element={<UserProfile />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
