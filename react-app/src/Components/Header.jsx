import React from 'react';
import Navigation from './Navigation';

//Header function that returns header of the app with the navigation bar in it
export default function Header() {
	return (
		<header>
			<div className='header-title'>
				<h1>World Happiness Index</h1>
			</div>
			<Navigation />
		</header>
	);
}
