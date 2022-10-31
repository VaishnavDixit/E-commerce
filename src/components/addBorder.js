import React, { Component } from "react";
import { lightTheme } from "./colors";
import { Row, Col, Collapse, Image, Typography, Tag, Statistic, Avatar, List, Button, Divider, notification, InputNumber, BackTop } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const addBorder = (Comp) => {
	const NewComp = (props) => {
		return (
			<div style={{ padding: '20px' }}>
				<Comp {...props} />
				<BackTop>
					<Button type='primary' style={{ width: '120px', height: '40px', textAlign: 'center' }}><b>Back to top</b></Button>
				</BackTop>
			</div>
		)
	}

	return NewComp
}

export default addBorder