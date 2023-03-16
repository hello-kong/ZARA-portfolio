import React, { memo } from 'react';
import styled from 'styled-components';
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement} from 'chart.js';
import {Line} from 'react-chartjs-2';


Chart.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement, PointElement);

const Container = styled.div`
	width: 100%;
	height: 500px;
`;

const ChartView = memo(({labels, result}) => {

	const defaultOption = {
		responsive: true,
		maintainAspectRatio: false,
		plugin: {
			legend: {
				position: 'bottom'
			}
		}
	};

	const data = {
		labels: labels,
		datasets: [{
			label:'명',
			data: result,
			backgroundColor: 'rgba(0, 255, 0, 0.2)',
			borderColor: '#0f0',
			borderWidth: 1
		},
		{
			label:'명',
			data: result,
			backgroundColor: 'rgba(0, 255, 0, 0.2)',
			borderColor: '#0f0',
			borderWidth: 1
		}]
	};

	return (
		<Container>
			<Line options={defaultOption} data={data}/>
		</Container>
	);
});

export default ChartView;