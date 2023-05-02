import React from 'react';
import NoticeBoardComponentChild from './NoticeBoardComponentChild';
import axios from 'axios';


function NoticeBoardComponent() {

    const [state, setState] = React.useState({
        공지사항: []
    });


    React.useEffect(()=>{
        axios({
            url:'./data/notice.json',
            method: 'GET'
        })
        .then((res)=>{
            console.log(res.data);
            if( res.status===200){
                setState({
                    ...state,
                    공지사항: res.data.공지사항
                })
            }
        })
        .catch((err)=>{
            console.log('AXIOS 실패!',err);
        });
    },[]);


    return (
        <main id='sub' className='notice'>
            <section id="section">
                <div className="container">
                    <div className="left">
                        <h2>고객센터</h2>
                        <ul>
                            <li><a href="!#" className='on'>공지사항</a></li>
                            <li><a href="!#">자주하는질문</a></li>
                            <li><a href="!#">1:1문의</a></li>
                            <li><a href="!#">대량주문문의</a></li>
                        </ul>
                        <div>
                            <p><a href="!#">도움이 필요하신가요?</a></p>
                            <p><a href="!#">1:1문의하기</a></p>
                        </div>
                    </div>
                    <div className="right">
                        <h3><strong>공지사항</strong><em>컬리의 새로운 소식들과 유용한 정보들을 한곳에서 확인하세요.</em></h3>
                        <div>
                            <h4>번호</h4>
                            <h4>제목</h4>
                            <h4>작성자</h4>
                            <h4>작성일</h4>
                        </div>

                        <NoticeBoardComponentChild 공지사항={state.공지사항} />    
                       
                    </div>
                </div>
            </section>
    
        </main>
    );
};

export default NoticeBoardComponent;