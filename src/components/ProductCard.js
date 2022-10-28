import React, { useState } from 'react'
import { Card, notification, Image, Typography, Spin } from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { ShoppingCartOutlined, HeartTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const { Meta } = Card
const { Title, Text } = Typography
const HEART_COLOR = '#ed2f96';
const CART_COLOR = 'green';
const INITIAL_COLOR = '#bbbbbb'

const ProductCard = (props) => {
	//Shows information of a product with 'id' id.
	// Imports cart and like arr and methods from App.js as props 
	const { id, type, image, title, description, price, brand, discount, cart, setCart, liked, setLiked } = props;
	const navigate = useNavigate();
	console.log(`PC, id=${id}`);

	const heartClickHandler = (e) => { // when like button is clicked, add cur. id in the 'liked' list
		console.log('heart')
		let heartStatus = liked.includes(id); // 
		if (heartStatus)
			setLiked(liked.filter((i) => i != id)); // if heart already liked, remove current id from 'liked'
		else
			setLiked([...liked, id]); // if heart not liked, add current id into 'liked'
		notification.open({ // notification box will appear liked button click
			description:
				`id: ${id},'${title}' is ${heartStatus ? 'removed from' : 'added to'} the liked items.`,
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
			setCart(cart.filter((i) => i != id));
		else
			setCart([...cart, id]);
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
		<div>
			<Card
				hoverable
				bordered={true}
				style={{
					width: type == 'normal' ? '350px' : '200px',
					margin: '5px',
				}}
				onClick={(e) => {
					console.log(`${id} card clicked. `)
					navigate(`/products/${title}`, { state: { id: id } })
					e.stopPropagation();
				}}
				cover={
					// when not loaded, show this.
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
						twoToneColor={liked.includes(id) ? HEART_COLOR : INITIAL_COLOR}
						onClick={(e) => {
							console.log(e.target)
							// e.target.attributes.getNamedItem('twoToneColor') = e.target.attributes.getNamedItem('twoToneColor') == INITIAL_COLOR ? 'yellow' : INITIAL_COLOR;
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
					style={{ cursor: 'pointer' }}
					description={description || 'xxx'}
				/>
				<Title level={5} style={{ marginTop: '15px' }}>By {brand || 'xxx'}</Title>
				<Text type='warning' style={{ float: 'left', marginTop: '15px' }}><strike>₹{Math.floor(price * (100 / (100 - discount))) || 'xxx'}</strike></Text>
				<Title level={5} style={{ float: 'right', marginTop: '15px' }}><b>₹{price || 'xxx'}</b></Title>
			</Card>
		</div>
	)
}

export default ProductCard
