import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "../ui/AppBar";
import Sidebar from "../ui/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#F3F4F6",
      }}
    >
      <AppBar onMenuClick={() => setIsSidebarOpen(true)} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main
          style={{
            flex: 1,
            padding: "2rem",
            width: "100%",
            boxSizing: "border-box",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
