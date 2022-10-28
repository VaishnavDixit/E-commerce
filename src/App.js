import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import Book from './components/MainPage';
import ProductCard from './components/ProductCard';
import ProductInfo from './components/ProductInfo';
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import CardsDisplayer from './components/CardsDisplayer';
import NavBar from './components/NavBar';
import WrongPath from './components/WrongPath';
function App() {
	console.log(`app.js started.`)
	let [cart, setCart] = useState([]); // list of ids of all the items in the cart 
	let [liked, setLiked] = useState([]); // list of ids of all the items liked
	const navigate=useNavigate();
	return (
		<Routes>
			<Route path='/' element={<LoginPage />} />
			<Route element={<NavBar />}>
				<Route path='/products'>
					<Route index element={<MainPage cart={cart} liked={liked} setCart={setCart} setLiked={setLiked} />} />
					<Route path=':title' element={<ProductInfo cart={cart} liked={liked} setCart={setCart} setLiked={setLiked} />} />
				</Route>
				<Route path='cart' element={<CardsDisplayer listOf={'cart'} cart={cart} liked={liked} setCart={setCart} setLiked={setLiked} />} />
				<Route path='likes' element={<CardsDisplayer listOf={'likes'} cart={cart} liked={liked} setCart={setCart} setLiked={setLiked} />} />
				<Route path='orders' element={<b>Your orders Will appear here.</b>} />
			</Route>
			<Route path='*' element={
				<WrongPath/>
			} />
		</Routes>
	);
}

export default App;
