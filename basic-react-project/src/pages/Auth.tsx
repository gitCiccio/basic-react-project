// pages/Auth.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type AuthFormValues = {
    email: string;
    password: string;
};

function Auth() {
    const [mode, setMode] = useState<"signup" | "login">("signup");

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<AuthFormValues>();

    const navigate = useNavigate();

    const { signUp, user, logout } = useAuth();

    function onSubmit(data: AuthFormValues) {
        const result = signUp(data.email, data.password);

        if (!result.success && result.error) {
            setError("email", {
                type: "server",
                message: result.error,
            });
            return;
        }

        alert("User has signed up");
        navigate("/")
    }

    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    <h1 className="page-title">
                        {mode === "signup" ? "Sign Up" : "Login"}
                    </h1>

                    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="form-input"
                                type="email"
                                id="email"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email?.message && (
                                <span className="form-error">{errors.email.message}</span>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="form-input"
                                type="password"
                                id="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 4,
                                        message: "Not less than 4 chars",
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "Not more than 12 chars",
                                    },
                                })}
                            />
                            {errors.password?.message && (
                                <span className="form-error">{errors.password.message}</span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-large"
                        >
                            {mode === "signup" ? "Sign Up" : "Login"}
                        </button>
                    </form>

                    <div className="auth-switch">
                        {mode === "signup" ? (
                            <p>
                                Already have an account?{" "}
                                <span
                                    className="auth-link"
                                    onClick={() => setMode("login")}
                                >
                  Login
                </span>
                            </p>
                        ) : (
                            <p>
                                Don't have an account?{" "}
                                <span
                                    className="auth-link"
                                    onClick={() => setMode("signup")}
                                >
                  Sign Up
                </span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;