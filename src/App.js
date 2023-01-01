import { BrowserRouter, Route, Routes } from "react-router-dom";
import PositionMarker from "./pages/PositionMarker";
import RobotParameters from "./pages/RobotParameters";
import SideBarProvider from "./contexts/SideBarMenuContext";
import HomePage from "./pages/HomePage";
import RosContextProvider from "./contexts/RosContext";
import UsersHome from "./pages/UsersHome";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import SystemSetting from "./pages/SystemSetting";
import UpdatePassword from "./pages/Updatepassword";
function App() {
  return (
    <div>
      <RosContextProvider>
        <SideBarProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login/>} />
              <Route path="/resetpassword" element={<ResetPassword/>} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/setup/positionmarker" element={<PositionMarker />} />
              <Route path="/setup/robotparameters" element={<RobotParameters />}/>
              <Route path="/setup/usershome" element={<UsersHome />}/>
              <Route path="/setting" element={<SystemSetting />} />
              <Route path="/updatepassword" element={<UpdatePassword />} />
              <Route path="*" element={<> not found</>} />
              {/* <Route path="/Joystick" element={<ManualJoystick />} /> */}
              {/* <Route path="/logout" element={<Logout />} />  */}
              {/* <Route path="Dashboards/DefaultDashboard" element={<Home />} /> */}
              {/* <Route path="/SideBar" element={<SideBar />} /> */}
              
            </Routes>
          </BrowserRouter>
        </SideBarProvider>
      </RosContextProvider>
    </div>
  );
}


export default App;
