import React, { Component } from "react";
import { lightTheme } from "./colors";

const addBorder = (Comp) => {
	const NewComp = (props) => {
		return (
			<div style={{ padding: '20px'}}>
				<Comp {...props} />
			</div>
		)
	}

	return NewComp
}

export default addBorder