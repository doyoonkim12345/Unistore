import React,{useState} from 'react'
import { LoginBox, LoginInputForm } from '../components/authStyle'
import { authService, firebaseInstance } from '../fBase'
import {TitleContainer} from '../components/style'

function Auth(){
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(false)
    const [error, setError] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault()
        let data
        try{
        if(newAccount){
            data = await authService.createUserWithEmailAndPassword(email, password)
        }else{
            data = await authService.signInWithEmailAndPassword(email, password)
        }
        console.log(data)
        } catch (e) {
        setError(e.message)}
    }

    const onChange = (event) => {
        const {target : {name, value}} = event
        if(name === "email"){
            console.log(name)
            setEmail(value)
        }else if(name === "password"){
            console.log(name)
            setPassword(value)
        }
    }

    const onSocialClick = async (event) => {
        const {
            target:{name}
        } = event
        let provider
        if(name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider()
        }
        const data = await authService.signInWithPopup(provider)
        console.log(data)
    }

    const toggleAccount = () => setNewAccount(prev => !prev)
    return (
    <LoginBox>
        <TitleContainer>FineApple</TitleContainer>
        <LoginInputForm onSubmit={onSubmit}>
            <input name="email" type='text' placeholder="이메일" required value={email} onChange={onChange}></input>
            <input name="password" type="password" placeholder="비밀번호" required value={password} onChange={onChange}></input>
            <button type="submit" >{newAccount ? "Create Account" : "로그인"}</button>
        </LoginInputForm>
        <span onClick={toggleAccount}>{newAccount ? '로그인' : 'Create Account'}</span>
        {error}
        <div>
            <button name="google" onClick={onSocialClick}>구글로 로그인 하기</button>
        </div>
    </LoginBox>
    )
}
export default Auth