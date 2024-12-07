"use client"; // Ensure this runs on the client-side
import { SignIn, SignUp } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/clerk-react";
import Image from "next/image";

export default function SignUpPage() {

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
          <SignUp  routing="path" path="/sign-up" />
        </div>
      </div>
    </div>
  );
}