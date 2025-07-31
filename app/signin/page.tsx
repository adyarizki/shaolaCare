"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoaderSpinner from "@/components/loader-spinner";
import BaseAlert from "@/components/base-alert";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setAlert({
        type: "error",
        message: res.error,
        isShow: true,
      });
      setIsLoading(false);
    } else {
      router.push("/dashboard");
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg border">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign in to your account
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {alert.isShow && <BaseAlert alert={alert} />}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full bg-green-600 hover:bg-green-500 hover:text-white"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoaderSpinner />
                Loading...
              </div>
            ) : (
              "Sigin in"
            )}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Not registered?{" "}
            <br />
            
            <Link
              href="/signup"
              className="text-blue-600 hover:underline"
            >
             <Button className="w-100 bg-blue-600 mt-4 hover:bg-blue-500 hover:text-white"> Create account</Button>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
