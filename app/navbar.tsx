"use client";

import { SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";

const Navbar = () => {
  
    const { user } = useUser();

    return (
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl">Nusantara Infrastructure</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <SignedIn>
              <li><a href="/">Home</a></li>
              <li><a href="/books">Books</a></li>
              <li>
                <details>
                  <summary>
                  {user ? (
                    <>
                      <p>
                        {user.firstName && user.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : "Profile"}{" "}
                      </p>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                  </summary>
                  <ul className="p-2 bg-base-100 rounded-t-none">
                    <li><a href="/profile">Profile</a></li>
                    <SignOutButton>
                      <li><a href="login">Sign out</a></li>
                    </SignOutButton>
                  </ul>
                </details>
              </li>
            </SignedIn>
            <SignedOut>
              <li><a href="/">Home</a></li>
              <li><a href="login">Sign In</a></li>
            </SignedOut>
          </ul>
        </div>
      </div>
    );
  };
  
  export default Navbar;