import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css'
import { UserContext } from "./UserContext";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Health from "./pages/Health";

// functions
import { getUser } from "./api/user";

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = getUser()
			.then((res) => {
				if (res.error) toast(res.error);
				else setUser(res.username);
			})
			.catch((err) => toast(err));

		return () => unsubscribe;
	}, []);

	return (
		<div>
			<Router>
				<UserContext.Provider value={{ user, setUser }}>
					<ToastContainer />
					<Header />
					
					<Route exact path= "/" component={Home} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/health" component={Health} />
				</UserContext.Provider>
			</Router>
		</div>
	);
};

export default App;
