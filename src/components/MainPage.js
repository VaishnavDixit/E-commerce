import React, { } from 'react'
import { Typography, Menu, Input } from 'antd'
import 'antd/dist/antd.css';
import ProductCard from './ProductCard';
import DATA from './productsData.json' //Data from backend, saved locally as Json
import addBorder from './addBorder';
import { Link } from 'react-router-dom'
const { Title } = Typography

const MainPage = ({ cart, liked, setCart, setLiked }) => {
	//Main page starts. Shows all the products listed in the website. 
	const data = DATA;
	console.log('main page start')
	return (
		<>
			<Title level={2} style={{ textAlign: 'left', margin: '20px 20px 20px 10px', border: '' }}>
				Find your products here
			</Title>
			{/* <Search
				placeholder="input search text"
				enterButton="Search"
				size="large"
				// suffix={suffix}
				onSearch={onSearch}
			/> */}

			<div style={{
				display: 'flex',
				flexWrap: 'wrap',
				height: '100px',
				alignItems: 'center',
				justifyContent: 'space-between'
			}}>
				{
					//extracts 
					data.map(
						({ id, image, title, description, price, brand, discount }) =>
							<ProductCard
								id={id}
								type='normal'
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

export default addBorder(MainPage)
