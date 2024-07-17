import React, { useEffect } from "react";
import MainHeader from "./MainHeader";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ isSignIned, setIsSignIned }) => {

    useEffect(() => {
        console.log('useEffect--------------->');
    });

  return (
    <div id={isSignIned ? "main_wrap" : "wrap"}>
        {
            console.log('isSignIned:::::::::: ', isSignIned)
        }
      {isSignIned ? <MainHeader isSignIned={isSignIned} setIsSignIned={setIsSignIned}/> : <Header />}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;