import React,{useEffect, useState, useContext} from 'react'
import { dbService, storageService } from '../fBase'
import { v4 as uuidv4 } from "uuid"
import { logInfo } from '../App'
import { useHistory } from 'react-router-dom'
import StoreContext from '../components/StoreContext'
import { RtmEventContainer, RtmInputForm } from '../components/infoStyle'

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
    menuUrl:'https://www.eguljak.com/upload/product/3696654736_oTZCrFQ3_20210726032314.jpg',
    startAm: true, // true= am false= pm 
    endAm: true
}

function Info(){

    const {userObj} = useContext(logInfo)

    const [storeData, setStoreData] = useState({})
    const [rtmData, setRtmData] = useState({})
    const [dataStatus, setDataStatus] = useState(false)
    const history = useHistory()

    useEffect(() => {
        
            setTimeout(
                async () => {
                    //firestore에 유저의 uid로 내용이 있는 지확인
                    const data1 = await dbService.collection('storedata').doc(userObj.uid).get()
                    const data2 = await dbService.collection('rtmstoredata').doc(userObj.uid).get()
                    console.log(data2.data())
                    setDataStatus(data2.data() ? data2.data() : '')
                    data1.data() ? setStoreData(data1.data()) : setStoreData(defaultStoreData)
                    data2.data() ? setRtmData(data2.data()) : setRtmData(defaultRtmData)  

                } ,0)
            

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const imgToUrl = async (img) => {
        let imgUrl = ""
        if(img !== ""){
            try{
                const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`) //각각의 게시물에 첨부되어 있는이미지를 가져옴
                const response = await attachmentRef.putString(img, "data_url")
                imgUrl = await response.ref.getDownloadURL()
            } catch (error){
                imgUrl = img
                console.log(error)
            }
        }
        return imgUrl
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        alert('이벤트가 등록 됩니다! 잠시만 기다려주세요!')
        const imgUrl = await imgToUrl(rtmData.imgUrl)
        const menuUrl = await imgToUrl(rtmData.menuUrl)

        const contextObj = {
            ...rtmData,
            createdAt: Date.now(),
            createrId: userObj.uid,
            imgUrl,
            menuUrl
            
        }
        
        await dbService.collection("rtmstoredata").doc(userObj.uid).set(contextObj)

        alert('이벤트가 등록 되었습니다!')

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
        console.log(event)
        const {
            target: { files, name} 
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
                    [name]: result
                })
            }
            reader.readAsDataURL(theFile )
            console.log(theFile)
        } catch (e) {
            console.log(e.message)
        }
    }

    const onDeleteClick = () => {
        dbService.collection("rtmstoredata").doc(userObj.uid).delete().then(() => {
            console.log(dataStatus)
            alert('실시간 이벤트가 종료되었습니다!')
            history.push('/login')
        }).catch((error) => {
            alert(error)
        });
    }

    const onRejectSubmit = (event) => {
        event.preventDefault()
        console.log(dataStatus)
        console.log(rtmData)
        alert('메인이미지와 메뉴이미지를 넣어주세요!')
    }
    //const onClearAttachmentClick = () => setRtmData({...rtmData, imgUrl:''})

    return (
        <RtmEventContainer>
            <h2>실시간 이벤트를 알려주세요!</h2>
            <div className='preview'>
                <h3>미리보기</h3>
                <h4>아래와 같이 보여집니다</h4>
                <StoreContext rtmData={rtmData} storeData={storeData} isSet={true}/>
                {dataStatus && <button className='rtmOff' onClick={onDeleteClick}>실시간 이벤트 종료</button>}
            </div>
            <RtmInputForm onSubmit={((rtmData.imgUrl===defaultRtmData.imgUrl)) || ((rtmData.menuUrl===defaultRtmData.menuUrl)) ? onRejectSubmit : onSubmit}>
                
                <input name='realTime' value={rtmData.realTime} onChange={onChange} type="text" placeholder="할인 내용" maxLength={120} required />
                <div>
                    <input name='startTime' value={rtmData.startTime} onChange={onChange} type="number" min='0' max='12' placeholder="시작 시간" required/>
                    <button name='startAm' type='button' onClick={onToggleChange}>{rtmData.startAm ? 'pm' : 'am'}</button>
                </div>
                <div>
                    <input name='endTime' value={rtmData.endTime} onChange={onChange} type="number"  min='0' max='12' placeholder="끝나는 시간" required/>
                    <button name='endAm' type='button' onClick={onToggleChange}>{rtmData.endAm ? 'pm' : 'am'}</button>
                </div>
                <button type='button'><label for="imgUrl" >{(rtmData.imgUrl===defaultRtmData.imgUrl)?'메인이미지':'업로드 완료'}</label></button>
                <button type='button'><label for="menuUrl" >{(rtmData.menuUrl===defaultRtmData.menuUrl)?'메뉴이미지':'업로드 완료'}</label></button>
                <input style={{display:'none'}} id='imgUrl' name='imgUrl' type="file" accept="image/*" onChange={onFileChange} ></input>
                <input style={{display:'none'}} id='menuUrl' name='menuUrl' type="file" accept="image/*" onChange={onFileChange} ></input>
                <button className='rtmOn' type="submit">{dataStatus?'이벤트 수정':'실시간 이벤트 ON'}</button>
            </RtmInputForm>
        </RtmEventContainer>
    )
}

export default Info