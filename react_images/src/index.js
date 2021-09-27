import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ImageProvider } from "./contexts/ImageContext"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ImageProvider>
					<App />
				</ImageProvider>
			</AuthProvider>
		</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);