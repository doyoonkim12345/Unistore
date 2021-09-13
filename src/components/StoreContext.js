import React, { useEffect, useState } from 'react'
import { ButtonContainer, ContentBox, ExplainBox, ImgBox, TimeBox, TitleBox } from './newStyle'
import {FaPhoneAlt, FaMapMarkerAlt} from 'react-icons/fa'    

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
    startAm: false, // true= am false= pm 
    endAm: false
}


export default function StoreContext({storeData=defaultStoreData, rtmData=defaultRtmData}){

// console.log 결과값
// 하루 전

    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    const [hour, setHour] = useState(0)

    const [isOn, setIsOn] = useState(true)

    useEffect(
        ()=>{
            
            const repeat = setInterval(()=>{
                let nowDate = new Date()//현재시간
                nowDate = nowDate.getTime()

                let startDate = new Date()//이벤트 시작 시간
                startDate.setHours(checkAm(rtmData.startAm, rtmData.startTime-2), 0,0)

                let endDate = new Date()//이벤트 끝나는 시간
                endDate.setHours(checkAm(rtmData.endAm, rtmData.endTime), 0, 0)

                if(endDate <= startDate){
                    endDate.setTime(endDate.getTime()+(1000 * 60 * 60 * 24))
                }

                console.log(checkAm(rtmData.startAm, rtmData.startTime-2), checkAm(rtmData.endAm, rtmData.endTime))

                if((startDate < nowDate  && nowDate < endDate)){
                    setIsOn(true)
                    const countHour = String(
                        Math.floor((endDate-nowDate)%(1000 * 60 *60*24) / (1000 * 60 * 60))).padStart(2, '0')
                    setHour(countHour)

                    const countMinute = String(
                        Math.floor((endDate-nowDate)%(1000 * 60 *60) / (1000 * 60))).padStart(2, '0')
                    setMinute(countMinute)

                    const countSecond = String(
                        Math.floor((endDate-nowDate)%(1000 * 60 ) / (1000))).padStart(2, '0')
                    setSecond(countSecond)

                    console.log('yes')
                }else{
                    console.log('nope')
                    setIsOn(false)
                    clearInterval(repeat)
                }


            }, 1000)
            return ()=>clearInterval(repeat)
        }
        
    ,[rtmData])

    const checkAm = (isAM, time) => {
        let countTime = parseInt(time)
        if(isAM){
            countTime += 12
        } 
        return countTime
    }

    return (
    <ContentBox>
        <ImgBox imgUrl={rtmData.imgUrl}>
            {isOn&&
            <TimeBox>
                <span className='discountContainer'>{rtmData.realTime}</span>
                <span className='timeContianer'>{hour}:{minute}:{second}</span>
            </TimeBox>}
        </ImgBox>
        <TitleBox>{`${storeData.name}( ${storeData.storeKind} )`}</TitleBox>
        <ExplainBox>{storeData.discount}</ExplainBox>
        <ButtonContainer>
            <a href={`tel:${storeData.phone}`}><FaPhoneAlt size={16} /></a>
            <a href={`https://map.kakao.com/link/map/${storeData.name},${storeData.addressXY&&storeData.addressXY[1]},${storeData.addressXY&&storeData.addressXY[0]}`}><FaMapMarkerAlt size={16}/></a>
        </ButtonContainer>
        
    </ContentBox>)
}