import React from 'react';
import axios from 'axios';


function SingnInIdSearchComponent() {

    const [state, setState] = React.useState({
        isIdSearchHpTab: true,
        isIdSearchEmailTab: false,
        isIdsearchHp: false,
        isIdsearchEmail: false,
        이름: '',
        휴대폰: '',
        이메일: ''
    });

    const onChangeName=(e)=>{
        let isIdsearchHp= false;
        let isIdsearchEmail= false;
        if(e.target.value.length >= 1 &&  state.휴대폰.length >= 10){
            isIdsearchHp = true;
            isIdsearchEmail = false;
        }
        else if(e.target.value.length >= 1 &&  state.이메일.length >= 1){
            isIdsearchEmail = true;
            isIdsearchHp = false;
        }
        else{
            isIdsearchHp = false;
            isIdsearchEmail = false;
        }
        setState({
            ...state,
            이름: e.target.value,
            isIdsearchHp: isIdsearchHp,
            isIdsearchEmail: isIdsearchEmail
        })
    }


    const onChangeHp=(e)=>{
        let isIdsearchHp= false;
        if(e.target.value.length >= 10 &&  state.이름.length >= 1){
            isIdsearchHp = true;
        }
        else{
            isIdsearchHp = false;
        }
        setState({
            ...state,
            휴대폰: e.target.value,
            isIdsearchHp: isIdsearchHp
        })
    }


    const onChangeEmail=(e)=>{
        let isIdsearchEmail= false;
        if(e.target.value.length >= 1 &&  state.이름.length >= 1){
            isIdsearchEmail = true;
        }
        else{
            isIdsearchEmail = false;
        }
        setState({
            ...state,
            이메일: e.target.value,
            isIdsearchEmail: isIdsearchEmail
        })
    }





    const onClickTabHpbtn=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isIdSearchHpTab: true,
            isIdSearchEmailTab: false,
            isIdsearchHp: false,
            isIdsearchEmail: false,
            이름: '',
            휴대폰: '',
            이메일: ''

        })
    }
    const onClickTabEmailbtn=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isIdSearchHpTab: false,
            isIdSearchEmailTab: true,
            isIdsearchHp: false,
            isIdsearchEmail: false,
            이름: '',
            휴대폰: '',
            이메일: ''
        })
    }

    // eslint-disable-next-line no-use-before-define
    let FormData1 = new FormData();
    FormData1.append("user_irum",  state.이름);
    FormData1.append("user_hp",  state.휴대폰);


    // 아이디 찾기 : 휴대폰검색
    const onClickIdHpSearch=(e)=>{
        e.preventDefault();
        axios({
            url: "https://moonjong.co.kr/cra_cors7/cors_member_id_select_hp.php",
            method: "POST",
            data: FormData1
        })
        .then((res)=>{
            console.log( res.data );

            if( res.data!=='데이터가 없습니다.'){
                
                // 세션스토레이지 저장 아이디
                let key ='KURLY_ID_SEARCH';
                const data = {
                    아이디: res.data[0].아이디,
                    가입일: res.data[0].가입일
                }
                sessionStorage.setItem(key, JSON.stringify(data));
                window.location.pathname = '/아이디찾기결과';
            }
            else{
                console.log('찾는 아이디가 없습니다. 회원가입하세요')
            }

        })
        .catch((err)=>{
            console.log("axios 실패 " + err );
        });
    }



    let FormData2 = new FormData();
    FormData2.append("user_irum",  state.이름);
    FormData2.append("user_email",  state.이메일);

    // 아이디 찾기 : 이메일검색
    const onClickIdEmailSearch=(e)=>{
        e.preventDefault();
        axios({
            url: "https://moonjong.co.kr/cra_cors7/cors_member_id_select_email.php",
            method: "POST",
            data: FormData2
        })
        .then((res)=>{
            // 아이디 찾기 성공하면 화면이동
            if( res.data!=='데이터가 없습니다.'){
                
                // 세션스토레이지 저장 아이디
                let key ='KURLY_ID_SEARCH';
                const data = {
                    아이디: res.data[0].아이디,
                    가입일: res.data[0].가입일
                }
                sessionStorage.setItem(key, JSON.stringify(data));
                window.location.pathname = '/아이디찾기결과';
            }
            else{
                console.log('찾는 아이디가 없습니다. 회원가입하세요')
            }

        })
        .catch((err)=>{
            console.log("axios 실패 " + err );
        });
    }




    return (
        <main id='sub' className='signin-id-pw-search'>
        
           <section id="singnInIdPwSearch">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>아이디 찾기</h2>
                        </div>
                        <div className="content">
                            <div className='tab-menu-box'>
                                <button onClick={onClickTabHpbtn}  className={state.isIdSearchHp?'on':''}>휴대폰 인증</button>
                                <button onClick={onClickTabEmailbtn} className={state.isIdSearchEmail?'on':''}>이메일 인증</button>
                            </div>
                            <form name='id_search' id='idSearch' method='post' action="./sigin_id_search.php">
                                {
                                    state.isIdSearchHpTab && (
                                        <ul>
                                            <li>
                                                <label htmlFor="">이름</label>
                                                <input 
                                                    type="text" 
                                                    name='user_name' 
                                                    placeholder='이름을 입력해주세요'
                                                    onChange={onChangeName}
                                                    value={state.이름}
                                                />
                                            </li>
                                            <li>
                                                <label htmlFor="">휴대폰 번호</label>
                                                <input 
                                                    type="text" 
                                                    name='user_pw' 
                                                    placeholder='휴대폰 번호를 입력해주세요'
                                                    onChange={onChangeHp}
                                                    value={state.휴대폰}
                                                />
                                            </li>
                                            
                                            <li>
                                                <button onClick={onClickIdHpSearch} className={state.isIdsearchHp?'on':''} disabled={!state.isIdsearchHp} type='submit'>인증번호 받기</button>
                                            </li>
                                        </ul>
                                    )
                                }

                                {
                                    state.isIdSearchEmailTab && (
                                        <ul>
                                            <li>
                                                <label htmlFor="">이름</label>
                                                <input 
                                                    type="text" 
                                                    name='user_name' 
                                                    placeholder='이름을 입력해주세요'
                                                    onChange={onChangeName}
                                                    value={state.이름}
                                                />
                                            </li>
                                            <li>
                                                <label htmlFor="">이메일</label>
                                                <input 
                                                    type="text" 
                                                    name='user_pw' 
                                                    placeholder='이메일을 입력해주세요'
                                                    onChange={onChangeEmail}
                                                    value={state.이메일}
                                                />
                                            </li>
                                            
                                            <li>
                                                <button onClick={onClickIdEmailSearch} className={state.isIdsearchEmail?'on':''} disabled={!state.isIdsearchEmail}  type='submit'>확인</button>
                                            </li>
                                        </ul>
                                    )
                                }
                            </form>                            
                        </div>
                    </div>
                </div>
           </section>
           
    
        </main>
    );
};

export default SingnInIdSearchComponent;