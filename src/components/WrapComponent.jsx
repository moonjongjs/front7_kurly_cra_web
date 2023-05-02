import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import TopModalComponent from './wrap/TopModalComponent.jsx';
import HeaderComponent from './wrap/HeaderComponent.jsx';
import MainComponent from './wrap/MainComponent.jsx';
import FooterComponent from './wrap/FooterComponent.jsx';
import QuickMenuComponent from './wrap/QuickMenuComponent.jsx';
import GoTopComponent from './wrap/GoTopComponent.jsx';
import Sub1Component from './wrap/sub_page/Sub1Component.jsx';
import Sub2Component from './wrap/sub_page/Sub2Component.jsx';
import Sub3Component from './wrap/sub_page/Sub3Component.jsx';
import Sub4Component from './wrap/sub_page/Sub4Component.jsx';
import SingnUpComponent from './wrap/sub_page/SingnUpComponent.jsx';
import SingnInComponent from './wrap/sub_page/SingnInComponent.jsx';
import SingnInIdSearchComponent from './wrap/sub_page/SingnInIdSearchComponent.jsx';
import SingnInPwSearchComponent from './wrap/sub_page/SingnInPwSearchComponent.jsx';
import SignInIdResultComponent from './wrap/sub_page/SignInIdResultComponent.jsx';
import SignInPwResultComponent from './wrap/sub_page/SignInPwResultComponent.jsx';
import NoticeBoardComponent from './wrap/sub_page/NoticeBoardComponent.jsx';
import NoticeBoardComponentChild from './wrap/sub_page/NoticeBoardComponentChild.jsx';


function WrapComponent(){




    // 타이머 카운트 상태관리
    // 초변수, 분변수, 메모리관리변수, 메시지변수
    const [state,setState] = React.useState({
        seconds: 59,
        minutes: 2,
        setId : 0,
        timerMsg:'',
        timerEnd: false,
        // 모달상태관리
        isModal: true
    });

    const [login, setLogin] = React.useState({
        name: '', // 로그인 이름,
        key: ''
    })

    // 로그인 이름
    const signinName=(name, key)=>{
        setLogin({
            name: name,
            key: key
        })
    }
    const logout=()=>{
        setLogin({
            name: "",
            key: ""
        })
    }

    const loginState=()=>{
        
        try{    
            let cookies = document.cookie.split(';');
            cookies = cookies.map((item) => item.split('=')[0].trim() );

            for(let i=0; i<localStorage.length; i++){
                const result = localStorage.key(i).split('_');
                if(result[0]==='MJ' && cookies.includes(localStorage.key(i))===true ){
                    const loginData = JSON.parse(localStorage.getItem( localStorage.key(i) ));
                    signinName(loginData.name, localStorage.key(i));
                    return;
                }
                else if(result[0]==='MJ' && cookies.includes(localStorage.key(i))===false ){
                    localStorage.removeItem(localStorage.key(i));                
                }                      
            }         
        }
        catch(e){
            console.log( e );
        }
    }

    React.useEffect(()=>{
        loginState();
    },[state.name]);


    // 타이머 카운터 함수
    const timerCounterFn=()=>{
        // 임시변수
        let seconds= 59;
        let minutes= 2;
        let setId = 0;
        let timerMsg = '';
        let timerEnd = false;
        
        setId = setInterval(function(){
            
            seconds--;  //1초에 1씩 감소하는 카운트
            if( seconds < 0){  // 60초 분
                minutes--;
                seconds=59;
                if(minutes<0){ //3분 카운터 끝
                    seconds = 0;
                    minutes = 0;
                    clearInterval(setId);
                    timerMsg ="유효시간이 경과되었습니다.";
                    timerEnd = true
                }
            }


            setState({
                ...state,
                seconds: seconds,
                minutes: minutes,
                timerMsg: timerMsg,
                timerEnd: timerEnd,
                setId: setId
            });

        }, 1000);
    }


    // 모달창 닫기 이벤트 함수
    const modalClose=()=>{
        setState({
            ...state,
            isModal: false
        });
    }

    // 쿠키 가져오기 그리고 해당 모달창 
    // 쿠키이름이 있으면 열리지 않음
    // 만약 해당 쿠키이름이 없다면 모달창 열림
    // 홈페이지 열릴때 새로고침시 
    // 수시로 쿠키이름 검색 한다.
    const getCokie=()=>{
        //1. 쿠키가져오기
        if(document.cookie==='') return;  //쿠키없으면 강제종료
        const result = document.cookie.split(';');  // 구분기호(;) 단위로 배열처리 나눈다.
        //document.cookie = `TOPMODAL=kurly_top_modal; path=/; expires=${newDate.toUTCString()};`;
        // 배열로 저장된다.
        let arr = [];
        result.map((item, idx)=>{
            arr[idx] = {
                쿠키이름 : item.split('=')[0].trim(),
                쿠키값 : item.split('=')[1].trim()
            }
        });
        

        // arr 배열에 있는 쿠키이름 비교
        
        arr.map((item)=>{
            if(item.쿠키이름==="TOPMODAL" && item.쿠키값==="kurly_top_modal"){ //쿠키 있다면 모달창 열지 않음
                setState({
                    ...state,
                    isModal: false   
                });
            }
            else { // 쿠키가 없으면 모달창 열기
                setState({
                    ...state,
                    isModal: true
                });
            }
        });

    }


    React.useEffect(()=>{
        getCokie();
    },[state.isModal]);


    return(
        <div id="wrap">

            {
                state.isModal && <TopModalComponent  modalClose={modalClose}/>
            }
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <Routes>
                        <Route path='/' element={<HeaderComponent  login={login} logout={logout} />}>
                            <Route index  element={<MainComponent/>} />
                            <Route path='/메인'     element={<MainComponent/>} />
                            <Route path='/신상품'   element={<Sub1Component/>} />
                            <Route path='/베스트'   element={<Sub2Component/>} />
                            <Route path='/알뜰쇼핑' element={<Sub3Component/>} />
                            <Route path='/특가혜택' element={<Sub4Component/>} />
                            <Route path='/회원가입' element={<SingnUpComponent  timerCounterFn={timerCounterFn}  timer={state}   />} />
                            <Route path='/로그인'   element={<SingnInComponent signinName={signinName}/>} />
                            <Route path='/아이디찾기'   element={<SingnInIdSearchComponent/>} />
                            <Route path='/비밀번호찾기'   element={<SingnInPwSearchComponent/>} />
                            <Route path='/아이디찾기결과'   element={<SignInIdResultComponent/>} />
                            <Route path='/비밀번호찾기결과'   element={<SignInPwResultComponent/>} />
                            <Route path='/공지사항' element={<NoticeBoardComponent/>} />
                        </Route>
                    </Routes>
                </BrowserRouter>


            <FooterComponent/>
            <QuickMenuComponent/>
            <GoTopComponent/>
        </div>
    )
}
export default WrapComponent;
