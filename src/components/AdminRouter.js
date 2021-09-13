import React, { useContext } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Auth from '../routes/Auth'
import Info from '../routes/Info'
import StoreList from '../pages/user/StoreList'
import Choice from '../pages/seller/Choice'
import { logInfo } from '../App'
import StoreDataInput from './StoreDataInput'
import StoreContext from './StoreContext'

export default function AdminRouter(){

    const {isLoggedin} = useContext(logInfo)

    return (
    <Router>
        <Switch>
            <Route path="/" component={StoreList} exact/>
            {isLoggedin ? (<>
            <Route path="/login" component={Choice} />
            <Route path="/info" component={StoreDataInput} />
            <Route path="/profile" component={Info} />
            <Route path="/test" component={StoreContext} />
            </>) : <Route><Auth/></Route> }
        </Switch>
    </Router>) 
}