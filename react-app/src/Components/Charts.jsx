//imports
import { Line, Bar } from 'react-chartjs-2';

//Charts function, receives information and returns a chart with that info
export default function Charts(props) {
	let orientation = '';

	//Evaluate the props that are passed through and set options
	if (props.type === 'bar') {
		orientation = 'y';
	} else {
		orientation = 'x';
	}
	let legendStatus = false;
	if (props.type === 'bar') {
		legendStatus = false;
	} else {
		legendStatus = true;
	}
	let xDisplayStatus = true;
	if (props.type === 'bar') {
		xDisplayStatus = false;
	}

	//Defining data of the chart
	const data = {
		labels: props.label,
		datasets: [
			{
				label: props.dataLabel,
				data: props.rows,
				fill: false,
				backgroundColor: 'rgb(0, 0, 255)',
				borderColor: 'rgba(0, 0, 255, 0.2)',
			},
		],
	};
	//Defining options of the chart
	const options = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: orientation,
		plugins: {
			legend: {
				display: legendStatus,
				labels: {
					font: {
						size: 15,
						weight: 'bold',
					},
				},
			},
		},
		scales: {
			y: {
				title: {
					display: true,
					text: props.ylabel,
					font: {
						size: 20,
						weight: 'bold',
					},
				},
			},
			x: {
				title: {
					display: xDisplayStatus,
					text: props.xlabel,
					font: {
						size: 20,
						weight: 'bold',
					},
				},
			},
		},
	};
	//Return the chart with the details above
	return (
		<div className='chart-container'>
			{/* Evaluate what type of chart to return */}
			{props.type === 'line' ? (
				<Line data={data} options={options} />
			) : (
				<Bar data={data} options={options} />
			)}
		</div>
	);
}
