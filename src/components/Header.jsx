import React, { useEffect, useState, useRef } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import "../assets/css/Header.css";
import Brand from "../pages/Brand";
import '../assets/css/Header.css'
import Home from '../pages/Home';
import Balo from '../pages/Balo';
import Vali from '../pages/Vali';
import Bag from "../pages/Bag";
import Product from "./Product";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Cart from "../components/Cart";
import About from '../pages/About';
import Contact from '../pages/Contact';
import Search from './Search';

function Header() {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [cartCount, setCartCount] = useState(0);
    const menuRef = useRef(null);
    let isNavbarFixed = false;
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".nav");
        const currentScrollY = window.scrollY;
        if (currentScrollY > 400) {
            if (!isNavbarFixed) {
                navbar.classList.add("fixed");
                setTimeout(() => navbar.classList.add("visible"), 100);
                isNavbarFixed = true;
            }
        } else {
            if (isNavbarFixed) {
                navbar.classList.remove("visible");
                setTimeout(() => navbar.classList.remove("fixed"), 300);
                isNavbarFixed = false;
            }
        }
    });
    const [menuOpen, setMenuOpen] = useState(false); 

    const toggleMenu = (e) => {
        e.stopPropagation(); 
        setMenuOpen(!menuOpen);
      };
    const closeMenuOnOutsideClick = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
          setMenuOpen(false);
        }
      };
    
      useEffect(() => {
        if (menuOpen) {
          document.addEventListener("click", closeMenuOnOutsideClick);
        } else {
          document.removeEventListener("click", closeMenuOnOutsideClick);
        }
    
        return () => {
          document.removeEventListener("click", closeMenuOnOutsideClick);
        };
      }, [menuOpen]);
   
    useEffect(() => {
        setCartCount(cart.length);
    }, [cart]);

    return (
        <div>
            <div className="line">MIỄN PHÍ VẬN CHUYỂN CHO ĐƠN HÀNG TỪ 1.500.000Đ</div>
           
            <nav className="nav">
                <div className="nav__logo">
                    <Link to="/">
                        <img src="/icon/logo.png" alt="" />
                    </Link>
                </div>
                <div className={`nav-menu ${menuOpen ? "active" : ""}`} ref={menuRef}>
                <ul className="nav__Product">
                    <li>
                        <Link to="/Brand">BRAND</Link>
                    </li>
                    <li>
                        <Link to="/Vali">VALI</Link>
                    </li>
                    <li>
                        <Link to="/Balo">BALO</Link>
                    </li>
                    <li>
                        <Link to="/Handbag">HANDBAG</Link>
                    </li>
                </ul>
                <ul className="nav__Link">
                    <li>
                        <Link to="/Contact">CONTACT</Link>
                    </li>
                    <li>
                        <Link to="/About">ABOUT US</Link>
                    </li>
                    <li>
                        <Link to="/Login">LOGIN</Link>
                    </li>
                    <li>
                        <Link to="/SignUp">SIGN UP</Link>
                    </li>
                </ul>
                </div>
                <ul className='nav-icon'>
                    <li>
                        <Link to="/Search" className='header-search'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="/Cart" className='header-cart'>
                            <i className="fa-solid fa-cart-shopping"></i>
                            {cartCount > 0 && <span className='cart-count'>{cartCount}</span>}
                        </Link>
                    </li>
                    <li><button className="nav-toggle" onClick={toggleMenu}>
                    ☰
                </button></li>
                </ul>
            </nav>

            <div className="discount">
                Nhập mã <span className="discount-code">HOL10</span> giảm 10% tất cả sản
                phẩm
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Brand" element={<Brand></Brand>} />
                <Route path='/Balo' element={<Balo />} />
                <Route path='/Vali' element={<Vali />} />
                <Route path='/Handbag' element={<Bag />} />
                <Route path='/Contact' element={<Contact/>}/>
                <Route path='/About' element={<About/>}/>
                <Route path="/Product/:id" element={<Product cart={cart} setCart={setCart}/>} />
                <Route path="/Login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path='/Search' element={<Search />} />
                <Route path='/Cart' element={<Cart cart={cart} setCart={setCart} />} />
            </Routes>
        </div>
    );

}

export default Header;
