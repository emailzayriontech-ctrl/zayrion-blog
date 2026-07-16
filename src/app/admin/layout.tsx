"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("zayrion_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "zayrionadmin") {
      localStorage.setItem("zayrion_admin_auth", "true");
      setIsAuthenticated(true);
      toast.success("Berhasil masuk!");
    } else {
      toast.error("Password salah!");
    }
  };

  if (isChecking) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <title>Login | Admin Dashboard</title>
        <div className="w-full max-w-md p-8 rounded-2xl bg-card border shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold font-display">Zayrion Admin</h1>
            <p className="text-sm text-muted-foreground mt-2">Masukkan password untuk masuk ke Private Dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              type="password" 
              placeholder="Password..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button type="submit" className="w-full">Login</Button>
            <div className="text-center pt-4">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
