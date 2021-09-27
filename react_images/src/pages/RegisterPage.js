import React, { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../contexts/AuthContext"

const RegisterPage = () => {
	const [name, setName] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [passwordCheck, setPasswordCheck] = useState("")
	const { state, actions } = useContext(AuthContext)
	
	const submitHandler = async e => {
		e.preventDefault()
		if(password !== passwordCheck) throw new Error("비밀번호가 다릅니다")
		const payload = { name, username, password }
		const { data } = await axios.post("https://backrt.run.goorm.io/auth/register", payload)
		console.log(data)
	}
	
	return (
		<div>
			<h3>회원가입</h3>
			<form onSubmit={submitHandler} >
				<label>name</label>
				<input value={name} onChange={e => setName(e.target.value)} />
				<br/>
				<label>username</label>
				<input value={username} onChange={e => setUsername(e.target.value)} />
				<br/>
				<label>password</label>
				<input value={password} type="password" onChange={e => setPassword(e.target.value)} />
				<br/>
				<label>password check</label>
				<input value={passwordCheck} type="password" onChange={e => setPasswordCheck(e.target.value)} />
				<button type="submit">123</button>
			</form>
		</div>
		
	)
}

export default RegisterPage