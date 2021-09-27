import React, { useContext } from "react"
import "./imagelist.css"
import { ImageContext } from "../contexts/ImageContext"

const ImageList = () => {
	const { state } = useContext(ImageContext)
	const imgList = state.Images.map(img => <img src={`https://backrt.run.goorm.io/upload/${img.key}`} key={img.key} className="img"/>)
	
	return (
		<div>
			<div className="divider"/>
			<div>
				{imgList}
			</div>
		</div>
	)
}

export default ImageList