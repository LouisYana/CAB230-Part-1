import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
	const [userName, setUserName] = useState();
	const [password, setPassword] = useState();
	const [error, setError] = useState();
	const [errorMesssage, setErrorMessaged] = useState(null);
	const url1 = 'http://131.181.190.87:3000/';

	//authentication function logs in user to the API
	function authentication() {
		const url2 = `${url1}user/login`;
		const token = localStorage.getItem('token');
		const headers = {
			accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		};

		//POST - get authorised by the API
		return fetch(url2, {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ email: userName, password: password }),
		})
			.then((res) => res.json())
			.then((res) => {
				localStorage.setItem('token', res.token);
				console.log(res);
				if (res.error) {
					setError(true);
					setErrorMessaged(res.message);
				} else {
					setError(false);
				}
			});
	}
	//return login bar components
	return (
		<div className='container'>
			<h1>Login</h1>
			<div className='login-input'>
				<label htmlFor='userName'>User Name: </label>
				<input
					type='text'
					name='userName'
					id='userName'
					placeholder='bruh@example.com'
					value={userName}
					onChange={(event) => {
						const { value } = event.target;
						setUserName(value);
					}}
				/>
				<label htmlFor='password'>Password: </label>
				<input
					type='password'
					name='password'
					id='password'
					value={password}
					onChange={(event) => {
						const { value } = event.target;
						setPassword(value);
					}}
				/>
				<button onClick={authentication}>Login</button>

				{/* Notify user whether login was succesful or not */}
				{error === true ? (
					<p style={{ color: 'red' }}>{errorMesssage}</p>
				) : null}
				{error === false ? (
					<p style={{ color: 'green' }}>Login Successful</p>
				) : null}

				{/* Link to register page */}
				<p>
					Don't have an account? Register <Link to='register'>Here</Link>
				</p>
			</div>
		</div>
	);
}
