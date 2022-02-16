import React from 'react';
import { Link } from 'react-router-dom';

//Function that returns the navigation bar
export default function Navigation() {
	return (
		<nav className='navigation'>
			<ul>
				<li>
					<Link to='/'>
						<p>Rankings</p>
					</Link>
				</li>
				<li>
					<Link to='search'>
						<p>Search</p>
					</Link>
				</li>
				<li>
					<Link to='factors'>
						<p>Factors</p>
					</Link>
				</li>
				<li>
					<Link to='register'>
						<p>Register</p>
					</Link>
				</li>
				<li>
					<Link to='login'>
						<p>Login</p>
					</Link>
				</li>
				<li>
					<Link to='logout'>
						<p>Logout</p>
					</Link>
				</li>
			</ul>
		</nav>
	);
}
