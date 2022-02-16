import { useState, useEffect } from 'react';

//useFetch function is a user created hook that fetches data from the url and returns the data and a loading status
const useFetch = (url) => {
	const [rowData, setRowData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setRowData(data);
				setIsLoading(false);
			});
	}, [url]);
	return { rowData, isLoading };
};

export default useFetch;
