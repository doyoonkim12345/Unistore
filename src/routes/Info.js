import React,{useEffect, useState, useContext} from 'react'
import { dbService, storageService } from '../fBase'
import { v4 as uuidv4 } from "uuid"
import { logInfo } from '../App'
import { useHistory } from 'react-router-dom'
import StoreContext from '../components/StoreContext'

const defaultStoreData = {
    name:'란탕수육 이대점',
    storeKind: '한식',
    discount:'항상 대학생 10% 할인',
    phone:'010-0000-0000',
    addressXY:[37.402056,127.108212]
}

const defaultRtmData = {
    realTime:'맥주1+1',
    startTime: 9,
    endTime: 10,
    imgUrl:'https://www.eguljak.com/upload/product/3696654736_oTZCrFQ3_20210726032314.jpg',
    startAm: true, // true= am false= pm 
    endAm: true
}

function Info(){

    const {userObj} = useContext(logInfo)

    const [storeData, setStoreData] = useState({})
    const [rtmData, setRtmData] = useState({})
    const history = useHistory()

    useEffect(() => {
        /*dbService.collection("rtmstoredata").doc(userObj.uid).onSnapshot((snapshot) => {
            console.log(snapshot)
            try{
                const contextArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                    
                }))
                setContexts(contextArray)
            } catch (e){
                console.log(e)
            }
            
        }

        )*/
        
            setTimeout(
                async () => {
                    //firestore에 유저의 uid로 내용이 있는 지확인
                    const data1 = await dbService.collection('storedata').doc(userObj.uid).get()
                    const data2 = await dbService.collection('rtmstoredata').doc(userObj.uid).get()
                    console.log(data1.data(), data2.data())
                    data1.data() ? setStoreData(data1.data()) : setStoreData(defaultStoreData)
                    data2.data() ? setRtmData(data2.data()) : setRtmData(defaultRtmData)

                } ,0)
            

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = async (event) => {
        event.preventDefault()

        let imgUrl = ""
        if(rtmData.imgUrl !== "" ){
            try{
                const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`) //각각의 게시물에 첨부되어 있는이미지를 가져옴
                const response = await attachmentRef.putString(rtmData.imgUrl, "data_url")
                imgUrl = await response.ref.getDownloadURL()
            } catch (error){
                imgUrl = rtmData.imgUrl
                console.log(error)
            }
        }

        const contextObj = {
            ...rtmData,
            createdAt: Date.now(),
            createrId: userObj.uid,
            imgUrl,  
        }

        await dbService.collection("rtmstoredata").doc(userObj.uid).set(contextObj)
        setRtmData({})
        setStoreData({})
        history.push('/login')
    }
    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setRtmData({
          ...rtmData, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
      };
    
    const onToggleChange = (e) => {
        const { name } = e.target
        console.log(name)
        setRtmData({
            ...rtmData,
            [name]: !rtmData[name]
        })
    }

    const onFileChange = (event) => {
        const {
            target: { files } 
            }= event
        try {
            const theFile = files[0]
            const reader = new FileReader()
            reader.onloadend = (finishedEvent) =>{
                const {
                    currentTarget:{result}
                } = finishedEvent
                setRtmData({
                    ...rtmData,
                    imgUrl: result
                })
            }
            reader.readAsDataURL(theFile )
            console.log(theFile)
        } catch (e) {
            console.log(e.message)
        }
    }

    //const onClearAttachmentClick = () => setRtmData({...rtmData, imgUrl:''})

    return (
        <div>
            <StoreContext rtmData={rtmData} storeData={storeData} isSet={true}/>
            
            <form onSubmit={onSubmit}>
                <input name='realTime' value={rtmData.realTime} onChange={onChange} type="text" placeholder="할인 내용" maxLength={120} required />
                <input name='startTime' value={rtmData.startTime} onChange={onChange} type="number" max='12' placeholder="시작 시간" required/>
                <button name='startAm' type='button' onClick={onToggleChange}>{rtmData.startAm ? 'pm' : 'am'}</button>

                <input name='endTime' value={rtmData.endTime} onChange={onChange} type="number" max='12' placeholder="끝나는 시간" required/>
                <button name='endAm' type='button' onClick={onToggleChange}>{rtmData.endAm ? 'pm' : 'am'}</button>

                <input type="submit"/>
                <input type="file" accept="image/*" onChange={onFileChange} required={!rtmData.imgUrl}></input>

            </form>
        </div>
    )
}

export default Info