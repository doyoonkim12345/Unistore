import React from 'react'
import { useHistory } from 'react-router-dom'
import { authService } from '../fBase'

function LogOut(){
    const history = useHistory()
    const onLogOutClick = () => {    
        authService.signOut()
        history.push("/login")
    }
    return (<button onClick={onLogOutClick}>로그아웃</button>)

}
export default LogOut
