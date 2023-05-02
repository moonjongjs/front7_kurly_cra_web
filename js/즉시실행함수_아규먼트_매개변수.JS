// IIFE 즉시실행함수 기초 공부
(function($, abc, 제이쿼리, 바보){ // 파라미터 Parameter (매개변수) undefined 정의안되었다.
    console.log( $, abc, 제이쿼리, 바보 );    
})('이순신', '딸기', jQuery); // 아규먼트 Argument (전달인자)




(function($){ // 파라미터 Parameter (매개변수) undefined 정의안되었다.
    console.log( $ );    
})(jQuery); // 아규먼트 Argument (전달인자)


    // 1. $(function(){}  제이쿼리의 $ 달러사인이 밖에 노출되어 충돌가능성 있다. 
    //    누구랑? 플러그인, 라이브러리 들이 충돌 가능성 그래서
    //    함수 내부 변수로 $ 달러사인 사용하여 충돌을 막는다.
    //    즉시실행함수를 이용한다.

    // 2. 변수, 함수 등의 중복 사용 문제 해결하기 위해서 객체(Object)를 사용한다.

    // 3. 헤더 메인 섹션별 푸터 모든 요소는 중복될 수 있다. 그래서     
    //    요소 앞에 반드시 섹션별 아이디를 붙인다.
    // $('#section1 .slide-wrap')
    // $('#section2 .slide-wrap') 
    // $('#section1 .next-btn') 
    // $('#section2 .next-btn') 