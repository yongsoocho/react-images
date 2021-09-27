import React, { Fragment } from "react"
import UploadForm from "../components/UploadForm"
import ImageList from "../components/ImageList"

const MainPage = () => {
	return (
		<Fragment>
			<UploadForm />
			<ImageList />
		</Fragment>
	)
}

export default MainPage