(function($){
    const obj = {
        init: function(){
            this.goTop();
        },
        goTop: function(){
            let sec4Top = 0;
            


            // 예외 처리 
            try{ // 실행
                sec4Top = $('#section4').offset().top;
            }   
            catch(e){ // 위 try {} 영역에서 오류가 발생하면 catch {} 실행
                sec4Top = 0;
            } 

           

            // 스크롤 탑값이 섹셕4의 탑값에 도달하면 고탑 버튼이 부드럽게 보인다. fadeIn
            // 스크롤 탑값이 섹셕4의 탑값에 미만이면 고탑 버튼이 부드럽게 숨긴다. fadeOut
            
            $(window).scroll(function(){
                if( $(window).scrollTop() >= sec4Top ){
                    $('#goTop').fadeIn(600); // 부드럽게 보인다.(페이드인)
                }
                else{
                    $('#goTop').fadeOut(600); // 부드럽게 보인다.(페이드아웃)
                }
            });

            // 스무스 스크롤 이벤트
            // 고탑 버튼을 클릭 click 하면 맨위로 부드럽게 스무스하게 이동한다.
            $('.gotop-btn').on({
                click: function(){
                    // 스무스 스크롤 이벤트(Smooth Scroll Event)
                    $('html, body').stop().animate({scrollTop: 0}, 600);
                }
            });

        }
    }
    obj.init();

})(jQuery);