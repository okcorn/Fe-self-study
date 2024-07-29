import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/Home";
import List from "pages/Posts";
import Detail from "pages/Posts/Detail";
import New from "pages/Posts/New";
import Edit from "pages/Posts/Edit";
import Profile from "pages/Profile";
import Login from "pages/Login";
import Signup from "pages/Signup";
import { useState } from "react";
import LoginPage from "pages/Login";
import SignupPage from "pages/Signup";

type RouterProps = {
  isAuthenticated: boolean;
};
export default function Router({ isAuthenticated }: RouterProps) {
  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<List />} />
            <Route path="/posts/:id" element={<Detail />} />
            <Route path="/posts/new" element={<New />} />
            <Route path="/posts/edit/:id" element={<Edit />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<Login />} />
          </>
        )}
      </Routes>
    </>
  );
}
