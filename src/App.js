import React, {useEffect, useState} from 'react'
import AdminRouter from '../src/components/AdminRouter'
import { authService } from './fBase'

export const logInfo = React.createContext();

export default function App() {
    const [init, setInit] = useState(false)
    const [isLoggedin, setIsLoggedIn] = useState(false)
    const [userObj, setUserObj] = useState(null)

    useEffect(() => {
        authService.onAuthStateChanged((user) =>{
                if(user){
                    setIsLoggedIn(true)
                    setUserObj(user)
                } else {
                    setIsLoggedIn(false)
                }
                setInit(true)
            }
        )
        //해당 이벤트 메소드로 계정 정보를 가져오는 것 까지 기달려야 함.
    },[])
    return (<>{init ? 
    <logInfo.Provider value={{isLoggedin, userObj}}>
      <AdminRouter/>
    </logInfo.Provider>
    : "initializing"}</>)

}