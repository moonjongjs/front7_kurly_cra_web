import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';



function SingnInComponent({signinName}) {

    const [state, setState] = React.useState({
        id: '',
        pw: ''
    })

    const onChangeId=(e)=>{
        setState({
            ...state,
            id: e.target.value
        })
    }
    const onChangePw=(e)=>{
        setState({
            ...state,
            pw: e.target.value
        })
    }

    const onClickSignInSubmit=(e)=>{
        e.preventDefault();
        if(state.id==='' || state.pw===''){
            alert('아이디 또는 비밀번호를 입력해 주세요.');
        }
        else {

            // AXIOS
            const formData = new FormData();
            formData.append('user_id', state.id);                
            formData.append('user_pw', state.pw);                

            axios({
                url:'https://moonjong.co.kr/cra_cors7/singn_in_session_cookie.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{

                if(res.status===200){
                    // 키 key
                    const key = `MJ_${res.data[0].아이디}`;

                    signinName(res.data[0].이름); 
                    
                    let 아이디 = res.data[0].아이디;
                    let 세션아이디 = res.data[0].세션아이디;
                    
                    // 세션 스토레이지
                    const loginObj = {
                        id: 아이디,
                        sessionId: 세션아이디,
                        name: res.data[0].이름
                    }
                    localStorage.setItem(key, JSON.stringify(loginObj));

                    // 쿠키 설정 3일간
                    let newDate = new Date();
                    newDate.setDate(newDate.getDate()+3);
                    document.cookie = `${key}=${세션아이디}; path=/; expires=${newDate.toUTCString()};`;

                    // 초기화
                    setState({
                        ...state,
                        id:'',
                        pw:''
                    });

                    window.location.href = '/메인';

                }

            })
            .catch((err)=>{
                console.log('AXIOS 실패!', err );
            });

        }
    }






    return (
        <main id='sub' className='sign-in'>
        
           <section id="singnIn">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>로그인</h2>
                        </div>
                        <div className="content">
                            <ul>
                                <li>
                                    <input  
                                        type="text" 
                                        name='user_id' 
                                        placeholder='아이디를 입력해주세요'
                                        onChange={onChangeId}
                                        value={state.id}
                                    />
                                </li>
                                <li>
                                    <input 
                                        type="password" 
                                        name='user_id' 
                                        placeholder='비밀번호를 입력해주세요'
                                        onChange={onChangePw}
                                        value={state.pw}
                                    />
                                </li>
                                <li>
                                    <span>
                                        <Link to="/아이디찾기" title='아이디찾기'>아이디 찾기</Link>
                                        <i>|</i>
                                        <Link to="/비밀번호찾기">비밀번호 찾기</Link>
                                    </span>
                                </li>
                                <li>
                                    <button onClick={onClickSignInSubmit} type='submit'>로그인</button>
                                </li>
                                <li>
                                    <Link to="/회원가입">회원가입</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
           </section>
           
    
        </main>
    );
};

export default SingnInComponent;