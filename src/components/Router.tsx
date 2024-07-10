import { Route, Routes, Navigate } from "react-router-dom";
import Home from "pages/Home";
import List from "pages/Posts";
import Detail from "pages/Posts/Detail";
import New from "pages/Posts/New";
import Edit from "pages/Posts/Edit";
import Profile from "pages/Profile";
import Login from "pages/Login";
import Signup from "pages/Signup";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<List />} />
        <Route path="/posts/:id" element={<Detail />} />
        <Route path="/posts/new" element={<New />} />
        <Route path="/posts/edit/:id" element={<Edit />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
