import React, { useEffect, useState } from 'react';

//Register page 
export default function Register() {
	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState();
	const [errorMessage, setErrorMessage] = useState();

	const url1 = 'http://131.181.190.87:3000';

	//registers a new user with the API
	function register() {
		const url2 = `${url1}/user/register`;

		//POST - takes user info from the page and registers them as a new user
		return fetch(url2, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: userName, password: password }),
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (res.error === true) {
					setError(true);
					setErrorMessage(res.message);
				} else {
					setError(false);
				}
			});
	}

	//return components fo the page
	return (
		<div className='register'>
			<h1 className='register-heading'>Register</h1>
			<div className='register-input'>
				<label className='register-username'>
					Email Address:
					<input
						type='text'
						name='username'
						id='username'
						value={userName}
						onChange={(event) => {
							const { value } = event.target;
							setUserName(value);
						}}></input>
				</label>
				<label className='register-password'>
					Password:
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={(event) => {
							const { value } = event.target;
							setPassword(value);
						}}></input>
				</label>
				<button onClick={register}>Register</button>
			</div>

			{/* Notify user the result of the registration attempt */}
			<div className='register-confirmation'>
				{error !== false ? <p>{errorMessage}</p> : null}
				{error === false ? (
					<p style={{ color: 'green' }}>Registeration Successful</p>
				) : null}
			</div>
		</div>
	);
}
