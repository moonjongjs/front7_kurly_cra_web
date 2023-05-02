import React from 'react';
import axios from 'axios';

function SingnInPwSearchComponent() {

    const [state, setState] = React.useState({
        isIdSearchHp: true,
        isIdSearchEmail: false,
        아이디:'',
        휴대폰:'',
        이메일:'',
        isAuthentiHp: false,
        isAuthentiEmail: false,
    });



    // 아이디 온체인지
    const onChangeId=(e)=>{
        let isAuthentiHp = false;
        if(e.target.value.length>=1 && state.휴대폰.length >=10 ){
                isAuthentiHp = true;
        }    
        else{
                isAuthentiHp = false;
        }
        setState({
                ...state,
                isAuthentiHp: isAuthentiHp,
                아이디: e.target.value
        })
    }


    // 휴대폰 혼체인지
    const onChangeHp=(e)=>{
        let isAuthentiHp = false;
        if(e.target.value.length>=10 && state.아이디.length >=1 ){
                isAuthentiHp = true;
        }    
        else{
                isAuthentiHp = false;
        }
        setState({
                ...state,
                isAuthentiHp: isAuthentiHp,
                휴대폰: e.target.value
        })
    }





 

     // 비밀번호 찾기 버튼 클릭 이벤트
    const onClickPwSearchBtn=(e)=>{
        e.preventDefault();

        let FormData1 = new FormData();
        FormData1.append("user_id",  state.아이디);
        FormData1.append("user_hp",  state.휴대폰);

        axios({
            url:'https://moonjong.co.kr/cra_cors7/cors_member_pw_select_hp.php',
            method:'POST',
            data: FormData1
        })
        .then((res)=>{
            console.log( res.data );
             if( res.data!=='데이터가 없습니다.'){
                
                // 세션스토레이지 저장 아이디
                let key ='KURLY_ID_SEARCH';
                const data = {
                    아이디: res.data[0].아이디
                }
                sessionStorage.setItem(key, JSON.stringify(data));
                window.location.pathname = '/비밀번호찾기결과';
            }
            else{
                console.log('찾는 아이디가 없습니다. 회원가입하세요')
            }

        })
        .catch((err)=>{
            console.log("AXIOS 실패!", err);
        });
    }






    // 탭버튼 

    const onClickTabHpbtn=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isIdSearchHp: true,
            isIdSearchEmail: false,
            아이디:'',
            휴대폰:'',
            이메일:'',
            isAuthentiHp: false,
            isAuthentiEmail: false,
        })
    }



    ////////////////////////////////////////////////////////////////////////////////




    const onClickTabEmailbtn=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isIdSearchHp: false,
            isIdSearchEmail: true,
            아이디:'',
            휴대폰:'',
            이메일:'',
            isAuthentiHp: false,
            isAuthentiEmail: false,
        })
    }



    const onChangeIdEmail=(e)=>{
        let isAuthentiEmail = false;
        if(e.target.value.length>=1 && state.이메일.length>=1){
            isAuthentiEmail = true;
        }
        else{
            isAuthentiEmail = false;
        }
        setState({
            ...state,
            isAuthentiEmail: isAuthentiEmail,
            아이디: e.target.value
        })
    }

    const onChangeEmail=(e)=>{
        let isAuthentiEmail = false;
        if(e.target.value.length>=1 && state.아이디.length>=1){
            isAuthentiEmail = true;
        }
        else{
            isAuthentiEmail = false;
        }
        setState({
            ...state,
            isAuthentiEmail: isAuthentiEmail,
            이메일: e.target.value
        })
    }



    const onClickPwEmailBtn=(e)=>{
        e.preventDefault();

          
        let FormData1 = new FormData();
        FormData1.append("user_id",  state.아이디);
        FormData1.append("user_email",  state.이메일);

        axios({
            url:'https://moonjong.co.kr/cra_cors7/cors_member_pw_select_email.php',
            method:'POST',
            data: FormData1
        })
        .then((res)=>{

             if( res.data!=='데이터가 없습니다.'){
                
                // 세션스토레이지 저장 아이디
                let key ='KURLY_ID_SEARCH';
                const data = {
                    아이디: res.data[0].아이디
                }
                sessionStorage.setItem(key, JSON.stringify(data));
                window.location.pathname = '/비밀번호찾기결과';
            }
            else{
                console.log('찾는 아이디가 없습니다. 회원가입하세요')
            }

        })
        .catch((err)=>{
            console.log("AXIOS 실패!", err);
        });

    }



    return (
        <main id='sub' className='signin-id-pw-search'>
        
           <section id="singnInIdPwSearch">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>비밀번호 찾기</h2>
                        </div>
                        <div className="content">
                            <div className='tab-menu-box'>
                                <button onClick={onClickTabHpbtn}  className={state.isIdSearchHp?'on':''}>휴대폰 인증</button>
                                <button onClick={onClickTabEmailbtn} className={state.isIdSearchEmail?'on':''}>이메일 인증</button>
                            </div>
                            <form>
                                {
                                    state.isIdSearchHp && (
                                        <ul>
                                            <li>
                                                <label htmlFor="">아이디</label>
                                                <input 
                                                    type="text"
                                                    name='user_name' 
                                                    placeholder='아이디를 입력해주세요'
                                                    onChange={onChangeId}
                                                    value={state.아이디}
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
                                                <button onClick={onClickPwSearchBtn} type='submit' className={state.isAuthentiHp===true?'on':''}>인증번호 받기</button>
                                            </li>
                                        </ul>
                                    )
                                }

                                {
                                    state.isIdSearchEmail && (
                                        <ul>
                                            <li>
                                                <label htmlFor="">아이디</label>
                                                <input 
                                                    type="text" 
                                                    name='user_name' 
                                                    placeholder='아이디를 입력해주세요'
                                                    onChange={onChangeIdEmail}
                                                    value={state.아이디}
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
                                                <button onClick={onClickPwEmailBtn}  type='submit' className={state.isAuthentiEmail?'on':''}>확인</button>
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

export default SingnInPwSearchComponent;