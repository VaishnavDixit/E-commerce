import React from 'react'
import ProductCard from './ProductCard'
import { Button, Typography } from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import DATA from './productsData.json'
import addPadding from './addBorder'
const { Title } = Typography
const CardsDisplayer = ({ listOf, cart, liked, setCart, setLiked }) => {
	let sum = 0;
	const data = DATA
	return (
		<>
			<Title>{listOf == 'likes' ? 'Your liked items' : 'Your cart'}</Title>
			<div style={{
				display: 'flex',
				flexWrap: 'wrap',
				alignItems: 'center',
				justifyContent: 'space-around'
			}}>
				{
					data.filter((prod) => ((listOf == 'likes') ? liked : cart).includes(prod.id)).map(
						({ id, image, title, description, price, brand, discount }) => {
							sum += Number(price);
							return <ProductCard
								source={'main'}
								id={id}
								image={image}
								title={title}
								description={description}
								price={price}
								brand={brand}
								discount={discount}
								cart={cart}
								liked={liked}
								setCart={setCart}
								setLiked={setLiked}
							/>
						}
					)
				}
			</div>
			{
				listOf == 'likes' ?
					'' :
					<div style={{ border: '', display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
						<Title level={4} style={{ marginRight: '20px', border: '' }}>Total cost: <b>₹{sum.toLocaleString('en-IN')}</b></Title>
						<Button type='primary'>Checkout</Button>
					</div>
			}
		</>
	)
}

export default addPadding(CardsDisplayer)
