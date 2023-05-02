import React from "react";


function TopModalComponent({modalClose}){

    const onClickModalClose=(e)=>{
        e.preventDefault();
        modalClose(); // 상위컴포넌트의 모달창 닫기 함수 실행

        // 닫을 때 싯점으로 1일간 열리지 않음.
        // 쿠키설정 날짜 + 1
        let newDate = new Date();  // 날짜생성
        newDate.setDate(newDate.getDate()+1); //오늘날짜+1일 = 내일 이시간
        // 쿠키에 저장하기
        // document.cookie = `쿠키이름=쿠키값; path=/; 만료일=셋팅날짜(국제표준시간설정).toUTCString();`;
        // 모달창 닫기하면 쿠키 설정된다.        
        document.cookie = `TOPMODAL=kurly_top_modal; path=/; expires=${newDate.toUTCString()};`;
    }

    return(
        <div id="topModal">
            <div className="container">
                <h2><a href="!#" title="지금 가입하고 인기상품 100원 에 받아가세요!">지금 가입하고 인기상품 <strong>100원</strong>에 받아가세요!</a></h2>
                <a href="!#" onClick={onClickModalClose}   title="탑모달 닫기" className="top-modal-close-btn"><img src="./img/ico_close_fff_84x84.png" alt=""/></a>
            </div>
        </div>
    )
}
export default TopModalComponent;