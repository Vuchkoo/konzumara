import React from "react";
import Header from "../../components/user/Header";
import Sidebar from "../../components/Sidebar";
import User from "../../components/user/User";

const UserDashboard = () => {
  return (
    <div>
      <Header />
      <div className="grid">
        <Sidebar />
        <div className="product-grid">
          <User />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
