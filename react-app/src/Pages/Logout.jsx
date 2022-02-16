import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//function to remove token from local storage
function RemoveToken() {
	localStorage.removeItem('token');
}

//Function to let the user log out
export default function Logout() {
	const [farewell, setFarewell] = useState(false);
	const [loginStatus, setLoginStatus] = useState(null);

	//Check if a log in token exists in storage
	useEffect(() => {
		if (localStorage.getItem('token')) {
			setLoginStatus(true);
		} else {
			setLoginStatus(false);
		}
	});

	//Return components of the page
	return (
		<div className='logout'>
			<h1>Logout Page</h1>
			<h2>
				Login Status: {/* Check if there is a login token and notify user */}
				{loginStatus ? (
					<p>Currently logged in</p>
				) : (
					<p>
						Currently not logged in. Please log in <Link to='login'>here</Link>
					</p>
				)}
			</h2>

			{/* Only show if loginStatus is true */}
			{loginStatus && (
				// Button to remove token
				<button onClick={() => (RemoveToken(), setFarewell(true))}>
					Logout
				</button>
			)}
			{/* Farewell message that only appears when logout button is pressed */}
			{farewell && <p>See you!</p>}
		</div>
	);
}
