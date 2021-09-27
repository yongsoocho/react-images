import React from "react"
import "./progressbar.css"

const ProgressBar = (props) => {
	const { percent } = props
	
	return (
		<div className="progress-bar-boundary">
			{percent !== 0 
				? 
				<div style={{ width:`${percent}%` }}>
					{percent} %
				</div>
				:
				null
			}
		</div>
	)
}

export default ProgressBar