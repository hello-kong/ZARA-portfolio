import React, {memo} from 'react';
import {Oval} from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Spinner = memo(({visible, width, height, color, secondaryColor, wrapperStyle})=>{
	return (
		<Oval
			height={height}
			width={width}
			color={color}
			wrapperStyle={wrapperStyle}
			wrapperClass=""
			visible={visible}
			ariaLabel='oval-loading'
			secondaryColor={secondaryColor}
			strokeWidth={2}
			strokeWidthSecondary={2}
		/>
	)
});

Spinner.defaultProps = {
	visible: false,
	width: 100,
	height: 100,
	color: '#4fa94d',
	wrapperStyle: {
		position: 'fixed',
		zIndex: 9999,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	}
		
	
};

Spinner.propTypes = {
	visible: PropTypes.bool.isRequired,
	width: PropTypes.number,
	height: PropTypes.number,
	color: PropTypes.string
};

export default Spinner;