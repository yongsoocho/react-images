import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const ImageContext = createContext({
	state: {
		Images: []
	},
	actions: {
		setImages: () => {}
	}
})

export const ImageProvider = props => {
	const [Images, setImages] = useState([])
	
	useEffect(() => {
		axios.get("https://backrt.run.goorm.io/images")
		.then(res => setImages(res.data))
		.catch(error => console.log(error))
	}, [])
	
	const value = {
		state: {
			Images
		},
		actions: {
			setImages
		}
	}
	
	return(
		<ImageContext.Provider value={value}>
			{props.children}
		</ImageContext.Provider>
	)
}