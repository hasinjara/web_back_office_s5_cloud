import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { AuthProvider, useAuth } from "./AuthContext"; 
import Login from "./views/examples/Login";
import NotFound from "./components/NotFound/NotFound";



const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const { userInfo } = useAuth();

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          {userInfo != null && (
            <>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/auth/*" element={<AuthLayout />} />
            </>
          )}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
{/* <Routes>
<Route path="/admin/*" element={<AdminLayout />} />
<Route path="/auth/*" element={<AuthLayout />} />
<Route path="*" element={<Navigate to="/admin/index" replace />} />
</Routes> */}
