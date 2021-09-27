import React, { useState, useContext } from "react"
import axios from "axios"
import "./form.css"
import { toast } from 'react-toastify'
import ProgressBar from "./ProgressBar"
import { ImageContext } from "../contexts/ImageContext"

const UploadForm = () => {
	const [file, setFile] = useState(null)
	const [fileName, setFileName] = useState("이미지 파일을 업로드 해주세요")
	const [percent, setPercent] = useState(0)
	const [imgRead, setImgRead] = useState(null)
	const { state, actions } = useContext(ImageContext)
	
	const onChangeFile = event => {
		const imageFile = event.target.files[0]
		setFileName(imageFile.name)
		setFile(imageFile)
		
		const fileReader = new FileReader()
		fileReader.readAsDataURL(imageFile)
		fileReader.onload = event => setImgRead(event.target.result)
	}
	
	const onSubmitForm = async event => {
		event.preventDefault()
		const formData = new FormData()
		formData.append("image", file)
		try {
			const { data } = await axios.post("https://backrt.run.goorm.io/upload", formData, {
				headers: { "Content-type":"multipart/form-data" },
				onUploadProgress: event => {
					setPercent(Math.round((event.loaded / event.total) * 100))
				}
			})
			toast.success("Success")
			setTimeout(() => {
				setPercent(0)
				setImgRead(null)
				setFileName("이미지 파일을 업로드 해주세요")
			}, 2000)
			return console.log(data)
		}catch(err) {
			setPercent(0)
			setImgRead(null)
			setFileName("이미지 파일을 업로드 해주세요")
			toast.error("Failed")
			return console.log(err)
		}
	}
	
	return (
		<form onSubmit={onSubmitForm}>
			<ProgressBar percent={percent} />
			<div className="file-dropper">
				<label>{fileName}</label>
				<input id="image" type="file" onChange={onChangeFile}/>
			</div>
			<button
				type="submit"
				style={{
					width:'100%',
					borderRadius:'10px',
					border:'none',
					cursor:'pointer',
					padding:'10px 0px',
					marginBottom:'20px'
				}}
				>제출!</button>
			<div>
				{
					imgRead !== null
					?
					<img src={imgRead} />
					:
					null
				}
			</div>
		</form>
	)
}

export default UploadForm