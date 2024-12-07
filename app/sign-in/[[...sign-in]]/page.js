"use client";
import { SignIn } from "@clerk/clerk-react";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div>
      <div className="relative w-full h-screen">
        <Image 
          src="/split.jpeg" 
          alt="Split Bills" 
          fill 
          className="object-cover" 
        />
        <div className="flex justify-center items-center absolute inset-0">
          <SignIn 
            routing="path" 
            path="/sign-in" 
            afterSignInUrl="/home" 
          />
        </div>
      </div>
    </div>
  );
}
