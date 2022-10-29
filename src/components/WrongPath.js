import React from 'react'
import { Typography, Button } from 'antd'
import { FrownOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { useNavigate } from 'react-router-dom';
import addBorder from './addBorder';
const { Title } = Typography;

const WrongPath = () => {
	const navigate = useNavigate();
	const marginAdd = { margin: '15px' };
	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Title style={marginAdd}><b>Error: Page not found.</b></Title>
			<p style={{ ...marginAdd, fontSize: '1.5em' }}>Kindly re-check the URL and reload the page.</p>
			<FrownOutlined style={{ color: 'darkred', fontSize: '4em', ...marginAdd }} />
			<Button type='dashed' style={{ ...marginAdd, color: 'black' }}
				onClick={() => {
					navigate(-1, { replace: true })
				}}
				size='large'
			><b>Go back</b> <ArrowLeftOutlined /></Button>
		</div>
	)
}

export default addBorder(WrongPath)
