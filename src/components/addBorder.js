import React, { Component } from "react";

const addBorder = (Comp) => {
	const NewComp = (props) => {
		return (
			<div style={{ margin: '20px' }}>
				<Comp {...props} />
			</div>
		)
	}

	return NewComp
}

export default addBorder