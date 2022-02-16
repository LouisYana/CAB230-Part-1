import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Bar, Line } from 'react-chartjs-2';
import useFetch from '../Functions/useFetch';
import Charts from '../Components/Charts';

//function to laod data from the API and return a table and charts containing the data
function Load(props) {
	//table column definitions
	const columns = [
		{
			headerName: 'Year',
			field: 'year',
			sortable: true,
			filter: 'agNumberColumnFilter',
		},
		{
			headerName: 'Rank',
			field: 'rank',
			sortable: true,
			filter: 'agNumberColumnFilter',
		},
		{
			headerName: 'Score',
			field: 'score',
			sortable: true,
			filter: 'agNumberColumnFilter',
		},
	];

	let url = 'http://131.181.190.87:3000/rankings';

	//Evaluating the url depending on what country is passed through
	if (props.country !== null) {
		url = `${url}?country=${props.country}`;
	} else {
		url = 'http://131.181.190.87:3000/rankings?country=Afghanistan';
	}
	const { rowData, isLoading } = useFetch(url);

	//return the table and charts
	return (
		<div>
			<div
				className='ag-theme-balham'
				style={{
					height: '250px',
					width: '600px',
				}}>
				{rowData && (
					<AgGridReact
						columnDefs={columns}
						rowData={rowData}
						pagination={true}
						paginationPageSize={7}
					/>
				)}
				{isLoading && <p>Loading Data...</p>}
			</div>
			<div className='search-chart'>
				{rowData && (
					<Charts
						rows={rowData.map((data) => data.rank)}
						label={['2020', '2019', '2018', '2017', '2016', '2015']}
						dataLabel={'Rank'}
						ylabel={'Happiness Rank'}
						xlabel={'Year'}
						type={'line'}
					/>
				)}
			</div>
		</div>
	);
}

//function for the components of the page
export default function Search() {
	const [country, setCountry] = useState(null);
	const [country2, setCountry2] = useState('Afghanistan');

	//fetch rowData and laoding statues from url using useFetch
	const { rowData, isLoading } = useFetch(
		'http://131.181.190.87:3000/countries'
	);

	//return componets of the page
	return (
		<div className='search'>
			<h1>Search</h1>
			<div className='search-bar'>
				<select
					value={country2}
					onChange={(event) => {
						const { value } = event.target;
						setCountry2(value);
						setCountry(value);
					}}>
					{/* Map data to the dropdown menu and only map when rowData is not null to avoid errors */}
					{rowData && rowData.map((x) => <option>{x}</option>)}
				</select>
				<label>
					Country Selected:<span className='search-country'>{country2}</span>
					<input
						type='text'
						name='country'
						id='country'
						placeholder='country'
						value={country}
						onChange={(event) => {
							const { value } = event.target;
							setCountry(value);
						}}></input>
				</label>
				<button onClick={() => setCountry2(country)}>Search</button>
			</div>

			{/* Load the tabels and charts */}
			<Load country={country2} />
		</div>
	);
}
