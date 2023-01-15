import React from "react";
import Link from "next/link";

const Navbar = () => {
  
  return (
    <div className="navbar-comp">
      <Link href="/">
        <h1 className="navbar-comp-title">Movie SPOT!</h1>
      </Link>
      <div className="navbar-comp-routing">
        <Link href="/">
          <div className="navbar-comp-routing-button">
            <p
              
            >Home</p>
          </div>
        </Link>
        <Link href="/about">
          <div className="navbar-comp-routing-button">
            <p
              
            >About</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
