"use client";
import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 1.5s or when window is loaded
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-700"}>
        {children}
      </div>
    </>
  );
}