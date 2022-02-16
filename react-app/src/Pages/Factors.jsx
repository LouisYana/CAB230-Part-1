import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Line } from 'react-chartjs-2';
import Charts from '../Components/Charts';
import { Link } from 'react-router-dom';

//Load function loads the data from the url and returns the table and charts
function Load(props) {
	const [singleCountry, setSingleCountry] = useState(null);

	let url = 'http://131.181.190.87:3000/factors';

	//Evaluate link to match what year has been entered
	if ((props.year == null) | (props.year == '')) {
		url = `${url}/2020`;
	} else {
		url = `${url}/${props.year}`;
	}

	//Evaluate link to match what limit and country has been entered
	if ((props.limit == null) | (props.limit == '') && props.country != null) {
		url = `${url}?country=${props.country}`;
	} else if (
		props.limit != null &&
		props.limit != '' &&
		props.country == null
	) {
		url = `${url}?limit=${props.limit}`;
	} else if (props.limit != null && props.country != null) {
		url = `${url}?limit=${props.limit}&country=${props.country}`;
	}

	//retrieve token from storage
	const token = localStorage.getItem('token');

	const [rowData, setRowData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	//columns for the table
	const columns = [
		{
			headerName: 'Rank',
			field: 'rank',
			sortable: true,
			filter: 'agNumberColumnFilter',
			width: 70,
		},
		{
			headerName: 'Country',
			field: 'country',
			sortable: true,
			filter: true,
			width: 125,
		},
		{
			headerName: 'Score',
			field: 'score',
			sortable: true,
			filter: 'agNumberColumnFilter',
			width: 100,
		},
		{
			headerName: 'Economy',
			field: 'economy',
			sortable: true,
			filter: 'agNumberColumnFilter',
			width: 100,
		},
		{
			headerName: 'Family',
			field: 'family',
			sortable: true,
			filter: 'agNumberColumnFilter',
			width: 100,
		},
		{
			headerName: 'Health',
			field: 'health',
			sortable: true,
			filter: 'agNumberColumnFilter',
			width: 100,
		},
		{
			headerName: 'Freedom',
			field: 'freedom',
			sortable: true,
			filter: 'agNumberColumnFilter',
			width: 100,
		},
		{
			headerName: 'Generosity',
			field: 'generosity',
			sortable: true,
			filter: 'agNumberColumnFilter',
			width: 100,
		},
		{
			headerName: 'Trust',
			field: 'trust',
			sortable: true,
			filter: 'agNumberColumnFilter',
			width: 100,
		},
	];

	//retireve data from the url and set the row data and loading status
	useEffect(() => {
		fetch(url, {
			method: 'GET',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => {
				if (res.ok) {
					setError(false);
				} else {
					setError(res.status);
					setErrorMessage(res.statusText);
				}
				return res.json();
			})
			.then((result) =>
				result.map((data) => {
					return {
						rank: data.rank,
						country: data.country,
						score: data.score,
						economy: data.economy,
						family: data.family,
						health: data.health,
						freedom: data.freedom,
						generosity: data.generosity,
						trust: data.trust,
					};
				})
			)
			.then((data) => {
				setRowData(data);

				//error handling if data returned is empty
				if (rowData == []) {
					setError(100);
				}
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [props]);

	//Return the table and charts
	return (
		<div className='factors-chart'>
			<div
				className='ag-theme-balham'
				style={{
					height: '300px',
					width: '900px',
				}}>
				{/* Error handling */}
				{error === 400 ? <p>{errorMessage}, invalid Parameters</p> : null}
				{error === 401 ? (
					<p>
						{errorMessage}, Please <Link to='register'>Register</Link> or{' '}
						<Link to='login'>Login</Link>
					</p>
				) : null}
				{error === 100 ? <p>Incorrect Country Name</p> : null}

				{/* Do not load grid unless rowData is not empty. Used tos top app crashing */}
				{rowData && (
					<AgGridReact
						columnDefs={columns}
						rowData={rowData}
						pagination={true}
						paginationPageSize={8}
					/>
				)}
				{isLoading && <p>Loading Data...</p>}
			</div>
			<div className='factor-charts'>
				{/* Do not load charts unless rowData is not empty */}
				{rowData &&
					rowData.length != 1 && [
						<Charts
							rows={rowData.slice(0, 10).map((data) => data.economy)}
							label={rowData.slice(0, 10).map((data) => data.country)}
							dataLabel={'Points'}
							ylabel={'Economy'}
							xlabel={null}
							type={'bar'}
						/>,
						<Charts
							rows={rowData.slice(0, 10).map((data) => data.family)}
							label={rowData.slice(0, 10).map((data) => data.country)}
							dataLabel={'Points'}
							ylabel={'Family'}
							xlabel={'Country'}
							type={'bar'}
						/>,
						<Charts
							rows={rowData.slice(0, 10).map((data) => data.health)}
							label={rowData.slice(0, 10).map((data) => data.country)}
							dataLabel={'Points'}
							ylabel={'Health'}
							xlabel={'Country'}
							type={'bar'}
						/>,
						<Charts
							rows={rowData.slice(0, 10).map((data) => data.freedom)}
							label={rowData.slice(0, 10).map((data) => data.country)}
							dataLabel={'Points'}
							ylabel={'Freedom'}
							xlabel={'Country'}
							type={'bar'}
						/>,
						<Charts
							rows={rowData.slice(0, 10).map((data) => data.generosity)}
							label={rowData.slice(0, 10).map((data) => data.country)}
							dataLabel={'Points'}
							ylabel={'Generosity'}
							xlabel={'Country'}
							type={'bar'}
						/>,
						<Charts
							rows={rowData.slice(0, 10).map((data) => data.trust)}
							label={rowData.slice(0, 10).map((data) => data.country)}
							dataLabel={'Points'}
							ylabel={'Trust'}
							xlabel={'Country'}
							type={'bar'}
						/>,
					]}
			</div>
		</div>
	);
}

//Returns components of the page
export default function Factors() {
	const [year, setYear] = useState(null);
	const [limit, setLimit] = useState(null);
	const [country, setCountry] = useState(null);
	const [year2, setYear2] = useState(null);
	const [limit2, setLimit2] = useState(null);
	const [country2, setCountry2] = useState(null);
	const [error, setError] = useState(null);

	return (
		<div className='factors'>
			<h1>Factors</h1>

			<div className='factors-bar'>
				<label>
					Year:
					<input
						placeholder='Default is 2020'
						type='text'
						name='year'
						id='year'
						value={year}
						onChange={(event) => {
							const { value } = event.target;

							//Regex to stop users entering non numeric values
							if (/^[A-Za-z]+$/.test(value)) {
								setError('Can only be numbers');
							} else {
								setYear(value);
								setError(null);
							}
						}}></input>
				</label>
				<label>
					Limit:
					<input
						placeholder='Number of results'
						type='text'
						name='limit'
						id='limit'
						value={limit}
						onChange={(event) => {
							const { value } = event.target;
							//Regex to stop users entering non numeric values
							if (/^[A-Za-z]+$/.test(value)) {
								setError('Can only be numbers');
							} else {
								setLimit(value);
								setError(null);
							}
						}}></input>
				</label>
				<label>
					Country:
					<input
						type='text'
						name='country'
						id='country'
						value={country}
						onChange={(event) => {
							const { value } = event.target;
							//Regex to stop users entering numeric values
							if (/[0-9]/.test(value)) {
								setError("Country should't have numbers");
							} else {
								setError(null);
								setCountry(value);
							}
						}}></input>
				</label>
				<button
					onClick={() => (
						setLimit2(limit), setYear2(year), setCountry2(country)
					)}>
					Search
				</button>
			</div>

			{error != null ? <p>{error}</p> : null}

			{/* Load the table and charts */}
			<Load year={year2} limit={limit2} country={country2} />
		</div>
	);
}
