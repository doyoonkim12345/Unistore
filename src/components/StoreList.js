import React, { useState }  from 'react';
import {EachListContainer, ListContainer} from '../components/style'
import EachStore from './EachStoreCreater/EachStore';

const stores = [
    // 0 식당 1 당구장 2 노래방 3 볼링장
// 0 식당
        {
            logo:'치킨플러스',
            sTitle:'신메뉴 출시 기념',
            mainTitle:'5천원 할인',
            max:1,
            explain:'8월 4일~8월 31일 닭볶이 5천원',
            imgUrl:'https://pelicana.co.kr/resources/images/menu/original_menu01_200529.png',
            color:'skyblue'
        },
        {
            logo:'오븐에 빠진 닭',
            sTitle:'매주 목/금요일 전 메뉴',
            mainTitle:'4천원 할인',
            max:0,
            explain:'향라치킨 신메뉴 출시!\n치킨을 치킨답게! 더 맛있계!',
            imgUrl:'https://www.oppadak.co.kr/data/product/20190617170611.png',
            color:'plum'
        },
        {
            logo:'던킨도넛',
            sTitle:'플레이매트 사전예약',
            mainTitle:'5천원 할인',
            max:0,
            explain:'기간8월 13일~8월19일',
            imgUrl:'https://www.dunkindonuts.co.kr/upload/product/1644025794.png',
            color:'lavender'
        },
        {
            logo:'일미리 금계찜닭',
            sTitle:'오케이광자매와 함께',
            mainTitle:'5천원 할인',
            max:0,
            explain:'매주 화,목요일에는\n금계찜닭과 함께 화.목.한 식사하세요.',
            imgUrl:'	http://goldjjimdak.com/new/upload/menu_01/2021_02_22/hero_kTu9N_2021_02_22_12_47_00.jpg',
            color:'khaki'
        },
        {
            logo:'Ashley delivery',
            sTitle:'배달 / 포장 주문시',
            mainTitle:'5천원 할인',
            max:0,
            explain:'스테이크부터 파스타,샐러드까지!\n할인헤택으로 애슐리를 즐겨보세요!',
            imgUrl:'data:image/png;base64,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',
            color:'beige'
        },
        {
            logo:'뉴욕야시장',
            sTitle:'매주 수/목/금',
            mainTitle:'5천원 할인',
            max:0,
            explain:'뉴욕야시장 메뉴로\n 한여름밤의 육~쾌한 파티!',
            imgUrl:'	http://www.newyork-yasijang.net/images/sub02/sig_nysteak.png',
            color:'Wheat'
        },
        {
            logo:'걸작떡볶이',
            sTitle:'맛있는 떡닭세트',
            mainTitle:'5천원 할인',
            max:1,
            explain:'포장 5천원, 배달 4천원',
            imgUrl:'https://www.eguljak.com/upload/product/3696654736_oTZCrFQ3_20210726032314.jpg',
            color:'linen'
        },
        {
            logo:'순수치킨',
            sTitle:'목 / 금 전메뉴',
            mainTitle:'5천원 할인',
            max:1,
            explain:'8월 매주 목/금\n배달 주문시에만 가능합니다.',
            imgUrl:'http://soonsoochicken.com/images/sub/menu_1.jpg',
            color:'Palegreen'
        },
]

//export const MyContext = createContext(stores)

export default function StoreList(){
    
    //const allStores = useContext(MyContext)
    //전역변수를 만드는 것
    const [value, setValue] = useState(stores)
    const menulist = value.map((store)=>(
        <EachStore storeTestData={store}/>
    ))

    const onPlus = () => {
            setValue(value.concat(stores[0]))
    }

    const onReset = () => {
            setValue([])
    }

    return(
        <>
            <button onClick={onPlus}>Plus</button>
            <button onClick={onReset}>Reset</button>
            <ListContainer>
                {menulist}
            </ListContainer>
        </>
    )
}