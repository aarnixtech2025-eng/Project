import React from "react";
import { Link } from "react-router-dom";

export default function CreateAnAccount() {
  return (
    <>
    <Link to="/CreateAccount" aria-label="Create An Account">
    <span>Create an Account</span>
    </Link>
    </>
  );
}