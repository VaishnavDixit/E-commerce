import React, { useState } from 'react'
import { Card, notification, Image, Typography, Spin } from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { ShoppingCartOutlined, HeartTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { HEART_COLOR, CART_COLOR, INITIAL_COLOR } from './constants';
import { connect } from 'react-redux'
import { addToCart, removeFromCart, addToLikes, removeFromLikes } from '../redux';
import { lightTheme } from './colors';
const { Meta } = Card
const { Title, Text } = Typography

const ProductCard = (props) => {
	//Shows information of a product with 'id' id.
	// Imports cart and like arr and methods from App.js as props 
	const { id, type, image, title, description, price, brand, discount } = props; // from MainPage
	const { cart, addToCart, removeFromCart, likes, addToLikes, removeFromLikes } = props; // redux store

	const navigate = useNavigate();
	console.log(`PC, id=${id}`);
	const heartClickHandler = (e) => { // when like button is clicked, add cur. id in the 'liked' list
		console.log('heart...');
		console.log(likes)
		let heartStatus = likes.includes(id); // 
		if (heartStatus)
			removeFromLikes(id); // if heart already liked, remove current id from 'liked'
		else
			addToLikes(id); // if heart not liked, add current id into 'liked'
		notification.open({ // notification box will appear liked button click
			description:
				`'${title}' is ${heartStatus ? 'removed from' : 'added to'} the liked items.`,
			icon: (
				<HeartTwoTone
					twoToneColor={HEART_COLOR}
				/>
			),
		});
		e.stopPropagation();
	}

	const cartClickHandler = (e) => { //same functionality as 'liked'
		console.log('cart')
		let cartStatus = cart.includes(id);
		if (cartStatus)
			removeFromCart(id);
		else
			addToCart(id);
		notification.open({
			description:
				`'${title}' is ${cartStatus ? 'Removed from' : 'added to'} the cart.`,
			icon: (
				<ShoppingCartOutlined
					twoToneColor={CART_COLOR}
				/>
			),
		});
		e.stopPropagation();
	}

	return (
		<>
			<Card
				hoverable
				bordered={true}
				style={{
					width: type == 'normal' ? '380px' : '200px',
					margin: '5px',
					backgroundColor: lightTheme.productCardBackground
				}}
				onClick={(e) => {
					console.log(`${id} card clicked. `)
					navigate(`/products/${title}`, { state: { id: id }, replace: true })
					e.stopPropagation();
				}}
				cover={
					// when the image is not loaded, show this.
					<Image
						alt="Loading..."
						src={image}
						height={'50%'}
						preview={false}
						placeholder={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px' }}><h3>Loading...</h3><Spin /></div>}
					/>
				}
				actions={[
					<HeartTwoTone
						// style={{backgroundColor: lightTheme.productCardBackground}}
						twoToneColor={likes.includes(id) ? HEART_COLOR : INITIAL_COLOR}
						onClick={(e) => {
							console.log(e.target)
							heartClickHandler(e);
						}}
					/>,
					<ShoppingCartOutlined style={{ color: cart.includes(id) ? CART_COLOR : INITIAL_COLOR }}
						onClick={(e) => {
							cartClickHandler(e);
						}}
					/>,
					<Text style={{ color: 'black', fontSize: '1em' }}
						onMouseEnter={(e) => e.target.style.color = CART_COLOR}
						onMouseLeave={(e) => e.target.style.color = 'black'}
					>
						<b>Open</b>
					</Text>
				]}
			>
				<Meta
					title={title || 'xxx'}
					style={{ backgroundColor: '', cursor: 'pointer' }}
					description={description || 'xxx'}
				/>
				<Title level={5} style={{ marginTop: '15px' }}>By {brand || 'xxx'}</Title>
				<Text type='warning' style={{ float: 'left', marginTop: '15px' }}><strike>₹{Math.floor(price * (100 / (100 - discount))).toLocaleString('en-IN') || 'xxx'}</strike></Text>
				<Title level={5} style={{ float: 'right', marginTop: '15px' }}><b>₹{(price).toLocaleString('en-IN') || 'xxx'}</b></Title>
			</Card>
			
		</>
	)
}

const mapStateToProps = state => {
	return {
		cart: state.cart.list,
		likes: state.like.list,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addToCart: (id) => dispatch(addToCart(id)),
		removeFromCart: (id) => dispatch(removeFromCart(id)),
		addToLikes: (id) => dispatch(addToLikes(id)),
		removeFromLikes: (id) => dispatch(removeFromLikes(id)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(React.memo(ProductCard))
