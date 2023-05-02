(function($){

    const obj = {
        init: function(){
            this.quickMenu();
        },
        quickMenu: function(){

            // 윈도우 스크롤 이벤트 구현
            $(window).scroll(function(){
                if(  $(window).scrollTop() >= 300  ){
                    $('#quickMenu').addClass('on'); //헤더에 on 클래스를 추가한다.
                }
                else{
                    $('#quickMenu').removeClass('on'); //헤더에 on 클래스를 삭제한다.
                }
            });

        },
    }
    obj.init();

})(jQuery);