import React, { Component } from 'react'

interface IProps {
    type: any,
    className: any,
}

export class Icon extends Component<IProps,{}> {
	render() {
		const { type, className  } = this.props;
		return (
			<>{React.createElement(type, { className: className })}</>
		)
	}
}

export default Icon
