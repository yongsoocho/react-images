import React from "react"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoginPage from "./pages/LoginPage"
import Main from "./pages/Main"
import RegisterPage from "./pages/RegisterPage"
import { Route, Switch } from "react-router-dom";
import ToolBar from "./components/ToolBar"

const App = () => {
  return (
		<div className="App">
			<h2>사진첩</h2>
			<ToastContainer/>
			<ToolBar />
			<Switch>
				<Route path="/" component={Main} exact/>
				<Route path="/auth/register" component={RegisterPage} exact/>
				<Route path="/auth/Login" component={LoginPage} exact/>
			</Switch>
		</div>
  );
}

export default App;