import React, { useEffect, useState } from 'react';
//import "./styles.css";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import useFetch from '../Functions/useFetch';

//Function for the Rankings page
export default function Rankings() {
	const [year, setYear] = useState('All');
	const handleYear = (props) => {
		setYear(props);
		if (props !== 'All') {
			setRowData2(rowData.filter((data) => data.year == props));
		} else {
			setRowData2(rowData);
		}
	};

	const url = 'http://131.181.190.87:3000/rankings';
	const [rowData, setRowData] = useState(null);
	const [rowData2, setRowData2] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	//colums of the table
	const columns = [
		{
			headerName: 'Rank',
			field: 'rank',
			sortable: true,
			filter: 'agNumberColumnFilter',
		},
		{ headerName: 'Country', field: 'country', sortable: true, filter: true },
		{
			headerName: 'Score',
			field: 'score',
			sortable: true,
			filter: 'agNumberColumnFilter',
		},
		{
			headerName: 'Year',
			field: 'year',
			sortable: true,
			filter: 'agNumberColumnFilter',
		},
	];
	//Fetch request to return data from the API
	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((result) =>
				result.map((data) => {
					return {
						rank: data.rank,
						country: data.country,
						score: data.score,
						year: data.year,
					};
				})
			)
			.then((data) => {
				setRowData(data);
				setRowData2(data);
				setIsLoading(false);
			});
	}, []);

	//return components of the page
	return (
		<div className='rankings'>
			<h1 className='rankings-title'>
				Year Selected: <span>{year}</span>
			</h1>
			<div className='rankings-buttons'>
				<button onClick={() => handleYear('All')}>All</button>
				<button onClick={() => handleYear(2020)}>2020</button>
				<button onClick={() => handleYear(2019)}>2019</button>
				<button onClick={() => handleYear(2018)}>2018</button>
				<button onClick={() => handleYear(2017)}>2017</button>
				<button onClick={() => handleYear(2016)}>2016</button>
				<button onClick={() => handleYear(2015)}>2015</button>
			</div>

			{/* table */}
			<div
				className='ag-theme-balham'
				style={{
					height: '300px',
					width: '800px',
				}}>
				{rowData && (
					<AgGridReact
						columnDefs={columns}
						rowData={rowData2}
						pagination={true}
						paginationPageSize={7}
					/>
				)}

				{/* is laoding message when data hasnt laoded yet */}
				{isLoading && <p>Loading Data...</p>}
			</div>
		</div>
	);
}
