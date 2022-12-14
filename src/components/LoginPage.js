import React from 'react'
import { Form, Input,  Typography, Button } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { useNavigate } from 'react-router-dom'
const { Title } = Typography
const LoginPage = () => {
	console.log(`login page started.`)
	const navigate = useNavigate();
	const onFinish = (values) => {
		console.log('Success:', values);
		navigate('products', { state: { val: 3 } });
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	}
	return (
		<div style={{ height: '600px', display: 'flex', flexDirection: 'column', border: '', alignContent: 'center', justifyContent: 'center' }}>
			<Title level={1} style={{ textAlign: 'center', margin: '20px 20px 20px 20px' }}>React e-commerce site</Title>
			<Form
				style={{ display: 'block', margin: '20px' }}
				name="basic"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default LoginPage
