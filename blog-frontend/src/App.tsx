import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import Auth from "./components/auth/Auth";
import Blogs from "./components/blogs/Blogs";
import Header from "./components/header/Header";
import Footer from "./components/home/Footer";
import HomePage from "./components/home/HomePage";
import {useDispatch} from "react-redux";
import {authActions} from "./store/auth-slice";
import AddBlog from "./components/blogs/AddBlog";
import Profile from "./components/user/Profile";
import ViewBlog from "./components/blogs/ViewBlog";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
            const data = localStorage.getItem("userData");
            if (!!data && JSON.parse(data) != null) {
                dispatch(authActions.login())
            }
        }
        , [dispatch])

    return (
        <div>
            <header><Header/></header>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage/>}></Route>
                    <Route path="/add" element={<AddBlog/>}></Route>
                    <Route path="/auth" element={<Auth/>}></Route>
                    <Route path="/blog/view/:id" element={<ViewBlog/>}></Route>
                    <Route path="/blogs" element={<Blogs/>}></Route>
                    <Route path="/profile" element={<Profile/>}></Route>
                </Routes>
            </main>
            <footer><Footer/></footer>
        </div>
    )
}

export default App
