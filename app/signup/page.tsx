"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoaderSpinner from "@/components/loader-spinner";
import BaseAlert from "@/components/base-alert";

export default function Page() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    setIsLoading(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
        name: registerName,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      setAlert({
        type: "success",
        message: "Register success, please check your email to verify your account",
        isShow: true,
      });
      setIsLoading(false);
      localStorage.setItem("pendingVerifyEmail", registerEmail);

      await fetch("/api/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ email: registerEmail }),
        headers: { "Content-Type": "application/json" },
      });

      setTimeout(() => {
        router.push("/verify");
      }, 1000);
    } else {
      setAlert({
        type: "error",
        message: data.error || "Register failed",
        isShow: true,
      });
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {alert.isShow && (
            <BaseAlert alert={{ type: alert.type, message: alert.message }} />
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <Button
            onClick={handleRegister}
            disabled={isLoading}
            className="w-full flex gap-2 justify-center bg-green-600 hover:bg-green-400 hover:text-white"
          >
            {isLoading ? (
              <>
                Registering...
                <LoaderSpinner />
              </>
            ) : (
              "Sign Up now"
            )}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Do you have account?{" "}
            <Link href="/signin" className="text-blue-600 hover:underline">
            <br />
              <Button className="w-100 max-w-sm bg-blue-600 mt-4 hover:bg-blue-500 hover:text-white">Sign in here </Button>
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
