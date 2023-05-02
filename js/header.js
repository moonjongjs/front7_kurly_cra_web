(function($){

    // 객체(Object)
    const 서울학교 = {
         교무과: function(){
            this._1학년();
            this._2학년();
            this._3학년();
         },
         _1학년: function(){

         },         
         _2학년: function(){

         },         
         _3학년: function(){

         },         
    }
    서울학교.교무과();


    const obj = {
        init: function(){
            this.header();
        },
        header: function(){ // header: 속성 + function(){} => 메서드(함수)
           
            // 스크롤이벤트 발생하여 헤더 3행인 메인메뉴에 도달하면 
            // 헤더 영역 메뉴 고정(fixed)된다.
            const headerRow3Top = $('#header .header-row3').offset().top; // 142

            // 윈도우 스크롤 이벤트 구현
            $(window).scroll(function(){
                // 스크롤 이벤트 발생하면 현재 스크롤 탑값을 보여준다.
                // console.log( $(window).scrollTop() );
                // 헤더 영역의 3행 탑값 위치 찾기(맨위에서 여기까지의 간격)
                // console.log('헤더 로우3 탑값 위치 : ' + $('#header .header-row3').offset().top  );

                if(  $(window).scrollTop() >= headerRow3Top  ){
                    $('#header').addClass('on'); //헤더에 on 클래스를 추가한다.
                }
                else{
                    $('#header').removeClass('on'); //헤더에 on 클래스를 삭제한다.
                }

            });





            // 접근성을 고려한 이벤트
            // 선택자 1개와 이벤트 여러개를 사용하는 객체 메서드 방식 이벤트
            $('.custom-center-btn').on({
                mouseenter: function(){ // 마우스 접근
                    $('.custom-center').show();
                },
                focusin: function(){      // 키보드 탭키 접근 focus === focusin <=> blur === focusout
                    $('.custom-center').show();
                }
            });


            // 고객센터 칸 li 마지막칸을 영역을 떠나면 툴팁메뉴 숨기기
            // $('.custom-center-li').mouseleave(function(){
            //     $('.custom-center').hide(); //고객센터 툴팁박스를 숨겨라
            // });
            // $('.custom-center-li').on('mouseleave',function(){
            //     $('.custom-center').hide(); //고객센터 툴팁박스를 숨겨라
            // });    
            $('.custom-center-li').on({
                mouseleave: function(){
                    $('.custom-center').hide();
                }
            });


            // 배송지 등록 버튼
            $('.map-btn').on({
                mouseenter: function(){
                    $('.map-tooltip').show();
                }
            });

            // 툴팁메뉴를 떠나면 툴팁메뉴 숨기기
            $('.map-tooltip').on({
                mouseleave: function(){
                    $(this).hide(); // $('.map-tooltip') === this
                }
            });


        }
    }
    obj.init();

})(jQuery);