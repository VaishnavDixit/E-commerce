import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Row, Col, Collapse, Image, Typography, Statistic, Avatar, List, Button, notification } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { HeartTwoTone, ShoppingCartOutlined } from '@ant-design/icons';
import DATA from './productsData.json'
import ProductCard from './ProductCard';
import addBorder from './addBorder';
const HEART_COLOR = '#ed2f96';
const CART_COLOR = 'green';
const INITIAL_COLOR = '#bbbbbb'
const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse

const ProductInfo = ({ cart, liked, setCart, setLiked }) => {
	//Shows page of current page. This component receives id of the current product from the <ProductCard/> Comp. 
	//We navigate from <ProductCard/> to this page using useNavigate() hook, and pass {id} along(line no. 67-ProductCard.js). 
	//We can't pass functions from here. 

	//Problem: Can't access state functions in ProductCard. Therefore I had to initiate the cart and liked array in App.js so that they can be passed as props here. 

	console.log('product info started.')
	const location = useLocation(); // to sccess the state passed through useNavigate() from <ProductCard/>
	let border = '1px solid grey'; border = ''// border for layout debugging. comment this line to see borders around elements.
	const data = DATA;
	//Extract data of current product from the id 
	const { id, image, title, brand, longDescription, description, price, reviews, discount, likes, relatedIds, specifications } = data.filter(({ id: i }) => i == location.state.id)[0];
	const heartClickHandler = (e) => {
		console.log('heart')
		let heartStatus = liked.includes(id);
		if (heartStatus)
			setLiked(liked.filter((i) => i != id));
		else
			setLiked([...liked, id]);
		//notification card on the top-right of the page
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
			setCart(cart.filter((i) => i != id)); // removing id from the cart
		else
			setCart([...cart, id]);// adding id to the cart

		notification.open({
			message: 'Added to the cart.',
			description:
				`${title}' is ${cartStatus ? 'removed from' : 'added to'} the cart.`,
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
				<Col xs={24} xl={7} style={{ border: border, background: '', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Image src={image} style={{ display: 'block', border: border }} />
				</Col>
				<Col xs={24} xl={15} style={{ padding: ' 10px', border: border }}>
					<Title level={2}>{title}</Title>
					<Title level={5}>By <b>{brand}</b></Title>
					<Paragraph><b>Desc:</b> {description}</Paragraph>
					<Title level={4}>About</Title>
					<Paragraph>{longDescription}</Paragraph>
					<Row>
						<Col span={6} style={{ border: '', display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
							<Statistic valueStyle={{ fontSize: '1.5em' }} style={{ border: '', margin: '5px' }} value={likes + Number(liked.includes(id))} prefix={<HeartTwoTone twoToneColor={liked.includes(id) ? HEART_COLOR : INITIAL_COLOR} onClick={heartClickHandler} />} />
						</Col>
						<Col span={18} style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
							<Text style={{ fontSize: '2.2em', margin: '10px' }}><b>₹{price}</b></Text>
							<Text style={{ fontSize: '1em', margin: '0px' }} type='warning' ><strike>₹{Math.floor(price * (100 / (100 - discount)))}</strike></Text>
							<Text style={{ fontSize: '1em', margin: '5px' }} type='success' ><b>({discount}% discount)</b></Text>
						</Col>
					</Row>
				</Col>
			</Row>

			<Row style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Collapse style={{width: '400px'}}>
					<Panel header='Specifications:'>
						{
							specifications.map(({ descType, descValue }) => {
								return <><Text><b>{descType}</b> : {descValue}</Text><br /></>
							})
						}
					</Panel>
				</Collapse>

				<Button.Group style={{ display: 'flex', justifyContent: 'end', marginRight: '10px' }}>
					<Button onClick={cartClickHandler}>Add to Cart<ShoppingCartOutlined style={{ color: cart.includes(id) ? CART_COLOR : INITIAL_COLOR }} /></Button>
					<Button type='primary'>Buy now</Button>
				</Button.Group>
			</Row>
			<Row>
				<Col xs={24} xl={18} style={{}}>
					<Title level={4} style={{ padding: '10px' }}>You might also like</Title>
					<div style={{
						display: 'flex', flexWrap: 'wrap', alignItems: 'center', flexShrink: 0, overflowY: 'auto'
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
										//following attrs are declared in App.js:
										cart={cart}
										liked={liked}
										setCart={setCart}
										setLiked={setLiked}
									/>
							)
						}
					</div>
				</Col>
				{/* Reviews list */}
				<Col xs={24} xl={6}>
					<Title level={4} style={{ padding: '10px' }}>Reviews</Title>
					<List
						itemLayout="horizontal"
						dataSource={reviews}
						pagination={{
							onChange: page => {
								console.log(page);
							},
							pageSize: 3,
						}}
						renderItem={({ reviewName, reviewMessage }) => (
							<List.Item>
								<List.Item.Meta
									avatar={<Avatar src="https://joeschmoe.io/api/v1/17" />}
									title={<a href="https://ant.design">{reviewName}</a>}
									description={reviewMessage}
								/>
							</List.Item>
						)}
						style={{ margin: '10px' }}
					/>
				</Col>
			</Row>
		</>
	)
}

export default addBorder(ProductInfo)
