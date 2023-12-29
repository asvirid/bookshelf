import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import LogoutButton from "./Logout";
import LoginButton from "./Login";

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/library");
      } else {
        setIsLoading(false);
      }
    });
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1 className="heading">Welcome to Bookshelf</h1>
      <LoginButton />
    </section>
  );
};

export default Home;
