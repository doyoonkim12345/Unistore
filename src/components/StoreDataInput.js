import React,{useState, useContext, useEffect} from 'react'
import DaumPostCode from 'react-daum-postcode'
import { dbService } from '../fBase'
import { logInfo } from '../App'
import LogOut from '../routes/Profile'
import { useHistory } from 'react-router-dom'

export default function StoreDataInput({setCheckFirstTime, discountOff=false }){

    //props로 useState 함수를 가져오면 안됨 하지만 ... ㅋㄷ
    const { kakao } = window;
    const {userObj} = useContext(logInfo)

    const history = useHistory()

    const [isAddress, setIsAddress] = useState('')
    const [isZoneCode, setIsZoneCode] = useState('')
    const [isPoped, setIsPoped] = useState(false)
    const [phone, setPhone] = useState("")
    const [name, setName] = useState("")
    const [discount, setDiscount] = useState("")
    const [downloadData, setDownloadData] = useState({})
    const [addressXY, setAddressXY] = useState([])
    const [storeKind, setStoreKind] = useState('')

    useEffect(()=>{
        if(!discountOff){
        setTimeout(
            async () => {
                //firestore에 유저의 uid로 내용이 있는 지확인
                const data = await dbService.collection('storedata').doc(userObj.uid).get()
                setDownloadData(data.data())
                console.log(data.data())
                setDiscount(data.data().discount)
                setName(data.data().name)
                setPhone(data.data().phone)
                setIsAddress(data.data().isAddress)
                setStoreKind(data.data().storeKind)
                getXY(data.data().isAddress)
            } ,0)
        }}
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ,[])

    const onComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
        console.log(data)

        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress +=
              extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
 
        getXY(isAddress)
        // 나중에 x값과 y값을 받으려고 했으나 발생하는 매우 작은 시간 차이 때문에 업로드가 되고 후에 좌표값을 가져오는 현상을 찾게 되었다. 
        // 이점 때문에 주소 검색한 후와 처음 주소를 가져온 경우에 좌표를 가져올 수 있도록 설정 했다.
        // 나중에 deps를 설정해서 하는 다른 방법이 있을 거 같으나 일단 빠른 개발을 위해 진행하고 코드리뷰 때 정정하도록 하겠다/.

        setIsZoneCode(data.zonecode);
        setIsAddress(fullAddress);
        setIsPoped(false)
        console.log(isAddress)
        console.log(isZoneCode)
      };

    const onClick = () => {
        setIsPoped(true)
    }

    const getXY = async (Address) => {
        let geocoder = new kakao.maps.services.Geocoder();

        await geocoder.addressSearch(Address, function(result, status) {

            // 정상적으로 검색이 완료됐으면 
             if (status === kakao.maps.services.Status.OK) {
                const xy = [result[0].x, result[0].y]
                console.log(xy)
                setAddressXY(xy)
    
            } 
        });    
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        if(isAddress || downloadData.isAddress){
            const contextObj = {
                id:userObj.uid,
                createdAt: Date.now(),
                phone,
                name,
                isAddress,
                addressXY,
                storeKind,
                discount : discountOff ? "" : discount
            }
            if(!(downloadData === contextObj)){
            await dbService.collection('storedata').doc(userObj.uid).set(contextObj)}

            if(discountOff){
                setCheckFirstTime(false)
            }else{
                history.push('/login')
            }
        }else{
            alert('주소를 입력해주세요')
        }
    }

    const onPhoneChange = (event) => {
        setPhone(event.target.value)
    }

    const onNameChange = (event) => {
        setName(event.target.value)
    }

    const onDiscoutChange = (event) => {
        setDiscount(event.target.value)
    }

    const onKindChange = (event) => {
        setStoreKind(event.target.value)
    }

    return(
    <>  
        <form onSubmit={onSubmit}>
            <input value={storeKind} onChange={onKindChange} type="text" placeholder="가게 종류(ex 한식, 중식 ..)" required/>
            <input value={name} onChange={onNameChange} type="text" placeholder="가게이름" required/>
            <input value={phone} onChange={onPhoneChange} type="text" placeholder="가게 전화번호" required/>
            {!discountOff && <input value ={discount} onChange={onDiscoutChange} type="text" placeholder="학생대상 할인 정보를 입력해주세요!" required />}
            {!discountOff && <LogOut />}
            {isPoped ? <DaumPostCode onComplete={onComplete}/> : <button onClick={onClick}>{isAddress? isAddress :  "가게주소찾기"}</button>}
            <button type="submit" required>확인</button>
        </form>
    </>
    )
}