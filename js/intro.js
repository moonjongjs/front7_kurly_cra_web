(function($){

    const obj = {
        init: function(){

            // this.section1();
            this.section2(); // 섹션2,7,8 공통 슬라이드
            this.section4();
            this.section5();
            this.section6();
            this.section7(); // 섹션2,7,8 공통 슬라이드
            this.section8(); // 섹션2,7,8 공통 슬라이드            


        },


        section2: function(){

            //  섹션1 메인슬라이드 ///////////////////////////
            // 터치 스와이프 : 마우스 이벤트
            let touchStart = null;
            let touchEnd = null;

            // 드래그 앤드 드롭(잡고끌고 그리고 놓기)
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;  //처음부터 초기값 설정
            let winW = $(window).innerWidth();
            let conW = $('#section2 .slide-container').innerWidth(); // 1068



            // 섹션2 슬라이드
            // 1. 메인슬라이드함수
            let cnt=0;
            let n = $('#section2 .slide').length/4-1; //슬라이드 전체갯수 2 = 8/4(한화면의갯수)


            mainSlide(); //로딩시 실행

            function mainSlide(){
                $('#section2 .slide-wrap').animate({left: `${-100*cnt}%`}, 600);

                // 화살버튼 보이기, 숨기기
                if(cnt>=4){ // 마지막 위치이면
                    $('#section2  .next-btn').fadeOut(300);
                }
                else{ // 마지막이 아니면 버튼 보여라
                    $('#section2  .next-btn').fadeIn(300);
                }

                if(cnt<=0){ // 처음 위치이면 버튼을 숨긴다.
                    $('#section2  .prev-btn').fadeOut(300);
                }
                else{  // 처음 아니면 버튼을 보인다.
                    $('#section2  .prev-btn').fadeIn(300);
                }

            }
            
            // 2-1. 다음카운트함수
            function nextCount(){
                cnt++;   
                if(cnt>n) cnt=n;
                mainSlide();
            }
            // 2-2. 이전카운트함수
            function prevCount(){
                cnt--;          
                if(cnt<0) cnt=0;    
                mainSlide();
            }

            // 3-1. 다음화살버튼클릭이벤트
            $('#section2  .next-btn').on({
                click: function(e){
                    e.preventDefault();
                    nextCount();
                }
            });
            // 3-2. 이전화살버튼클릭이벤트
            $('#section2  .prev-btn').on({
                click: function(e){
                    e.preventDefault();
                    prevCount();                    
                }
            });


            // 터치스와이프 
            // 드래그 앤 드롭
            $('#section2 .slide-container').on({
                mousedown: function(e){
                    winW = $(window).innerWidth();
                    touchStart =  e.clientX;     
                    //  슬라이드박스 왼쪽 위치를 리얼하게 값을 계속 구한다.               
                    dragStart  =  e.clientX - $('#section2 .slide-wrap').offset().left+((winW-conW)/2);   
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
                    $('#section2 .slide-wrap').css({ left: dragEnd-dragStart  })
                }
            });



            // 모바일 반응형(손가락 터치이벤트) : 마우스이벤트 전혀 인식 안된다.
            // 터치스와이프
            // 드래그 앤 드롭
            $('#section2 .slide-container').on({
                touchstart: function(e){ // 손가락 이벤트 터치스타트 <= mousedown 마우스 다운
                    winW = $(window).innerWidth();
                    touchStart =  e.originalEvent.changedTouches[0].clientX;     
                    //  슬라이드박스 왼쪽 위치를 리얼하게 값을 계속 구한다.               
                    dragStart  =  e.originalEvent.changedTouches[0].clientX - $('#section2 .slide-wrap').offset().left+((winW-conW)/2);  
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
                    $('#section2 .slide-wrap').css({ left: dragEnd-dragStart  })
                }
            });





        },
        section4: function(){
            

        },
        section5: function(){


        },
        section6: function(){


        },
        section7: function(){

            //  섹션1 메인슬라이드 ///////////////////////////
            // 터치 스와이프 : 마우스 이벤트
            let touchStart = null;
            let touchEnd = null;

            // 드래그 앤드 드롭(잡고끌고 그리고 놓기)
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;  //처음부터 초기값 설정
            let winW = $(window).innerWidth();
            let conW = $('#section7 .slide-container').innerWidth(); // 1068

            // 섹션2 슬라이드
            // 1. 메인슬라이드함수
            let cnt=0;
            let n = $('#section7 .slide').length/4-1; //슬라이드 전체갯수 2 = 8/4(한화면의갯수)
           
            mainSlide(); //로딩시 실행

            function mainSlide(){
                $('#section7 .slide-wrap').animate({left: `${-100*cnt}%`}, 600);

                // 화살버튼 보이기, 숨기기
                if(cnt>=4){ // 마지막 위치이면
                    $('#section7  .next-btn').fadeOut(300);
                }
                else{ // 마지막이 아니면 버튼 보여라
                    $('#section7  .next-btn').fadeIn(300);
                }

                if(cnt<=0){ // 처음 위치이면 버튼을 숨긴다.
                    $('#section7  .prev-btn').fadeOut(300);
                }
                else{  // 처음 아니면 버튼을 보인다.
                    $('#section7  .prev-btn').fadeIn(300);
                }

            }
            
            // 2-1. 다음카운트함수
            function nextCount(){
                cnt++;
                if(cnt>n) cnt=n;               
                mainSlide();
            }
            // 2-2. 이전카운트함수
            function prevCount(){
                cnt--;          
                if(cnt<0) cnt=0;
                mainSlide();
            }

            // 3-1. 다음화살버튼클릭이벤트
            $('#section7  .next-btn').on({
                click: function(e){
                    e.preventDefault();
                    nextCount();
                }
            });
            // 3-2. 이전화살버튼클릭이벤트
            $('#section7  .prev-btn').on({
                click: function(e){
                    e.preventDefault();
                    prevCount();                    
                }
            });


           // 터치스와이프 
            // 드래그 앤 드롭
            $('#section7 .slide-container').on({
                mousedown: function(e){
                    winW = $(window).innerWidth();
                    touchStart =  e.clientX;     
                    //  슬라이드박스 왼쪽 위치를 리얼하게 값을 계속 구한다.               
                    dragStart  =  e.clientX - $('#section7 .slide-wrap').offset().left+((winW-conW)/2);   
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
                    $('#section7 .slide-wrap').css({ left: dragEnd-dragStart  })
                }
            });


            // 모바일 반응형(손가락 터치이벤트) : 마우스이벤트 전혀 인식 안된다.
            // 터치스와이프
            // 드래그 앤 드롭
            $('#section7 .slide-container').on({
                touchstart: function(e){ // 손가락 이벤트 터치스타트 <= mousedown 마우스 다운
                    // console.log( 'touchstart' );
                    // console.log( e  );
                    // console.log( e.originalEvent.changedTouches[0].clientX  );

                    winW = $(window).innerWidth();
                    touchStart =  e.originalEvent.changedTouches[0].clientX;     
                    //  슬라이드박스 왼쪽 위치를 리얼하게 값을 계속 구한다.               
                    dragStart  =  e.originalEvent.changedTouches[0].clientX - $('#section7 .slide-wrap').offset().left+((winW-conW)/2);  
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
                    $('#section7 .slide-wrap').css({ left: dragEnd-dragStart  })
                }
            });




        }, 
        section8: function(){
            //  섹션1 메인슬라이드 ///////////////////////////
            // 터치 스와이프 : 마우스 이벤트
            let touchStart = null;
            let touchEnd = null;

            // 드래그 앤드 드롭(잡고끌고 그리고 놓기)
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false;  //처음부터 초기값 설정
            let winW = $(window).innerWidth();
            let conW = $('#section8 .slide-container').innerWidth(); // 1068


            // 섹션2 슬라이드
            // 1. 메인슬라이드함수
            let cnt=0;
            let n = $('#section8 .slide').length/4-1; //슬라이드 전체갯수 2 = 8/4(한화면의갯수)
           
            mainSlide(); //로딩시 실행

            function mainSlide(){
                $('#section8 .slide-wrap').animate({left: `${-100*cnt}%`}, 600);

                // 화살버튼 보이기, 숨기기
                // 5화면 0 ~ 4
                //if(cnt>=4){ // 마지막 위치이면

                // 2화면 0, 1
                if(cnt>=1){ // 마지막 위치이면
                    $('#section8  .next-btn').fadeOut(300);
                }
                else{ // 마지막이 아니면 버튼 보여라
                    $('#section8  .next-btn').fadeIn(300);
                }

                if(cnt<=0){ // 처음 위치이면 버튼을 숨긴다.
                    $('#section8  .prev-btn').fadeOut(300);
                }
                else{  // 처음 아니면 버튼을 보인다.
                    $('#section8  .prev-btn').fadeIn(300);
                }

            }
            
            // 2-1. 다음카운트함수
            function nextCount(){
                cnt++;
                if(cnt>n) cnt=n;
                mainSlide();
            }
            // 2-2. 이전카운트함수
            function prevCount(){
                cnt--;          
                if(cnt<0) cnt=0;
                mainSlide();
            }

            // 3-1. 다음화살버튼클릭이벤트
            $('#section8  .next-btn').on({
                click: function(e){
                    e.preventDefault();
                    nextCount();
                }
            });
            // 3-2. 이전화살버튼클릭이벤트
            $('#section8  .prev-btn').on({
                click: function(e){
                    e.preventDefault();
                    prevCount();                    
                }
            });


            // 터치스와이프 
            // 드래그 앤 드롭
            $('#section8 .slide-container').on({
                mousedown: function(e){
                    winW = $(window).innerWidth();
                    touchStart =  e.clientX;     
                    //  슬라이드박스 왼쪽 위치를 리얼하게 값을 계속 구한다.               
                    dragStart  =  e.clientX - $('#section8 .slide-wrap').offset().left+((winW-conW)/2);   
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
                    $('#section8 .slide-wrap').css({ left: dragEnd-dragStart  })
                }
            });



            // 모바일 반응형(손가락 터치이벤트) : 마우스이벤트 전혀 인식 안된다.
            // 터치스와이프
            // 드래그 앤 드롭
            $('#section8 .slide-container').on({
                touchstart: function(e){ // 손가락 이벤트 터치스타트 <= mousedown 마우스 다운
                    winW = $(window).innerWidth();
                    touchStart =  e.originalEvent.changedTouches[0].clientX;     
                    //  슬라이드박스 왼쪽 위치를 리얼하게 값을 계속 구한다.               
                    dragStart  =  e.originalEvent.changedTouches[0].clientX - $('#section8 .slide-wrap').offset().left+((winW-conW)/2);  
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
                    $('#section8 .slide-wrap').css({ left: dragEnd-dragStart  })
                }
            });



        },                 

    }     
    obj.init();
   

})(jQuery);


