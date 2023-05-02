import React from 'react';
import $ from 'jquery';


function Section1Component() {

    React.useEffect(()=>{

                        
            //  섹션1 메인슬라이드 ///////////////////////////
            // 터치 스와이프 : 마우스 이벤트
            let touchStart = null;
            let touchEnd = null;

            // 드래그 앤드 드롭(잡고끌고 그리고 놓기)
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;  //처음부터 초기값 설정
            let winW = $(window).innerWidth();


            let setId = 0;
            let cnt = 0;
            let total = $('#section1 .slide').length-2; // 슬라이드 길이(전체갯수)-2   / 14 = 16-2
            $('#section1 .total-number').html( total ); // 슬라이드 전체 카운트 번호
            $('#section1 .slide-next-btn').fadeOut(0); // 초기 화면 숨김
            $('#section1 .slide-prev-btn').fadeOut(0); // 초기 화면 숨김

            mainSlide();  // 로딩시 실행

            //1. 메인슬라이드함수 : 마직막에서 처음으로 롤링되는 슬라이드
            function mainSlide(){
                // ES5(ECMA Script 5)
                // $('.slide-wrap').stop().animate({left:-100*cnt+'%'},600, function(){
                // ES6(ECMA Script 6)
                $('#section1 .slide-wrap').stop().animate({left:`${-100*cnt}%`},600, function(){
                    if(cnt>=total) cnt=0; //14이상이면 처음으로 순간이동
                    if(cnt<0) cnt=total-1;  //0보다 작으면 마지막으로 순간이동
                    $('#section1 .slide-wrap').animate({left:`${-100*cnt}%`},0);
                });
                // 현재슬라이드 번호
                // 3항 연산자 : 다음시간에 공부
                $('#section1 .current-number').html( cnt+1===total+1 ? 1 : (cnt+1===0 ? total: cnt+1)  );
            }

            //2-1. 다음카운트함수
            function nextCount(){
                cnt++; //cnt=cnt+1
                mainSlide();
            }
            //2-2. 이전카운트함수
            function prevCount(){
                cnt--; //cnt=cnt-1
                mainSlide();
            }

            //3. 자동타이머함수
            function autoTimer(){
                clearInterval(setId);
                setId = setInterval(nextCount,3000);
                sessionStorage.setItem('SETID', setId); 
            }
            autoTimer();

            //4. 메인슬라이드 컨테이넌박스에 마우스 올리면(mouseover ==  mouseenter) 슬라이드 정지
            $('#section1 .slide-container').on({
                mouseenter:function(){
                    clearInterval(setId);
                    $('#section1 .slide-next-btn').stop().fadeIn(1000); //서서히 사라진다.
                    $('#section1 .slide-prev-btn').stop().fadeIn(1000); //서서히 사라진다. 
                }
            });


            //5. 메인슬라이드 컨테이넌박스에 마우스 떠나면(mouseout == mouseleave) 슬라이드 플레이
            $('#section1 .slide-container').on({
                mouseleave: function(){
                    $('#section1 .slide-next-btn').stop().fadeOut(1000); //서서히 사라진다.
                    $('#section1 .slide-prev-btn').stop().fadeOut(1000); //서서히 사라진다.
                    autoTimer();
                }
            })


            //6. 다음슬라이드 : 다음화살버튼 클릭 이벤트
            //   슬라이드 애니메이션이 진행될 때는 클릭을 못하게 막는다
            $('#section1 .slide-next-btn').on({
                click: function(e){
                    e.preventDefault();
                    if( $('#section1 .slide-wrap').is(':animated')===false ){ // 애니메이션 진행이 아닐 때 다음 슬라이드 호출 실행
                        nextCount();
                    }  
                }
            });


            //7. 이전슬라이드 : 이전화살버튼 클릭 이벤트
            //   슬라이드 애니메이션이 진행될 때는 클릭을 못하게 막는다
            $('#section1 .slide-prev-btn').on({
                click: function(e){
                    e.preventDefault();
                    if( !$('#section1 .slide-wrap').is(':animated') ){    // 애니메이션 진행이 아닐 때 다음 슬라이드 호출 실행
                        prevCount();
                    }   
                }
            });


            // 데스크탑(마우스이벤트)
            // 터치스와이프 
            // 드래그 앤 드롭
            $('#section1 .slide-container').on({
                mousedown: function(e){
                    winW = $(window).innerWidth();
                    touchStart =  e.clientX;     
                    //  슬라이드박스 왼쪽 위치를 리얼하게 값을 계속 구한다.               
                    dragStart  =  e.clientX - $('#section1 .slide-wrap').offset().left-winW;   
                    mouseDown = true; // 마우스 다운 드래그 시작 
                },
                mouseup: function(e){
                    touchEnd = e.clientX;
                    // console.log('터치시작-터치끝 ', touchStart-touchEnd );  // 터치끝 수평 좌표

                    // 방향 결정 양수이면 다음 / 음수이면 이전
                    if(touchStart-touchEnd > 0){ // 양수=>다음슬라이드
                        nextCount();
                    }
                    if(touchStart-touchEnd < 0){ // 음수=>이전슬라이드
                        prevCount();
                    }

                    mouseDown = false;  //드래그 앤드 롭 끝을 알려준다.
                },
                // 마우스가 영역을 떠나면 마우스 업상태를 인식못한다.
                mouseleave: function(e){ // mouseup 상태로 간주
                    if(mouseDown===false) return;
                    touchEnd = e.clientX;
                     // 방향 결정 양수이면 다음 / 음수이면 이전
                     if(touchStart-touchEnd > 0){ // 양수=>다음슬라이드
                        nextCount();
                    }
                    if(touchStart-touchEnd < 0){ // 음수=>이전슬라이드
                        prevCount();
                    }
                    mouseDown = false; 
                },

                mousemove: function(e){  // 마우스를 이동할 때 발생
                    // if(!mouseDown) return; // 마우스 다운상태가 아니면 리턴
                    if(mouseDown===false) return; // 마우스 다운상태가 아니면 리턴
                    dragEnd = e.clientX;
                    // 실제드리고 상태 스타일 애니메이션
                    // 반드시 마우스가 다운상태에서 드래그가 이루어지게한다.
                    $('#section1 .slide-wrap').css({ left: dragEnd-dragStart  })
                }
            });


            // 모바일 반응형(손가락 터치이벤트) : 마우스이벤트 전혀 인식 안된다.
            // 터치스와이프
            // 드래그 앤 드롭
            $('#section1 .slide-container').on({
                touchstart: function(e){ // 손가락 이벤트 터치스타트 <= mousedown 마우스 다운
                    clearInterval(setId);
                    // console.log( 'touchstart' );
                    // console.log( e  );
                    // console.log( e.originalEvent.changedTouches[0].clientX  );

                    winW = $(window).innerWidth();
                    touchStart =  e.originalEvent.changedTouches[0].clientX;     
                    //  슬라이드박스 왼쪽 위치를 리얼하게 값을 계속 구한다.               
                    dragStart  =  e.originalEvent.changedTouches[0].clientX - $('#section1 .slide-wrap').offset().left-winW;   
                    mouseDown = true; // 마우스 다운 드래그 시작 
                },
                touchend: function(e){  // 손가락 이벤트 터치앤드 <= mouseup 마우스 다운
                    
                    // console.log( 'touchend' );

                    touchEnd = e.originalEvent.changedTouches[0].clientX;
                    // console.log('터치시작-터치끝 ', touchStart-touchEnd );  // 터치끝 수평 좌표

                    // 방향 결정 양수이면 다음 / 음수이면 이전
                    if(touchStart-touchEnd > 0){ // 양수=>다음슬라이드
                        nextCount();
                    }
                    if(touchStart-touchEnd < 0){ // 음수=>이전슬라이드
                        prevCount();
                    }

                    mouseDown = false;  //드래그 앤드 롭 끝을 알려준다.
                },                
                touchmove: function(e){  // 손가락 이벤트 터치무브 <= mousemove 마우스 무브

                    // console.log( 'touchmove' );

                    // if(!mouseDown) return; // 마우스 다운상태가 아니면 리턴
                    if(mouseDown===false) return; // 마우스 다운상태가 아니면 리턴
                    dragEnd = e.originalEvent.changedTouches[0].clientX;
                    // 실제드리고 상태 스타일 애니메이션
                    // 반드시 마우스가 다운상태에서 드래그가 이루어지게한다.
                    $('#section1 .slide-wrap').css({ left: dragEnd-dragStart  })
                }
            });

    },[]);


    return (
        <section id="section1">
            <div className="slide-container">
                <div className="slide-view">
                    <ul className="slide-wrap">
                        <li className="slide slide14"><a href="!#"><img src="./img/slide_img_14.jpg" alt=""/></a></li>
                        <li className="slide slide1"><a href="!#"><img src="./img/slide_img_1.jpg" alt=""/></a></li>
                        <li className="slide slide2"><a href="!#"><img src="./img/slide_img_2.jpg" alt=""/></a></li>
                        <li className="slide slide3"><a href="!#"><img src="./img/slide_img_3.jpg" alt=""/></a></li>
                        <li className="slide slide4"><a href="!#"><img src="./img/slide_img_4.jpg" alt=""/></a></li>
                        <li className="slide slide5"><a href="!#"><img src="./img/slide_img_5.jpg" alt=""/></a></li>
                        <li className="slide slide6"><a href="!#"><img src="./img/slide_img_6.jpg" alt=""/></a></li>
                        <li className="slide slide7"><a href="!#"><img src="./img/slide_img_7.jpg" alt=""/></a></li>
                        <li className="slide slide8"><a href="!#"><img src="./img/slide_img_8.jpg" alt=""/></a></li>
                        <li className="slide slide9"><a href="!#"><img src="./img/slide_img_9.jpg" alt=""/></a></li>
                        <li className="slide slide10"><a href="!#"><img src="./img/slide_img_10.jpg" alt=""/></a></li>
                        <li className="slide slide11"><a href="!#"><img src="./img/slide_img_11.jpg" alt=""/></a></li>
                        <li className="slide slide12"><a href="!#"><img src="./img/slide_img_12.jpg" alt=""/></a></li>
                        <li className="slide slide13"><a href="!#"><img src="./img/slide_img_13.jpg" alt=""/></a></li>
                        <li className="slide slide14"><a href="!#"><img src="./img/slide_img_14.jpg" alt=""/></a></li>
                        <li className="slide slide1"><a href="!#"><img src="./img/slide_img_1.jpg" alt=""/></a></li>
                    </ul>
                </div>

                {/* <!-- 좌우화살버튼 --> */}
                <a href="!#" className="slide-next-btn" title="next"><img src="./img/arrow_slide.svg" alt=""/></a>
                <a href="!#" className="slide-prev-btn" title="preview"><img src="./img/arrow_slide.svg" alt=""/></a>

                {/* <!-- 슬라이드 페이지 번호(인디게이터 번호)  --> */}
                <div className="page-count">
                    <span className="current-number"></span>
                    <span>/</span>
                    <span className="total-number"></span>
                </div>

            </div>
        </section>
    );
};

export default Section1Component;