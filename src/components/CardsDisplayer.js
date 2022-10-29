import React from 'react'
import ProductCard from './ProductCard'
import { Button, Card, Typography } from 'antd'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import DATA from './productsData.json'
import addPadding from './addBorder'

import { connect } from 'react-redux'
import { addToCart, removeFromCart, addToLikes, removeFromLikes } from '../redux';

const { Title } = Typography
const CardsDisplayer = (props) => {
	let sum = 0;
	const data = DATA
	const { listOf, cart, addToCart, removeFromCart, likes: likeList, addToLikes, removeFromLikes } = props;

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
					data.filter((prod) => ((listOf == 'likes') ? likeList : cart).includes(prod.id)).map(
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
)(addPadding(CardsDisplayer))

// export default addPadding(CardsDisplayer)
