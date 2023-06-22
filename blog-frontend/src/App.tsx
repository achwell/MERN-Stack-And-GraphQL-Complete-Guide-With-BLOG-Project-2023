import React from 'react';
import {Route, Routes} from "react-router-dom";
import Auth from "./components/auth/Auth";
import Blogs from "./components/blogs/Blogs";
import Header from "./components/header/Header";
import Footer from "./components/home/Footer";
import HomePage from "./components/home/HomePage";

function App() {

    return (<div>
        <header><Header/></header>
        <main>
            <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/blogs" element={<Blogs/>}></Route>
                <Route path="/auth" element={<Auth/>}></Route>
            </Routes>
        </main>
        <footer><Footer/></footer>
    </div>)
}
export default App
