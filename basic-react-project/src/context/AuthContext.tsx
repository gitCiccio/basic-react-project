// context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";

type User = {
    email: string;
    password: string;
};

type SignUpResult = {
    success: boolean;
    error?: string;
};

type AuthContextType = {
    user: User | null;
    signUp: (email: string, password: string) => SignUpResult;
    login: (email: string, password: string) => SignUpResult;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem("currentUser");
        if (!stored) return null;
        try {
            return JSON.parse(stored) as User;
        } catch {
            return null;
        }
    });

    function signUp(email: string, password: string): SignUpResult {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.find((u) => u.email === email)) {
            return { success: false, error: "Email already exists" };
        }

        const newUser: User = { email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        setUser(newUser);
        return { success: true };
    }

    function login(email: string, password: string): SignUpResult  {
        const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return {success: false, error: "Invalid email or password"}
        }

        localStorage.setItem("currentUser", user.email);
        setUser(user);
        return {success: true}
    }

    function logout() {
        localStorage.removeItem("currentUser");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, signUp, logout, login }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return ctx;
}

export default AuthProvider;