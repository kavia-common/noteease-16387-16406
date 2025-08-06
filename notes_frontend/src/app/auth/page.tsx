"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Loader } from "../../components/ui/Loader";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      router.push("/");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Authentication error";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full flex flex-col gap-5">
        <div className="flex justify-center mb-2">
          <span className="text-3xl font-extrabold text-primary">
            Note
            <span className="text-accent">Ease</span>
          </span>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            autoComplete="username"
            required
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="primary" type="submit" fullWidth disabled={loading}>
            {loading ? <Loader /> : isLogin ? "Login" : "Register"}
          </Button>
        </form>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="text-center mt-2">
          {isLogin ? (
            <>
              New user?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-accent font-semibold underline"
                disabled={loading}
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-accent font-semibold underline"
                disabled={loading}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
