import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import StoreDataInput from '../../components/StoreDataInput'
import { dbService } from '../../fBase'
import { logInfo } from '../../App'
import { LinkList } from '../../components/choiceStyle'

function Choice(){
    const [init, setInit] = useState(true)
    const {userObj} = useContext(logInfo)
    const [checkFirstTime, setCheckFirstTime] = useState(false)
    //첫번째 로그인 하는지 확인하는 변수
    
    //처음 마운트 될 때 한번만 실행 하기 위해서 deps를 없는 것으로 지정
    //useEffect는 화면에 그려지고 난 다음에 실행하므로 
    //화면에 그려지는 시간동안 딜레이를 주지 않으면 userobj.uid를 찾을 수 없다거나
    //data.exist가 true 반환 되는 경우가 생김

    //문제가 userobj.uid가 즉각 반영 되지 않고 전에 있는 자료가 있거나 수정중에 실행되서 null이 되는 것이었다.
    // useEffect에 deps에 userobj를 넣어서 userobj가 변경되면 호출 할 수 있게했다. 

    useEffect(()=>{
        setTimeout(
            async () => {
                try{
                //firestore에 유저의 uid로 내용이 있는 지확인
                const data = await dbService.collection('storedata').doc(userObj.uid).get()
                //console.log(userObj.uid)
                console.log(data)
                if(!data.exists){
                    console.log("check")
                    setCheckFirstTime(true)
                }
                setInit(false)
                }catch(e){
                    console.log(e)
                }
            } ,0)
            //console.log(init, checkFirstTime)
        }
        ,[userObj])

        
    return (
    <>
        {
        init ? <p>안녕하세요 vis 입니다!</p>
        
        :   checkFirstTime ?
                <>
                <StoreDataInput setCheckFirstTime={setCheckFirstTime} discountOff={true} />
                </>
            
            :    <LinkList>
                    <p>
                        <Link className='default-link' to="/info">가게정보</Link>
                    </p>
                    <p>
                        <Link className='default-link' to="/profile">실시간 할인정보</Link>
                    </p>
                </LinkList>
        }
    </>)}
export default Choice