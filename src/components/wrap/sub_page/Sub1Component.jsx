import React from 'react';
import axios from 'axios';



function Sub1Component() {

    // 상태관리 변수 : 스테이트(state), 상태관리 변수 변경은 셋스테이트(setState())
    const [state, setState] = React.useState([]);


    // 리액트는 함수 실행을 훅이 담당한다. 화면이 다 그려지고 난 후 실행
    // 유즈 이펙트 훅
    React.useEffect(()=>{
         // 외부데이터 가져오기(get) 게터 : 비동기식 방식 
        // method : 폼데이터 전송 응답 => post
        // method : 데이터만 가져오기 => get
        // axios({url:'',method:''}).then((res)=>{}).catch((err)=>{});        
        axios({
            url:'./data/product.json',
            method: 'GET'
        })
        .then((res)=>{
            // console.log('AXIOS 성공!',  res.data.신상품 );
            // 가져온 데이터 상태관리 state 에 저장

            // setState( res.data ); 
            setState(res.data.신상품); 
        })
        .catch((err)=>{
            console.log('AXIOS 실패! ', err );
        }); 
    },[]);  // 로딩시 1회 실행
    
    const commaFormat=(z)=>{ 
        let str = z.toString();
        const regExp = /(^\d+)(\d{3})/;
        while( regExp.test(str) ){
            str = str.replace(regExp, '$1,$2');   
        }
        return str;
    }


    return (
        <main id='sub' className='sub1'>
      
            <section id="section1">
            <div className="container">
                <div className="gap">
                    <div className="title hide">
                        <h2>이주의 신상랭킹</h2>
                    </div>
                    <div className="content">
                        <a href="!#">
                        <img src="./img/sub1/sNzW2Z2kJPIMWnOvw29EpKDlQxcSvWrvoSHwNnw4.png" alt=""/>
                        </a>
                    </div>
                </div>
            </div>
            </section>
            <section id="section2">
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2>신상품</h2>
                    </div>
                    <div className="content">
                        <div className="left">
                        <div className="left-header">
                            <span>필터</span>
                            <span>초기화</span>
                        </div>
                        <div className="left-content">
                            <form id='filterForm' name='filter_form'>
                                <ul>
                                    <li>
                                    <a href="!#" className='category-btn'><span>카테고리</span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                    <div className="sub sub1">
                                        <ul>
                                            <li><label><input type="checkbox" id='sub1Chk01' name='sub1_chk_01' value='과일·견과·쌀'/>과일·견과·쌀</label></li>
                                            <li><label><input type="checkbox" id='sub1Chk02' name='sub1_chk_02' value='국·반찬·메인요리'/>국·반찬·메인요리</label></li>
                                            <li><label><input type="checkbox" id='sub1Chk03' name='sub1_chk_03' value='면·양념·오일'/>면·양념·오일</label></li>
                                            <li><label><input type="checkbox" id='sub1Chk04' name='sub1_chk_04' value='생활용품·리빙·캠핑'/>생활용품·리빙·캠핑</label></li>
                                            <li><label><input type="checkbox" id='sub1Chk05' name='sub1_chk_05' value='샐러드·간편식'/>샐러드·간편식</label></li>
                                            <li><label><input type="checkbox" id='sub1Chk06' name='sub1_chk_06' value='수산·해산·건어물'/>수산·해산·건어물</label></li>
                                            <li><label><input type="checkbox" id='sub1Chk07' name='sub1_chk_07' value='정육·계란'/>정육·계란</label></li>
                                            <li><label><input type="checkbox" id='sub1Chk08' name='sub1_chk_08' value='간식·과자·떡'/>간식·과자·떡</label></li>
                                            <li><label><input type="checkbox" id='sub1Chk09' name='sub1_chk_09' value='생수·음료·우유·커피'/>생수·음료·우유·커피</label></li>
                                            <li><label><input type="checkbox" id='sub1Chk10' name='sub1_chk_10' value='건강식품'/>건강식품</label></li>
                                        </ul>
                                        <span>
                                            <button className='category-more-view-btn'>카테고리 더보기 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="css-jbgpyq e1frj59j0"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></button>
                                        </span>
                                    </div>
                                    </li>
                                    <li>
                                    <a href="!#" className='category-btn'><span>브랜드</span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                    <div className="sub sub2">
                                        <ul>
                                            <li><label><input type="checkbox" id='sub2Chk01' name='sub2_chk_01' value='더반찬'/>더반찬</label></li>
                                            <li><label><input type="checkbox" id='sub2Chk02' name='sub2_chk_02' value='국·반찬·메인요리'/>국·반찬·메인요리</label></li>
                                            <li><label><input type="checkbox" id='sub2Chk03' name='sub2_chk_03' value='면·양념·오일'/>면·양념·오일</label></li>
                                            <li><label><input type="checkbox" id='sub2Chk04' name='sub2_chk_04' value='생활용품·리빙·캠핑'/>생활용품·리빙·캠핑</label></li>
                                            <li><label><input type="checkbox" id='sub2Chk05' name='sub2_chk_05' value='샐러드·간편식'/>샐러드·간편식</label></li>
                                            <li><label><input type="checkbox" id='sub2Chk06' name='sub2_chk_06' value='수산·해산·건어물'/>수산·해산·건어물</label></li>
                                            <li><label><input type="checkbox" id='sub2Chk07' name='sub2_chk_07' value='정육·계란'/>정육·계란</label></li>
                                            <li><label><input type="checkbox" id='sub2Chk08' name='sub2_chk_08' value='간식·과자·떡'/>간식·과자·떡</label></li>
                                            <li><label><input type="checkbox" id='sub2Chk09' name='sub2_chk_09' value='생수·음료·우유·커피'/>생수·음료·우유·커피</label></li>
                                            <li><label><input type="checkbox" id='sub2Chk10' name='sub2_chk_10' value='건강식품'/>건강식품</label></li>
                                        </ul>
                                        <span>
                                            <button  className='category-more-view-btn'>브랜드 더보기 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="css-jbgpyq e1frj59j0"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></button>
                                        </span>
                                     </div>
                                    </li>
                                    <li>
                                    <a href="!#" className='category-btn'><span>가격</span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                    <div className="sub sub3">
                                        <ul>
                                            <li><label><input type="checkbox" id='sub3Chk01' name='sub3_chk_01' value='과일·견과·쌀'/>과일·견과·쌀</label></li>
                                            <li><label><input type="checkbox" id='sub3Chk02' name='sub3_chk_02' value='국·반찬·메인요리'/>국·반찬·메인요리</label></li>
                                            <li><label><input type="checkbox" id='sub3Chk03' name='sub3_chk_03' value='면·양념·오일'/>면·양념·오일</label></li>
                                            <li><label><input type="checkbox" id='sub3Chk04' name='sub3_chk_04' value='생활용품·리빙·캠핑'/>생활용품·리빙·캠핑</label></li>
                                        </ul>
                                    
                                    </div>
                                    </li>
                                    <li>
                                    <a href="!#" className='category-btn'><span>혜택</span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                    <div className="sub sub4">
                                        <ul>
                                            <li><label><input type="checkbox" id='sub4Chk01' name='sub4_chk_01' value='과일·견과·쌀'/>과일·견과·쌀</label></li>
                                            <li><label><input type="checkbox" id='sub4Chk02' name='sub4_chk_02' value='국·반찬·메인요리'/>국·반찬·메인요리</label></li>
                                        </ul>
                                    </div>
    
                                    </li>
                                    <li>
                                    <a href="!#" className='category-btn'><span>유형</span><svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#999" xmlns="http://www.w3.org/2000/svg" className="arrow-icon"><path d="M5 11L9 7L13 11" stroke="#999" strokeWidth="1.2"></path></svg></a>
                                    <div className="sub sub5">
                                        <ul>
                                            <li><label><input type="checkbox" id='sub5Chk01' name='sub5_chk_01' value='과일·견과·쌀'/>과일·견과·쌀</label></li>
                                            <li><label><input type="checkbox" id='sub5Chk02' name='sub5_chk_02' value='국·반찬·메인요리'/>국·반찬·메인요리</label></li>
                                        </ul>
                                    </div>    
                                    </li>
                                </ul>
                            </form>
                        </div>
                        </div>
                        <div className="right">
                        <div className="right-header">
                            <span>
                                총 181건
                            </span>
                            <span>
                                <a href="!#" className='order-btn' title='추천순'>추천순  <svg width="14" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M6.9932 0.700195C8.73506 0.700195 10.3116 1.40557 11.4528 2.54565C12.5943 3.68594 13.3002 5.26111 13.3002 7.0002C13.3002 8.73928 12.5943 10.3145 11.4528 11.4547C10.3116 12.5948 8.73506 13.3002 6.9932 13.3002C5.25512 13.3002 3.68233 12.595 2.54387 11.4554C1.40457 10.315 0.700195 8.73952 0.700195 7.0002C0.700195 5.26087 1.40457 3.68541 2.54387 2.54497C3.68233 1.40537 5.25512 0.700195 6.9932 0.700195Z" stroke="#ccc" strokeWidth="1.4"></path><path d="M4.5 5.21081H5.77027C5.81351 4.55135 6.26216 4.12973 6.95946 4.12973C7.64054 4.12973 8.09459 4.53514 8.09459 5.0973C8.09459 5.58784 7.90383 5.86944 7.35576 6.22524L7.1973 6.32432C6.45135 6.76216 6.13784 7.24865 6.18649 8.05946L6.19189 8.42703H7.44595V8.11892C7.44595 7.58378 7.64595 7.30811 8.35405 6.89189C9.08919 6.45405 9.5 5.87568 9.5 5.04865C9.5 3.85405 8.51081 3 7.02973 3C5.42432 3 4.54324 3.92973 4.5 5.21081ZM6.87838 11.0054C6.33784 11.0054 5.98108 10.6649 5.98108 10.1459C5.98108 9.62162 6.33784 9.28108 6.87838 9.28108C7.42973 9.28108 7.77568 9.62162 7.77568 10.1459C7.77568 10.6649 7.42973 11.0054 6.87838 11.0054Z" fill="#ccc"></path></svg></a>
                                <a href="!#" className='order-btn on' title='신상품순'>신상품순</a>
                                <a href="!#" className='order-btn' title='판매량순'>판매량순</a>
                                <a href="!#" className='order-btn' title='혜택순'>혜택순</a>
                                <a href="!#" className='order-btn' title='낮은가격순'>낮은가격순</a>
                                <a href="!#" className='order-btn' title='높은가격순'>높은가격순</a>
                            </span>
                        </div>
                        <div className="right-content">
                                
                            {/* <!-- AJAX API --> */}
                            {/* 가상태그를 만들고 프롭스를 전달하고 바인딩이 된다. */}
                            {/* 신상품 컴포넌트 */}
                            <ul className='new-product'>
                                {
                                    state.map((item, idx)=>{
                                        return(
                                            <li key={idx}>
                                                <div className="col-gap">
                                                    <div className="img-box">
                                                        <img src={`./img/sub1/${item.상품이미지}`} alt=""/>
                                                        <span><img src={`./img/sub1/${item.카트아이콘}`} alt=""/></span>
                                                    </div>
                                                    <div className="txt-box">
                                                        <h2>[{item.제조사}] {item.상품명}</h2>
                                                        <h5>{item.상품정보}</h5>

                                                        <h3>
                                                            {
                                                                item.할인율 > 0 ? <strong>{Math.round(item.할인율*100)}%</strong> : ``
                                                            }       
                                                            <em>{commaFormat(Math.round(item.정가*(1-item.할인율)))}원</em>
                                                        </h3>

                                                        { item.할인율 > 0 ? <h4><s>{commaFormat(item.정가)}원</s></h4>:``   }
                                                        <h5>후기<span>151</span></h5>
                                                        { item.판매처!=='' ? <h4>{item.판매처}</h4>:``}
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>     
                                
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
    
        </main>
    );
};

export default Sub1Component;