"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    
    if (window.location.pathname === "/") {
      router.push("/api/Frontend/User/Userlogin"); 
    }
  }, [router]); 

  return null; 
}
