"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoaderSpinner from "@/components/loader-spinner";
import BaseAlert from "@/components/base-alert";

export default function Page() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "",
    message: "",
    isShow: false,
  });
  const router = useRouter();

  const verifyOtp = async () => {
    setIsLoading(true);
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (res.ok) {
      setAlert({
        type: "success",
        message: "Verification successful, you can now login",
        isShow: true,
      });
      setIsLoading(false);
      localStorage.removeItem("pendingVerifyEmail");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      setAlert({
        type: "error",
        message: data.message || "Verification failed",
        isShow: true,
      });
      setIsLoading(false);
    }
  };

  const sendOtp = async () => {
    await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  };

  useEffect(() => {
    const pendingVerifyEmail = localStorage.getItem("pendingVerifyEmail");
    setEmail(pendingVerifyEmail || "");
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-5">
      <div className="container mx-auto px-4">
      <Card className="w-full max-w-md flex justify-center mx-auto mt-20">
        <CardHeader className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold">Enter Verification OTP</h2>
          <p className="text-muted-foreground text-sm">
            We have sent the code to your Email :<span className="font-medium text-primary">{email}</span>
          </p>
          {alert.isShow && <BaseAlert alert={alert} />}
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <label htmlFor="otp" className="text-sm  text-gray-700 block mb-1 font-bold text-center">
              Your OTP
            </label>
            <Input
              id="otp"
              className="text-center font-bold "
              placeholder="986789"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <Button
            className="w-full bg-green-600 hover:bg-green-400 hover:text-white"
            onClick={verifyOtp}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoaderSpinner /> Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </CardContent>

        <CardFooter className="flex justify-center text-sm text-muted-foreground ">
          Haven't received the code yet?{" "}
          <Button
            variant="link"
            onClick={sendOtp}
            className="px-1 text-blue-600 hover:underline"
          >
            Resend OTP
          </Button>
        </CardFooter>
      </Card>
    </div>
    </div>
  );
}
