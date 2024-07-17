import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, Outlet, BrowserRouter } from "react-router-dom";

import Home from "./Home";
import Login from "./user/Login";
import SignIn from "./user/SignIn";
import UserProfile from "./user/UserProfile";
import ContentsList from "./contents/ContentsList";
import SearchView from "./contents/SearchView";
import Layout from "./LayOut";
import NG from "./NG";
import './css/index.css'

const PrivateRoute = ({ isSignIned }) => {
    console.log("PrivateRoute----------", isSignIned);

    if (isSignIned) {
        return <Outlet />;

    } else {
        alert("로그인이 필요합니다.");

        return <Navigate to="/login" />;
    }
};

const Wrap = () => {
    const [isSignIned, setIsSignIned] = useState(false);
    
    // 페이지 이동 시 상단 노출
    useEffect(() => {
        window.scrollTo(0, 0);
    })

    return (
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout isSignIned={isSignIned} setIsSignIned={setIsSignIned} />}>
                    <Route index element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/login" element={<Login setIsSignIned={setIsSignIned}/>} />
                    <Route path="/*" element={<NG />} />

                    {/* 보호된 경로 */}
                    <Route element={<PrivateRoute isSignIned={isSignIned}/>}>
                        <Route path="userprofile" element={<UserProfile setIsSignIned={setIsSignIned}/>} />
                        <Route path="contentslist" element={<ContentsList />} />
                        <Route path="searchview" element={<SearchView />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Wrap;