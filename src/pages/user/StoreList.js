import React, { useEffect, useState }  from 'react';
import {ListContainer, TitleContainer} from '../../components/style'
import StoreContext from '../../components/StoreContext';
import { dbService } from '../../fBase';

//export const MyContext = createContext(stores)

export default function StoreList(){
    
    //const allStores = useContext(MyContext)
    //전역변수를 만드는 것

    const [rtmData, setRtmData] = useState([])
    const [store, setStoreData] = useState([])

    useEffect(() => {

            setTimeout(
                    () => {
                            dbService
                             .collection("rtmstoredata")
                             .get().then((snapshot) => {
                               try {
                                 const contextArray = snapshot.docs.map((doc) => {
                                    
                                    return {
                                     ...doc.data(), 
                                   }
                                   }
                                 );
                                setRtmData(contextArray)
                                //console.log(snapshot)
                               } catch (e) {
                                 console.log(e);
                               }
                               
                             });

                             dbService
                             .collection("storedata")
                             .get().then((snapshot) => {
                               try {
                                 const contextArray = snapshot.docs.map((doc) => {
                                    
                                    return {
                                     ...doc.data(), 
                                   }
                                   }
                                 );
                                setStoreData(contextArray)
                                //console.log(snapshot)
                               } catch (e) {
                                 console.log(e);
                               }
                               
                             });
                            
                            } ,0)
            

    }, [])
    
    const mapCallback = (eachData)=>{
        const storeData = store.find(x => x.id === eachData.createrId)
        console.log(storeData)
        return <StoreContext rtmData={eachData} storeData={storeData}/>
    }

    const menulist = rtmData.map(mapCallback)


    return(
        <>
            <TitleContainer>FineApple</TitleContainer>
            <ListContainer>
                {menulist}
            </ListContainer>
        </>
    )
}