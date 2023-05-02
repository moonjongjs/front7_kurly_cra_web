import React from 'react';
import {Link, Outlet} from 'react-router-dom';

function HeaderComponent({login, logout}){

    const onClickSetIdClear=(e)=>{
        if(sessionStorage.getItem('SETID')!==null){
            const setId = sessionStorage.getItem('SETID');
            clearInterval(setId);
            console.log( setId )
        }
    }
    const onClickLogout=(e)=>{
        try{
            localStorage.removeItem(login.key); // 로컬스토레이지
            logout();  // 상태관리 삭제
            let newDate = new Date();
            newDate.setDate( newDate.getDate()-4 );  // 로그인이 3일 -4
            document.cookie = `${login.key}=; path=/; expires=${newDate.toUTCString()};`;
            window.location.pathname = '/메인';
        }
        catch(e){
            console.log(e);
        }
       
    }
    
    return (
        <>
            <header id="header">
                <div className="header-row1">
                    <div className="container">
                        <aside id="aside">
                            <ul>
                                <li><Link to="/회원가입" onClick={onClickSetIdClear} className="on">{login.name===''?'회원가입':<span onClick={onClickLogout}>로그아웃</span>}</Link></li>
                                <li><i>|</i></li>
                                <li><Link to="/로그인" onClick={onClickSetIdClear}>{login.name===''?'로그인':login.name}</Link></li>
                                <li><i>|</i></li>
                                <li className="custom-center-li">
                                    <Link to="/공지사항" onClick={onClickSetIdClear}  className="custom-center-btn">고객센터<img src="./img/ico_down_16x10.png" alt=""/></Link>
                                    <div className="custom-center">
                                        <ul>
                                            <li><Link to="/공지사항" onClick={onClickSetIdClear} >공지사항</Link></li>
                                            <li><Link to="/자주하는질문" onClick={onClickSetIdClear} >자주하는질문</Link></li>
                                            <li><Link to="/1대1문의" onClick={onClickSetIdClear} >1:1문의</Link></li>
                                            <li><Link to="/대량주문문의" onClick={onClickSetIdClear} >대량주문문의</Link></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </aside>
                    </div>
                </div>
                <div className="header-row2">
                    <div className="container">
                        <div className="left">
            
                            <Link to="/메인" title="홈" onClick={onClickSetIdClear} ><img src="./img/ico_lkurly_logo.svg" alt=""/>마켓컬리</Link>
                            <span><i>|</i></span>
                            <Link to="/뷰티컬리" onClick={onClickSetIdClear} >뷰티컬리<img src="./img/ico_n.svg" alt=""/></Link>
            
                        </div>     
                        <div className="center">
                            <input type="text" id="search" name="search" placeholder="검색어를 입력해주세요"/>
                            <a href="!#" title="search"><img src="./img/ico_zoom.svg" alt=""/></a>
                        </div>     
                        <div className="right">                    
                            <Link to="!#" className="map-btn" onClick={onClickSetIdClear} ><img src="./img/ico_map.svg" alt=""/></Link>
                            <div className="map-tooltip">
                                <p className="text-box">
                                    <span>배송지를 등록</span>하고<br/>
                                    구매 가능한 상품을 확인하세요!
                                </p>
                                <div className="button-box">
                                    <button>로그인</button>
                                    <button><img src="./img/ico_zoom.svg" alt=""/>주소검색</button>
                                </div>
                            </div>
            
                            <Link to="!#" onClick={onClickSetIdClear} ><img src="./img/ico_heart.svg" alt=""/></Link>
                            <Link to="!#" onClick={onClickSetIdClear} ><img src="./img/ico_cart.svg" alt=""/></Link>
                        </div>     
                    </div>            
                </div>
                <div className="header-row3">
                    <div className="container">
                        <div className="left">
                            <Link to="!#" title="카테고리" onClick={onClickSetIdClear} ><img src="./img/ham_bar_black.svg" alt=""/><span>카테고리</span></Link>
                        </div>
                        <div className="center">
                            <nav id="nav">
                                <Link to="/신상품" onClick={onClickSetIdClear} >신상품</Link>
                                <Link to="/베스트" onClick={onClickSetIdClear} >베스트</Link>
                                <Link to="/알뜰쇼핑" onClick={onClickSetIdClear} >알뜰쇼핑</Link>
                                <Link to="/특가혜택" onClick={onClickSetIdClear} >특가혜택</Link>
                            </nav>
                        </div>
                        <div className="right">
                            <Link to="/배송안내" onClick={onClickSetIdClear} ><span>샛별·낮</span>배송안내</Link>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet/>
        </>    
    );
};

export default HeaderComponent;