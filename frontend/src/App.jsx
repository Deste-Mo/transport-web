// Main import
import {Routes, Route} from "react-router-dom";


// Components
import Home from './pages/Home';
import Labo from './pages/labo/Labo';
import AppLayout from "./layouts/AppLayout.jsx";
import AuthLayout, {
    Login,
    RegisterAccountType,
    RegisterIdentification,
    RegisterSecurity
} from "./layouts/AuthLayout.jsx";
import NotFound from "./pages/auth/NotFound.jsx";
import Forbidden from "./pages/auth/Forbidden.jsx";
import Unauthorized from "./pages/auth/Unauthorized.jsx";
import ProfileEdit from "./pages/profile/ProfileEdit.jsx";
import Notifications from "./pages/Notifications.jsx";
import Friends from "./pages/Friend.jsx";
import Offers from "./pages/Offers.jsx";
import NavPageLayout from "./layouts/NavPageLayout.jsx";

import Security from './pages/profile/Security';
import Messages from "./pages/conversations/Message.jsx";
import MessageList from "./pages/conversations/MessageList.jsx";
import ProfileLayout from "./layouts/ProfileLayout.jsx";
import GlobalLayout from "./layouts/GlobalLayout.jsx";
import ProfileDetails from "./pages/profile/ProfileDetails.jsx";
import ResetPassword from "./pages/auth/forgotPassword/ResetPassword.jsx";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword.jsx";
import ProtectedProfileLayout from "./layouts/ProtectedProfileLayout.jsx";
import NewOffer from "./pages/offer/NewOffer.jsx";

// TODO :
/*
  - Animation Skeleton
  - Theme changer
  - Settings
*/


export default function App() {

    return (
      <div className="App">
        <Routes>
          <Route element={<GlobalLayout />}>
            {/* Auth */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />}></Route>

              <Route
                path="/registerAccountType"
                element={<RegisterAccountType />}
              ></Route>
              <Route
                path="/registerIdentification"
                element={<RegisterIdentification />}
              ></Route>
              <Route
                path="/registerSecurity"
                element={<RegisterSecurity />}
              ></Route>

              <Route path="/forgot-password" element={<ForgotPassword/>} />

              <Route path="/reset-password/:token" element={<ResetPassword/>} />
            </Route>

            {/* App */}
            <Route element={<AppLayout />}>
              {/*Profile*/}
              <Route element={<ProfileLayout />}>
                <Route path="profile/:id" element={<ProfileDetails />} />
                 
                {/* Check the id */}
                <Route element={<ProtectedProfileLayout/>}>
                    <Route path="profile/:id/newOffer" element={<NewOffer />} />
                    <Route path="profile/:id/edit/" element={<ProfileEdit />} />
                </Route>
                  
              </Route>

              <Route element={<NavPageLayout />}>
                {/*Home*/}
                <Route path="/" element={<Home />}></Route>

                {/* Offers*/}
                <Route path="/offer" element={<Offers />} />

                {/* Friends*/}
                <Route path="/friend" element={<Friends />} />

                {/* Notifications*/}
                <Route path="/notification" element={<Notifications />} />

                {/*Messages*/}
                <Route path="/discussion" element={<MessageList />} />
                <Route path="/message" element={<Messages />} />
              </Route>
            </Route>

            {/* Pages Error */}
            <Route path="*" element={<NotFound />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="/notFound" element={<NotFound />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/*Not implemented routes and components*/}
            <Route path="/securite" element={<Security />} />



            {/* Labo (Only for testing components)*/}
            <Route path="/labo" element={<Labo />}></Route>
          </Route>
        </Routes>
      </div>
    );
}