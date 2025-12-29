import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginUser, clearError } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/ui/Loader";
import Alert from "../components/ui/Alert";
import { colors } from "../utils/colors";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/pages/LoginPage.css";

const IconMail = FiMail as any;
const IconLock = FiLock as any;
const IconEye = FiEye as any;
const IconEyeOff = FiEyeOff as any;

const loginSchema = z.object({
  username: z
    .string()
    .min(1, "El correo/usuario es requerido")
    .email("Debe ser un correo válido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/categories", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearError());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = (data: LoginFormValues) => {
    dispatch(loginUser(data));
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: "url('/background.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-card">
        <div style={{ marginBottom: "1.5rem" }}>
          <img
            src="/logo.png"
            alt="BeKind Network"
            style={{ height: "48px", objectFit: "contain" }}
          />
        </div>

        <div
          className="login-title"
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <h2
            style={{
              color: colors.textLabel,
              fontWeight: "normal",
              fontSize: "1.1rem",
              lineHeight: "1.5",
            }}
          >
            ¡Empieza a conectar tu comunidad ante buenas acciones!
          </h2>
        </div>

        {error && (
          <div style={{ width: "100%", marginBottom: "1rem" }}>
            <Alert message={error} type="error" />
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", display: "grid", gap: "1.25rem" }}
        >
          <div>
            <label
              htmlFor="username"
              style={{
                display: "block",
                textTransform: "uppercase",
                fontSize: "0.7rem",
                fontWeight: "700",
                color: colors.textLabel,
                marginBottom: "0.5rem",
                letterSpacing: "0.5px",
              }}
            >
              Correo Electrónico*
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9CA3AF",
                  display: "flex",
                }}
              >
                <IconMail size={18} />
              </div>
              <input
                id="username"
                type="email"
                placeholder="Ingresar correo"
                {...register("username")}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem 0.75rem 2.5rem",
                  border: errors.username
                    ? `1px solid ${colors.error}`
                    : `1px solid ${colors.border}`,
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#374151",
                }}
              />
            </div>
            {errors.username && (
              <span
                style={{
                  color: colors.error,
                  fontSize: "0.75rem",
                  marginTop: "0.25rem",
                  display: "block",
                }}
              >
                {errors.username.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: "block",
                textTransform: "uppercase",
                fontSize: "0.7rem",
                fontWeight: "700",
                color: colors.textLabel,
                marginBottom: "0.5rem",
                letterSpacing: "0.5px",
              }}
            >
              Contraseña*
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9CA3AF",
                  display: "flex",
                }}
              >
                <IconLock size={18} />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                {...register("password")}
                style={{
                  width: "100%",
                  padding: "0.75rem 2.5rem 0.75rem 2.5rem",
                  border: errors.password
                    ? `1px solid ${colors.error}`
                    : `1px solid ${colors.border}`,
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#374151",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9CA3AF",
                  display: "flex",
                  padding: 0,
                }}
              >
                {showPassword ? (
                  <IconEyeOff size={18} />
                ) : (
                  <IconEye size={18} />
                )}
              </button>
            </div>
            {errors.password && (
              <span
                style={{
                  color: colors.error,
                  fontSize: "0.75rem",
                  marginTop: "0.25rem",
                  display: "block",
                }}
              >
                {errors.password.message}
              </span>
            )}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0",
                fontSize: "0.85rem",
                color: colors.primary,
                textDecoration: "underline",
                fontWeight: "500",
              }}
              onClick={() => {}}
            >
              Recuperar contraseña
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              backgroundColor: isLoading ? "#ccc" : colors.primary,
              color: colors.white,
              padding: "0.85rem",
              borderRadius: "6px",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontWeight: "600",
              fontSize: "1rem",
              transition: "opacity 0.2s",
              marginTop: "1rem",
              height: "48px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLoading ? <Loader size="small" /> : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
