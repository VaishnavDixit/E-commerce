import React, {  } from 'react'
import { Typography, Menu } from 'antd'
import 'antd/dist/antd.css';
import ProductCard from './ProductCard';
import DATA from './productsData.json' //Data from backend, saved locally as Json
import { Link } from 'react-router-dom'
const { Title } = Typography

const MainPage = ({ cart, liked, setCart, setLiked }) => {
	//Main page starts. Shows all the products listed in the website. 
	const data = DATA;
	console.log('main page start')

	return (
		<>
			<Menu mode="horizontal">
				<Menu.Item key="mail">
					<Link to='/cart'>View cart</Link>
				</Menu.Item>
				<Menu.Item key="app">
					<Link to='/likes'>View likes</Link>
				</Menu.Item>
			</Menu>
			<Title level={2} style={{ textAlign: 'left', margin: '20px 20px 20px 10px', border: '' }}>
				Find your products here
			</Title>
			<div style={{
				display: 'flex',
				flexWrap: 'wrap',
				height: '100px',
				alignItems: 'center',
				justifyContent: 'space-around'
			}}>
				{
					//extracts 
					data.map(
						({ id, image, title, description, price, brand, discount }) =>
							<ProductCard
								id={id}
								image={image}
								title={title}
								description={description}
								price={price}
								brand={brand}
								discount={discount}
								//following attrs are declared in App.js:
								cart={cart}
								liked={liked}
								setCart={setCart}
								setLiked={setLiked}
							/>
					)
				}
			</div>
		</>
	)
}

export default MainPage
