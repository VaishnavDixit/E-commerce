import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Row, Col, Collapse, Image, Typography, Tag, Statistic, Avatar, List, Button, Divider, notification, InputNumber, BackTop } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { HeartTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import DATA from './productsData.json'
import ProductCard from './ProductCard';
import { HEART_COLOR, CART_COLOR, INITIAL_COLOR } from './constants';
import addBorder from './addBorder';

import { connect } from 'react-redux'
import { addToCart, removeFromCart, addToLikes, removeFromLikes } from '../redux';
import ButtonGroup from 'antd/lib/button/button-group';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse

const ProductInfo = (props) => {
	//Shows page of current page. This component receives id of the current product from the <ProductCard/> Comp. 
	//We navigate from <ProductCard/> to this page using useNavigate() hook, and pass {id} along(line no. 67-ProductCard.js). 
	//We can't pass functions from here. 
	//Problem: Can't access state functions in ProductCard. Therefore I had to initiate the cart and liked array in App.js so that they can be passed as props here. 
	console.log('product info started.')
	const location = useLocation(); // to sccess the state passed through useNavigate() from <ProductCard/>
	let border = '1px solid grey';
	border = ''// border for layout debugging. comment this line to see borders around elements.
	const data = DATA;
	const { cart, addToCart, removeFromCart, likes: likeList, addToLikes, removeFromLikes } = props;
	//Extract data of current product from the id 
	const { id, image, title, brand, longDescription, description, features, price, reviews, discount, likes, relatedIds, alsoBought, faq,
		category, specifications, returnable, freeDelivery,
		seller } = data.filter(({ id: i }) => i == location.state.id)[0];
	const heartClickHandler = (e) => {
		console.log('heart')
		let heartStatus = likeList.includes(id);
		if (heartStatus)
			removeFromLikes(id)
		else
			addToLikes(id)		//notification card on the top-right of the page
		notification.open({
			description:
				`'${title}' is ${heartStatus ? 'removed from' : 'added to'} the liked items.`,
			icon: (
				<HeartTwoTone
					twoToneColor={HEART_COLOR}
				/>
			),
		});
		e.stopPropagation();
		console.log('end')
	}

	const cartClickHandler = (e) => {
		console.log('cart')
		let cartStatus = cart.includes(id);
		if (cartStatus)
			removeFromCart(id);
		else
			addToCart(id);
		notification.open({
			description:
				`'${title}' is ${cartStatus ? 'removed from' : 'added to'} the cart.`,
			icon: (
				<ShoppingCartOutlined
					twoToneColor={CART_COLOR}
				/>
			),
		});
		e.stopPropagation();
		console.log('end')
	}

	return (
		<>
			<Row >
				<Col xs={24} xl={8} style={{ border: border, background: '', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Image src={image} style={{ top: 0, justifyContent: 'center', alignItems: 'center', border: border }} />
				</Col>
				<Col xs={24} xl={16} style={{ padding: '10px', border: border }}>
					<Title level={2}>{title}</Title>
					<Title level={5}>By <b>{brand}</b></Title>
					<Paragraph><b>Description:</b> {description}</Paragraph>
					<Title level={4}>About</Title>
					<Paragraph>{longDescription}</Paragraph>
					<Title level={4}>Features</Title>
					<List
						size="medium"
						style={{ marginBottom: '10px' }}
						dataSource={features}
						renderItem={
							(feature) => {
								return <li>- {feature}</li>
							}
						}
						// bordered
						pagination={{
							pageSize: 4,
						}}
					/>
					<Tag color="geekblue">{category}</Tag>
					{
						freeDelivery ? <Tag color="green">Free Delivery</Tag> : ''
					}
					{
						(!returnable) || (category === 'Beauty') || (category === 'Pet care') || (category === 'Health and Hygiene') || (category === 'Plants') ? <Tag color="warning">Non-returnable</Tag> : ''
					}
					<Row>
						<Col span={6} style={{ border: '', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
							<Statistic valueStyle={{ fontSize: '1.5em' }} style={{ border: '', margin: '5px' }} value={likes + Number(likeList.includes(id))} prefix={<HeartTwoTone twoToneColor={likeList.includes(id) ? HEART_COLOR : INITIAL_COLOR} onClick={heartClickHandler} />} />
						</Col>
						<Col span={18} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
							<Text style={{ fontSize: '2.2em', margin: '10px' }}><b>₹{(price).toLocaleString('en-IN')}</b></Text>
							<Text style={{ fontSize: '1em', margin: '0px' }} type='warning' ><strike>₹{Math.floor(price * (100 / (100 - discount))).toLocaleString('en-IN')}</strike></Text>
							<Text style={{ fontSize: '1em', margin: '5px' }} type='success' ><b>({discount}% discount)</b></Text>
						</Col>
					</Row>
				</Col>
			</Row>

			<Row style={{ margin: '10px', display: 'flex', justifyContent: 'space-between', WebkitAlignItems: 'top' }}>
				<Collapse style={{ width: '300px' }}>
					<Panel header='Specifications:'>
						{
							<List
								size="small"
								dataSource={specifications}
								renderItem={({ descType, descValue }) =>
									<List.Item><Text><b>{descType}</b> : {descValue}</Text></List.Item>
								}
							/>
						}
					</Panel>
				</Collapse>
				<Button.Group style={{ display: 'flex', justifyContent: 'end', marginRight: '10px' }}>
					<InputNumber
						style={{ width: '130px', marginRight: '10px', marginTop: '10px' }}
						addonBefore={<Text>Quantity:</Text>}
						defaultValue={1}
						max={10}
						min={1}
					/>
					<Button onClick={cartClickHandler} style={{ marginRight: '10px', marginTop: '10px' }}>{cart.includes(id) ? 'Remove from ' : 'Add to '}Cart<ShoppingCartOutlined style={{ color: cart.includes(id) ? CART_COLOR : INITIAL_COLOR }} /></Button>
					<Button type='primary' style={{ marginTop: '10px' }}>Buy now</Button>
				</Button.Group>
			</Row>

			<Row>
				<Col xs={24} xl={17} style={{ paddingRight: '10px' }}>
					<Title level={3} style={{ marginLeft: '10px', marginTop: '30px' }}>You might also like</Title>
					<div style={{
						display: 'grid', gridAutoFlow: 'column', alignItems: 'center', overflow: 'auto', scrollbarWidth: '5px', justifyContent: 'start'
					}}>
						{
							//list of recommended items, displayed using the list of IDS saved in 'relatedIds' and showing Cards corresponding to these ids.
							data.filter((prod) => relatedIds.includes(prod.id) && id !== prod.id).map(
								({ id, image, title, description, price, brand, discount }) =>
									<ProductCard
										id={id}
										type='small'
										image={image}
										title={title}
										description={description}
										price={price}
										brand={brand}
										discount={discount}
									/>
							)
						}
					</div>
					<Title level={3} style={{ marginLeft: '10px', marginTop: '30px' }}>People who bought this also bought</Title>
					<div style={{
						display: 'grid', gridAutoFlow: 'column', alignItems: 'center', overflow: 'auto', justifyContent: 'start'
					}}>
						{
							//list of recommended items, displayed using the list of IDS saved in 'relatedIds' and showing Cards corresponding to these ids.
							data.filter((prod) => alsoBought.includes(prod.id) && id !== prod.id).map(
								({ id, image, title, description, price, brand, discount }) =>
									<ProductCard
										id={id}
										type='small'
										image={image}
										title={title}
										description={description}
										price={price}
										brand={brand}
										discount={discount}
									/>
							)

						}
					</div>
					<Title level={3} style={{ marginLeft: '10px', marginTop: '30px' }}>Related products in this category</Title>
					<div style={{
						display: 'grid', gridAutoFlow: 'column', alignItems: 'center', overflow: 'auto', justifyContent: 'start'
					}}>
						{
							//list of recommended items, displayed using the list of IDS saved in 'relatedIds' and showing Cards corresponding to these ids.
							data.filter(({ category: c }) => c === category).map(
								({ id, image, title, description, price, brand, discount }) =>
									<ProductCard
										id={id}
										type='small'
										image={image}
										title={title}
										description={description}
										price={price}
										brand={brand}
										discount={discount}
									/>
							)

						}
					</div>
				</Col>
				<Col xs={24} xl={6}>
					<Divider />
					{
						(reviews.length) ?
							<>
								<Title level={4} style={{ padding: '10px' }}>{reviews.length} Review{reviews.length !== 1 ? 's' : ''}</Title>
								<List
									dataSource={reviews}
									pagination={{
										onChange: page => {
											console.log(page);
										},
										pageSize: 4,
									}}
									renderItem={({ reviewName, reviewMessage }) => (
										<List.Item>
											<List.Item.Meta
												avatar={<Avatar src="https://joeschmoe.io/api/v1/10" />}
												title={<b>{reviewName}</b>}
												description={reviewMessage}
											/>
										</List.Item>
									)}
									style={{ margin: '10px' }}
								/>
								<Divider />
							</> : ''
					}
					{
						(faq.length) ?
							<>
								<Title level={4} style={{ padding: '10px' }}>{faq.length} FAQ{faq.length != 1 ? 's' : ''}</Title>
								<List
									dataSource={faq}
									pagination={{
										onChange: page => {
											console.log(page);
										},
										pageSize: 4,
									}}
									renderItem={({ question, answer }) => (
										<List.Item>
											<List.Item.Meta
												// avatar={<Avatar src="https://joeschmoe.io/api/v1/10" />}
												title={<><b>Ques.</b> {question}?</>}
												description={<><b>Ans.</b> {answer}</>}
											/>
										</List.Item>
									)}
									style={{ margin: '10px' }}
								/>
								<Divider />
							</> : ''
					}
					<Collapse style={{ width: '300px', marginLeft: '10px' }}>
						<Panel header='Contact seller'>
							<Title level={5}>{seller.name}</Title>
							<Paragraph>{seller.email}</Paragraph>
						</Panel>
					</Collapse>
				</Col>
			</Row>
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
)(addBorder(ProductInfo))
