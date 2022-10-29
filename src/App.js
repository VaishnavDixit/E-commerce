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

import { Provider } from 'react-redux'
import store from './redux/store';

function App() {
	console.log(`app.js started.`)
	const navigate = useNavigate();
	return (
		<Provider store={store}>
			<Routes>
				<Route path='/' element={<LoginPage />} />
				<Route element={<NavBar />}>
					<Route path='/products'>
						<Route index element={<MainPage />} />
						<Route path=':title' element={<ProductInfo />} />
					</Route>
					<Route path='cart' element={<CardsDisplayer listOf={'cart'} />} />
					<Route path='likes' element={<CardsDisplayer listOf={'likes'} />} />
					<Route path='orders' element={<b>Your orders Will appear here.</b>} />
				</Route>
				<Route path='*' element={
					<WrongPath />
				} />
			</Routes>
		</Provider>
	);
}

export default App;
