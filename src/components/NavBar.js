import React from 'react'
import { Menu, Affix } from 'antd'
import { Link, Outlet } from 'react-router-dom'
import { lightTheme } from './colors'
const NavBar = () => {
	return (
		<>	<Affix>

			<Menu mode='horizontal' selectable={false}>
				<Menu.Item key="cart">
					<Link to='/cart' replace={true}>View cart</Link>
				</Menu.Item>
				<Menu.Item key="likes">
					<Link to='/likes' replace={true}>View liked items</Link>
				</Menu.Item>
				{/* <Menu.Item key="orders">
					<Link to='/orders' replace={true}>My orders</Link>
				</Menu.Item> */}
				<Menu.Item key="products">
					<Link to='/products' replace={true}>View products</Link>
				</Menu.Item>
			</Menu>
		</Affix>
			<Outlet />
		</>
	)
}

export default NavBar
