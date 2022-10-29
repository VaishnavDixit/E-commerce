import React, { } from 'react'
import { Typography, Menu, Input, BackTop, Button } from 'antd'
import 'antd/dist/antd.css';
import ProductCard from './ProductCard';
import DATA from './productsData.json' //Data from backend, saved locally as Json
import addBorder from './addBorder';
import { lightTheme } from './colors';
// import { Button } from 'antd/lib/radio';
const { Title } = Typography

const MainPage = () => {
	//Main page starts. Shows all the products listed in the website. 
	const data = DATA;
	console.log('main page start')
	return (
		<div >
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
							/>
					)
				}
			</div>
			<BackTop>
				<Button type='primary' style={{ width: '120px', height: '40px', textAlign:'center' }}><b>Back to top</b></Button>
			</BackTop>
		</div>
	)
}

export default addBorder(MainPage)
