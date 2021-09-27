import React, { useContext, Fragment } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import axios from "axios"

const ToolBar = () => {
	
	const { state, actions } = useContext(AuthContext)
	
	const logoutHandler = async () => {
		try {
			const payload = {}
			await axios.patch("https://backrt.run.goorm.io/user/logout", 
												payload, 
												{ headers: {
														sessionid: state.me.sessionid
													}
												}
											 )
			actions.setMe()
		} catch(error) {
			
		}
	}
	
	return (
		<div>
			<Link to="/">
				<span>홈</span>
			</Link>
			{ state.me ? (
				<Fragment>
					<span onClick={logoutHandler} style={{ marginLeft: '10px' }}>로그아웃</span>
				</Fragment>
			) : (
				<Fragment>
					<Link to="/auth/login" style={{ 'margin': '0px 15px' }}>
						<span>로그인</span>
					</Link>
					<Link to="/auth/register">
						<span>회원가입</span>
					</Link>
				</Fragment>
			)
			}
		</div>
	)
}

export default ToolBar