"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const HOST_USER = process.env.NEXT_PUBLIC_HOST_USER;
        const HOST_PASSWORD = process.env.NEXT_PUBLIC_HOST_PASSWORD;

        if (form.username !== HOST_USER || form.password !== HOST_PASSWORD) {
            alert("Invalid credentials");
            return;
        }

        router.replace('/home')
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#18181b"
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#23232b",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
                    minWidth: "320px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem"
                }}
            >
                <h2 style={{ margin: 0, fontWeight: 600, fontSize: "1.5rem", color: "#fafafa" }}>Host Login</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    style={{
                        padding: "0.7rem",
                        border: "1px solid #333",
                        borderRadius: "4px",
                        fontSize: "1rem",
                        background: "#18181b",
                        color: "#fafafa"
                    }}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    style={{
                        padding: "0.7rem",
                        border: "1px solid #333",
                        borderRadius: "4px",
                        fontSize: "1rem",
                        background: "#18181b",
                        color: "#fafafa"
                    }}
                />
                <button
                    type="submit"
                    style={{
                        background: "#6366f1",
                        color: "#fff",
                        padding: "0.8rem",
                        border: "none",
                        borderRadius: "4px",
                        fontWeight: 600,
                        fontSize: "1rem",
                        cursor: "pointer",
                        transition: "background 0.2s",
                    }}
                >
                    Sign In
                </button>
            </form>
        </div>
    );
}
