import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiActivity,
  FiUsers,
  FiDollarSign,
  FiShoppingBag,
  FiAward,
  FiFileText,
  FiLogOut,
} from "react-icons/fi";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { colors } from "../../utils/colors";
import "../../styles/components/Sidebar.css";

const IconHome = FiHome as any;
const IconActivity = FiActivity as any;
const IconUsers = FiUsers as any;
const IconDollarSign = FiDollarSign as any;
const IconShoppingBag = FiShoppingBag as any;
const IconAward = FiAward as any;
const IconFileText = FiFileText as any;
const IconLogOut = FiLogOut as any;

const navItems = [
  { label: "Home", path: "/home", icon: IconHome },
  { label: "Impacto Social", path: "/impact", icon: IconActivity },
  { label: "Comunidad", path: "/community", icon: IconUsers },
  { label: "Sponsors", path: "/sponsors", icon: IconDollarSign },
  { label: "Marketplace", path: "/marketplace", icon: IconShoppingBag },
  { label: "Bakanes", path: "/categories", icon: IconAward },
  { label: "Contenidos", path: "/content", icon: IconFileText },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <img
            src="/logo_drawer.png"
            alt="BeKind Network"
            className="sidebar-logo"
          />
        </div>

        <nav className="sidebar-nav">
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0.75rem 1.5rem",
                      textDecoration: "none",
                      color: isActive ? "#000" : "#4B5563",
                      backgroundColor: isActive ? "#EAFFFF" : "transparent",
                      borderLeft: isActive
                        ? "4px solid #01BABB"
                        : "4px solid transparent",
                      fontWeight: isActive ? "600" : "500",
                      fontSize: "0.9rem",
                      transition: "all 0.2s",
                    }}
                  >
                    <item.icon
                      size={20}
                      style={{
                        marginRight: "0.75rem",
                        color: isActive ? "#000" : "inherit",
                      }}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-logout">
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: colors.primary,
              fontWeight: "600",
              fontSize: "0.95rem",
              padding: "0.5rem 0",
            }}
          >
            <IconLogOut size={20} style={{ marginRight: "0.75rem" }} />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
