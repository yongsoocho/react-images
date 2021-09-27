import React, { useState, createContext, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = props => {
	const [me, setMe] = useState(123)

	useEffect(() => {
		if(me) {
			axios.defaults.headers.common.sessionid = me.sessionid
		} else {
			delete axios.defaults.headers.common.sessionid
		}
	}, [me])
	
	const value = {
		state: {
			me
		},
		actions: {
			setMe
		}
	}
	
	return (
		<AuthContext.Provider value={value}>
			{props.children}
		</AuthContext.Provider>
	)
}