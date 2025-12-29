import React from "react";
import { colors } from "../../utils/colors";
import { useAppSelector } from "../../app/hooks";
import { FiMenu } from "react-icons/fi";
import "../../styles/components/AppBar.css";

const IconMenu = FiMenu as any;

interface AppBarProps {
  onMenuClick?: () => void;
}

const AppBar = ({ onMenuClick }: AppBarProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const initial = user?.email ? user.email.charAt(0).toUpperCase() : "U";

  return (
    <header className="app-bar">
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button className="menu-btn" onClick={onMenuClick}>
          <IconMenu size={24} color="#ffffff" />
        </button>
        <img
          src="/logo_white.png"
          alt="BeKind Network"
          style={{ height: "32px", objectFit: "contain" }}
        />
      </div>

      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: "#FED639",
          color: colors.primary,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "1rem",
        }}
      >
        {initial}
      </div>
    </header>
  );
};

export default AppBar;
