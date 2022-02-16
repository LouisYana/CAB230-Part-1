import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Rankings from './Pages/Rankings';
import Search from './Pages/Search';
import Factors from './Pages/Factors';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Header from './Components/Header';
import Footer from './Components/Footer';

//App to control routing the pages and header/footer on the page
export default function App() {
	return (
		<Router>
			<div className='App'>
				<Header />
				<Switch>
					<Route exact path='/'>
						<Rankings />
					</Route>
					<Route path='/search'>
						<Search />
					</Route>
					<Route path='/factors'>
						<Factors />
					</Route>
					<Route path='/register'>
						<Register />
					</Route>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/logout'>
						<Logout />
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}
