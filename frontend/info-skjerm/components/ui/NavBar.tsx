"use client";
import { auth } from "@/auth";
import Link from "next/link";
import { useState, useEffect } from "react";

export function NavBar({ session }: { session: any }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar when cursor is within 50px of the top
      if (e.clientY <= 50) {
        setIsVisible(true);
      } else if (e.clientY > 100) {
        // Hide navbar when cursor moves away from top area
        setIsVisible(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gray-800 text-white transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <Link href="/infoskjerm">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Infoskjerm</h1>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <a href="/" className="hover:underline">
            Hjem
          </a>
          <a href="/admin" className="hover:underline">
            Admin
          </a>
          {session && (
            <a href="/auth/signout" className="hover:underline">
              Logg ut
            </a>
          )}
        </div>
      </nav>
    </main>
  );
}
