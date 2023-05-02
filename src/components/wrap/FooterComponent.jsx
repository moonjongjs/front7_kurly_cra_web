import React from 'react';

function FooterComponent() {
    return (
        <footer id="footer">
            <div className="row1">
                <div className="container">
                    <div className="row1-1">
                        <div className="left">
                            <h1>고객행복센터</h1>
                            <h2><a href="tel:1644-1107">1644-1107</a><em>월~토요일 오전 7시 - 오후 6시</em></h2>
                            <ul>
                                <li>
                                    <a href="!#">카카오톡문의</a>
                                    <span>
                                            월~토요일 오전 7시 - 오후 6시<br/>
                                            일~공휴일 오전 7시 - 오후 1시
                                    </span>
                                </li>
                                <li>
                                    <a href="!#">1:1문의</a>
                                    <span>
                                            월~토요일 오전 7시 - 오후 6시<br/>
                                            일~공휴일 오전 7시 - 오후 1시
                                    </span>
                                </li>
                                <li>
                                    <a href="!#">대량주문문의</a>
                                    <span>
                                            월~토요일 오전 7시 - 오후 6시<br/>
                                            일~공휴일 오전 7시 - 오후 1시
                                    </span>
                                </li>
                            </ul>   
                            <div>
                                비회원 문의 : <a href="mailto:help@kurlycorp.com">help@kurlycorp.com</a><br/>
                                비회원 대량주문 문의 : <a href="mailto:kurlygift@kurlycorp.com">kurlygift@kurlycorp.com</a>
                            </div>                     
                        </div>
                        <div className="right">
                            <p>
                                <a href="!#" title="컬리소개">컬리소개</a>
                                <a href="!#" title="컬리소개영상">컬리소개영상</a>
                                <a href="!#" title="인재채용">인재채용</a>
                                <a href="!#" title="이용약관">이용약관</a>
                                <a href="!#" title="개인정보처리방침">개인정보처리방침</a>
                                <a href="!#" title="이용안내">이용안내</a>
                            </p>
        
                            <div>
                                <address>
                                    법인명 (상호) : 주식회사 컬리 <i>|</i> 사업자등록번호 : 261-81-23567<a href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2618123567&apv_perm_no=">사업자정보 확인</a><br/>
                                    통신판매업 : 제 2018-서울강남-01646 호 <i>|</i>  개인정보보호책임자 : 이원준<br/>
                                    주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동)  <i>|</i>  대표이사 : 김슬아<br/>
                                    입점문의 : <a href="mailto:moonseonjong@naver.com">입점문의하기</a> <i>|</i> 제휴문의 : <a href="mailto:moonseonjong@naver.com">moonseonjong@naver.com</a><br/>
                                    채용문의 : <a href="mailto:moonseonjong@naver.com">recruit@kurlycorp.com</a><br/>
                                    팩스: 070 - 7500 - 6098
                                </address>                            
                            </div>
        
                            <span>
                                <a href="!#" title="instagram"><img src="<?=$root_path?>img/ico_instagram.png" alt=""/></a>
                                <a href="!#" title="facebook"><img src="<?=$root_path?>img/ico_fb.png" alt=""/></a>
                                <a href="!#" title="blog"><img src="<?=$root_path?>img/ico_blog.png" alt=""/></a>
                                <a href="!#" title="naverpost"><img src="<?=$root_path?>img/ico_naverpost.png" alt=""/></a>
                                <a href="!#" title="youtube"><img src="<?=$root_path?>img/ico_youtube.png" alt=""/></a>
                            </span>
                        </div>
                    </div>
                    <div className="row1-2">
                        <a href="!#">
                            <img src="<?=$root_path?>img/logo_isms.svg" alt=""/>
                            <span>
                                [인증범위] 컬리 쇼핑몰 서비스 개발·운영<br/>
                                (심사받지 않은 물리적 인프라 제외)<br/>
                                [유효기간] 2022.01.19 ~ 2025.01.18
                            </span>
                        </a>
                        <a href="!#">
                            <img src="<?=$root_path?>img/logo_privacy.svg" alt=""/>
                            <span>
                                [인증범위] 컬리 쇼핑몰 서비스 개발·운영<br/>
                                (심사받지 않은 물리적 인프라 제외)<br/>
                                [유효기간] 2022.01.19 ~ 2025.01.18
                            </span>
                        </a>
                        <a href="!#">
                            <img src="<?=$root_path?>img/logo_tosspayments.svg" alt=""/>
                            <span>
                                [인증범위] 컬리 쇼핑몰 서비스 개발·운영<br/>
                                (심사받지 않은 물리적 인프라 제외)<br/>
                                [유효기간] 2022.01.19 ~ 2025.01.18
                            </span>
                        </a>
                        <a href="!#">
                            <img src="<?=$root_path?>img/logo_wooriBank.svg" alt=""/>
                            <span>
                                [인증범위] 컬리 쇼핑몰 서비스 개발·운영<br/>
                                (심사받지 않은 물리적 인프라 제외)<br/>
                                [유효기간] 2022.01.19 ~ 2025.01.18
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="row2">
                <div className="container">
                    <strong>
                        컬리에서 판매되는 상품 중에는 컬리에 입점한 개별 판매자가 판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.<br/>
                        마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서 통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불 등 의무와 책임을 부담하지 않습니다.
                    </strong>
                    <em>© KURLY CORP. ALL RIGHTS RESERVED</em>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;