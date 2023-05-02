import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function SignInIdResultComponent() {

    const [state, setState] = React.useState({
        아이디:'',
        pw1:'',
        pw2:''
    });


    const onChangePw1=(e)=>{
        setState({
            ...state,
            pw1: e.target.value
        });
    }

    const onChangePw2=(e)=>{
        setState({
            ...state,
            pw2: e.target.value
        });
    }


  
    React.useEffect(()=>{
        let key ='KURLY_ID_SEARCH';
        if(sessionStorage.getItem(key)!==null){
           const result = JSON.parse(sessionStorage.getItem(key));
           setState({
                ...state,
                아이디: result.아이디               
            })
        }
    },[state.아이디])


   const onClickSubmit=(e)=>{

        e.preventDefault();
        
        let FormData1 = new FormData();
        FormData1.append("user_id",  state.아이디);
        FormData1.append("user_pw",  state.pw1);
        
        
        axios({
            url:'https://moonjong.co.kr/cra_cors7/cors_member_pw_update.php',
            method:'POST',
            data: FormData1
        })
        .then((res)=>{
            if( Number(res.data)===1){
                
                window.location.pathname = '/로그인';
            }
            else{
                console.log('비밀번호 다시 입력하세요')
            }

        })
        .catch((err)=>{
            console.log("AXIOS 실패!", err);
        });
   }

    return (
        <div id="singnInIdResult" className='pwreset'>
            <section id="singnIn">
                <div className="container">
                    <div className="gap">
                        <div className="title">
                            <h2>비밀번호 재설정</h2>                            
                        </div>
                        <div className="content">
                            <ul>
                                <li>
                                    <label htmlFor="pw1">새 비밀번호등록</label>
                                    <input 
                                        type="password" 
                                        name='pw1' 
                                        id='pw1' 
                                        placeholder='새 비밀번호를 입력해주세요' 
                                        onChange={onChangePw1}
                                        value={state.pw1}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="pw1">새 비밀번호확인</label>
                                    <input 
                                        type="password" 
                                        name='pw2' 
                                        id='pw2' 
                                        placeholder='새 비밀번호를 한번더 입력해주세요'
                                        onChange={onChangePw2}
                                        value={state.pw2}
                                     />
                                </li>
                                <li>                                    
                                    <button onClick={onClickSubmit} type='submit'>확인</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
           </section>           
        </div>
    );
};
