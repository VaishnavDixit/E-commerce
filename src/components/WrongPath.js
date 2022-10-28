import React from 'react'
import { Card, notification, Image, Typography, Spin, Button } from 'antd'
import { FrownOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

// import Title from 'antd/lib/skeleton/Title';
const WrongPath = () => {
	const navigate = useNavigate();
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Title>Wrong Path: Page not found</Title>
				<FrownOutlined style={{ color: 'darkred', fontSize: '4em' }} />
				<Button type='dashed' style={{ margin: '30px', color: 'black' }}
					onClick={() => {
						navigate(-1, { replace: true })
					}}
					size='large'
				><b>Go back</b> <ArrowLeftOutlined /></Button>
			</div>
		</>
	)
}

export default WrongPath
