"use client";

import { useUser } from "@clerk/nextjs";
import Navbar from "./navbar";

export default function Home() {
  const { user } = useUser();

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        {user ? (
          <>
            <p>
              Welcome {user.firstName && user.lastName
                ? `${user.firstName} ${user.lastName}`
                : ""}{" "}
              to Nusantara Infrastructure Website!!
            </p>
          </>
        ) : (
          <p>Welcome to Nusantara Infrastructure Website</p>
        )}
      </div>
    </div>
  );
}
