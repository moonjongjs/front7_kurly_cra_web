(($, window, document)=>{

    // 회원가입 객체 생성
    const signUp = {
        회원: {
            아이디: '', // String
            아이디중복확인: false,  // Boolean
            비밀번호: '', // String
            비밀번호확인: false,  // Boolean
            이름:'', // String
            이메일:'', // String
            이메일중복확인: false,  // Boolean
            휴대폰:'', // String
            인증번호: 0, // Number
            휴대폰인증확인: false,  // Boolean
            주소1:'', // String
            주소2:'', // String
            성별:'', // String
            생년월일: '', // String
            추가입력사항: '',
            약관동의목록: [
                '이용약관 동의(필수)',
                '개인정보 수집∙이용 동의(필수)',
                '개인정보 수집∙이용 동의(선택)',
                '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)',
                'SNS',
                '이메일',
                '본인은 만 14세 이상입니다.(필수)'
            ],
            이용약관동의: []
            
        },
        init(){
            this.main();
        },
        main(){

            const _this = this;

            // 모달창
            $('.modal-close-btn').on({
                click(){
                    $('#modal').fadeOut(300);
                }
            })



            // 회원가입 유효성 체크
            // 1. 아이디 : 6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합
            // 1) 6자 이상 ~ 16자 이하   /.{6,16}/g
            // 2) 영문 또는 숫자 조함 /(?=.*[A-Za-z])+(?=.*[0-9])*/g
            // 3) 공백 사용 안됨.  /[^\s]/g  공백이 아닌것  ^ 부정
            // 4) 특수문자는 입력과 동시 삭제

            // 1. 아이디 : 키보드로 입력하면 즉시 판단하다록 한다. 이벤트 구현
            $('#inputId').on({
                keyup: function(e){
                    const regExp1 = /.{6,16}/g;  // true 정상 
                    const regExp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;  // true 정상
                    const regExp3 = /\s/g;  // true 공백 이면
                    const regExp4 = /[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<]/g;
                    const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g; //한글
  
                    // 공백이 아니면 정규식수행
                    if( $(this).val()!=='' ){

                        // 특수문자 입력하면 삭제한다.
                        if( regExp4.test($(this).val()) === true  ){
                            $(this).val( $(this).val().replace(regExp4, '')  );   
                        }

                        // 정규표현식 1,2,3,4  어느 하나라도 오류가 있는 발생
                        if( regExp1.test($(this).val()) === false || regExp2.test($(this).val()) === false  ||   regExp3.test($(this).val()) === true ||   regExp5.test($(this).val()) === true ){
                            $(this).parent().next().addClass('on').text('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
                            _this.회원.아이디 = '';
                        }
                        else {
                            $(this).parent().next().removeClass('on');
                            _this.회원.아이디 = $(this).val();
                        }
                    }
                    else {
                        $(this).parent().next().addClass('on').text('6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합');
                    }
                }
            });


            // 1-2 아이디 중복확인 
            $('.id-ok-btn').on({
                click(e){
                    e.preventDefault();
                    const regExp1 = /.{6,16}/g;  // true 정상 
                    const regExp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;  // true 정상
                    const regExp3 = /\s/g;  // true 공백 이면
                    const regExp4 = /[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<]/g;
                    const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g; //한글

                    // 정규표현식 1,2,3,4  어느 하나라도 오류가 있는 발생
                    if( regExp1.test($('#inputId').val()) === false || regExp2.test($('#inputId').val()) === false  ||   regExp3.test($('#inputId').val()) === true ||   regExp5.test($('#inputId').val()) === true ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합`); 
                        _this.회원.아이디중복확인 = false;
                    }
                    else {                        
                        $(this).parent().next().removeClass('on');

                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`사용 가능한 아이디 입니다`); 
                        _this.회원.아이디중복확인 = true;
                    }
                    // $.ajax() 서버단 구축하고 그리고 구현
                    
                }
            })




            // 2. 비밀번호 
            // 1) 최소 10자 이상 입력  .{10,}
            // 2) 영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합(영문숫자 / 영문특수문자 / 특수문자숫자)
            // 3) 공백문자 제외
            // 4) 동일한 숫자 3개 이상 연속 사용 불가
            $('#inputPw').on({
                keyup: function(){
                    const regExp1 = /.{10,}/g;
                    const regExp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<])+)|((?=.*[0-9])+(?=.*[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<])+)/g;  // true 정상
                    const regExp3 = /\s/g;  
                    const regExp4 = /(.)\1\1/g;  // 동일한 문자 연속 3자 이상이면 오류 
                    const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g; //한글

                    // 공백이 아니면 정규식수행
                    if( $(this).val()!=='' ){

                        if(regExp1.test($(this).val())===false){
                            $(this).parent().next().addClass('on').text('최소 10자 이상 입력');
                            _this.회원.비밀번호 = '';
                        }                    
                        else if(regExp2.test($(this).val())===false  || regExp3.test($(this).val())===true || regExp5.test($(this).val())===true){
                            $(this).parent().next().addClass('on').text('영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합');
                            _this.회원.비밀번호 = '';
                        }                    
                        else if(regExp4.test($(this).val())===true ){
                            $(this).parent().next().addClass('on').text('동일한 숫자 3개 이상 연속 사용 불가');
                            _this.회원.비밀번호 = '';
                        }
                        else {
                            $(this).parent().next().removeClass('on');
                            _this.회원.비밀번호 = $(this).val();
                        }

                    }
                    else {
                        $(this).parent().next().addClass('on').text('영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합');
                    }
                        
                }
            });


            // 3. 비밀번호 확인
            $('#inputPw2').on({
                keyup: function(){
                    if( $(this).val()!==$('#inputPw').val() ){
                        $(this).parent().next().addClass('on').text('동일한 비밀번호를 입력');
                        _this.회원.비밀번호확인 = false;
                    }
                    else {
                        $(this).parent().next().removeClass('on');
                        _this.회원.비밀번호확인 = true;
                    }
                }
            });


            // 4. 이름
            // 1) 영문, 숫자, 한글 입력, 공백포함
            $('#inputName').on({
                keyup: function(){
                    const regExp1 = /[^A-Za-z0-90-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/g;
                    if($(this).val()!==''){
                        // 특수문자 즉시 삭제
                        $(this).val( $(this).val().replace(regExp1, '')  );   
                        _this.회원.이름 = $(this).val();

                    }
                    else {
                        $(this).parent().next().addClass('on').text('이름을 입력해 주세요.');
                    }

                }
            });



            // 5. 이메일
            $('#inputEmail').on({
                keyup: function(){
                    //  moonseonjong@naver_news.com
                    //  moonseonjong@naver-news.com
                    //  moonseonjong@naver.com
                    //  moonseonjong@yahoo.co.kr
                    //  moonseonjong1.gang@yahoo.co.kr
                    //  moonseonjong1_gang@yahoo.co.kr
                    //  moonseonjong1-gang@yahoo.co.kr
                    //  moonseonjong1-gang@yahoo.co.kr
                    //  moonseonjong1-gangyahoo.com
                    
                    // 이메일 정규표현식 
                    // ^ 시작 문자는 문자, 숫자[필수]
                    // 시작문자 바로뒤 @앞은  -_. 문자, 숫자 [선택]
                    // @
                    // 문자, 숫자 [필수]
                    //  (-_. 문자, 숫자) [선택]
                    // .
                    // 문자 [필수]{2,3}

                    const regExp = /^[A-Za-z0-9~`!#$%^&*+=|{}'/?]+([\-_\.]?[A-Za-z0-9~`!#$%^&*+=|{}'/?])*@[A-Za-z0-9~`!#$%^&*+=|{}'/?]+([\-_\.]?[A-Za-z0-9~`!#$%^&*+=|{}'/?])*\.[A-Za-z]{2,3}$/;

                    if($(this).val()!==''){
                        if(regExp.test($(this).val())===false){
                            $(this).parent().next().addClass('on').text('이메일 형식으로 입력해 주세요.');
                            _this.회원.이메일 = '';
                        } 
                        else{
                            $(this).parent().next().removeClass('on')
                            _this.회원.이메일 = $(this).val();
                        }
                    }
                    else{
                        $(this).parent().next().addClass('on').text('이메일을 입력해 주세요.');
                    }
                }
            }); 

            // 5-2 이메일 중복확인 
            $('.email-ok-btn').on({
                click(e){
                    e.preventDefault();

                    const regExp = /^[A-Za-z0-9~`!#$%^&*+=|{}'/?]+([\-_\.]?[A-Za-z0-9~`!#$%^&*+=|{}'/?])*@[A-Za-z0-9~`!#$%^&*+=|{}'/?]+([\-_\.]?[A-Za-z0-9~`!#$%^&*+=|{}'/?])*\.[A-Za-z]{2,3}$/;

                    if($('#inputEmail').val()!==''){
                        if(regExp.test($('#inputEmail').val())===false){                            
                            $('#modal').fadeIn(300);
                            $('#modal .message').text(`이메일 형식으로 입력해 주세요.`); 
                            _this.회원.이메일중복확인 = false;
                        } 
                        else{
                            $('#inputEmail').parent().next().removeClass('on');
                            $('#modal').fadeIn(300);
                            $('#modal .message').text(`사용 가능한 이메일입니다.`); 
                            _this.회원.이메일중복확인 = true;
                        }
                    }
                    else{
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`이메일을 입력해 주세요.`); 
                    }

                    // $.ajax() 서버단 구축하고 그리고 구현

                }
            })




            // 6. 휴대폰 번호 입력상자
            // 1) 공백이 아니면, 정규표현식 수행, 만약 공백이면 '휴대폰 번호를 입력해 주세요.'
            // 2) 숫자가 아닌 문자는 즉시삭제
            // 3) 1자 이상이면 우측에 인증번호받기 버튼 활성화 사용가능 버튼
            $('#inputHp').on({
                keyup: function(){

                    const regExp = /[^0-9]/g;

                    if( $(this).val()!=='' ){
                        // 문자열.치환(정규표현식, '');
                        $(this).val( $(this).val().replace(regExp, '') );
                        if( $(this).val().length >=1 ){
                            $('.hp-res-num-btn')
                                .addClass('on')
                                .attr('disabled', false);
                            // 사용가능한 버튼 Disabled = false
                        }  

                    }
                    else{
                        $(this).parent().next().addClass('on').text('휴대폰 번호를 입력해 주세요.');
                        $('.hp-res-num-btn').removeClass('on');
                    }
                }
            })


            
            // 7-1. 휴대폰 번호 입력 후 인증번호받기 버튼 클릭이벤트            
            // 1) 휴대폰번호 형식 정규표현식 틀리면 : 잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요. 모달창
            // 2) 휴대폰번호 정상이면 모달창 내용 '인증번호가 발송되었습니다.'  
            // 3) 모달창 확인버튼 누르면 닫히고 인증번호를 입력하는 입력상자가 보인다.
            $('.hp-res-num-btn').on({
                click: function(e){
                    e.preventDefault();
                   // 휴대폰 번호 정규표현식 
                   // 010(3)7942(3,4) 5305(4)
                   const regExp = /^01[0|1|2|6|7|8|9]+[0-9]{3,4}[0-9]{4}$/g;
                   // 인증번호 6자리로 랜덤번호 Math.random()
                   let num =  Math.floor(Math.random()*900000+100000); 
                   // 휴대폰 입력상자 입력값 $('#inputHp').val()  
                   // 613331 / 139210
                   _this.회원.인증번호 = num; // 상위 변수 number
                   if( regExp.test( $('#inputHp').val() )===false ){
                        $(this).parent().next().addClass('on').text('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');
                   }
                   else { // 정상이면 인증번호 발송해주고  인증번호가 발송되었습니다.                         
                        // 그리고 인증번호 전송
                        // 모달창으로 띄우기
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`인증번호가 발송되었습니다. ${num}`);   
                        $('.row-06').addClass('on');
                        $(this).parent().next().removeClass('on');
                        timerCount();
                   }
                }
            });

            // 7-2. 타이머 3분 카운트 함수 생성                        
            // 1) 인증번호를 입력하는 입력상자 우측에 3분(2:59) 카운 숫자가 보인다.
            // 2) 인증번호를 입력하면 카운트다운 중지되고 
            // 3) 인증번호입력 3분이 초과되면, 유효 시간이 "만료되었습니다. 다시 시도해 주세요."
            let setId = 0;
            function timerCount(){
                let m = 2;
                let s = 59;
                // 다음 시간 수업 카운트
             setId =  setInterval(function(){
                    s--;
                    if(s<0){
                        s=59;
                        m--;
                        if(m<0){
                            clearInterval(setId);
                            s=0;
                            m=0;
                        }
                    }
                    
                    $('.minute').text(m);
                    $('.second').text(s);

                }, 1000);
            }

            // 8. 인증확인버튼
            $('.hp-ok-num-btn').on({
                click: function(e){
                    e.preventDefault();
                    // 인증번호 비교

                    // console.log('루트에 있는 저장 번호 ',  _this.회원.인증번호 );
                    // console.log('입력상자 입력값 ',  Number($('#inputHpnum').val()) ); // 문자=>숫자: 형변환

                    if( _this.회원.인증번호===Number($('#inputHpnum').val()) ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`인증에 성공 하였습니다.`); 

                        _this.회원.휴대폰 = $('#inputHp').val();
                        _this.회원.휴대폰인증확인 = true;

                        $('.row-06').removeClass('on');
                        $('.hp-res-num-btn').addClass('off');
                        $('.hp-res-num-btn2').addClass('on');

                        clearInterval(setId);
                    }
                    else {
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`인증에 실패 하였습니다.`); 
                        _this.회원.휴대폰 = '';
                        _this.회원.휴대폰인증확인 = false;

                    }
                }
            })

            // 9. 다른번호 인증
            $('.hp-res-num-btn2').on({
                click(e){
                    e.preventDefault();
                    $('.hp-res-num-btn').removeClass('off');
                    $('.hp-res-num-btn2').removeClass('on');
                    $('#inputHp').val('').focus();

                }
            })


            // 10. 주소검색 윈도우 팝업창 띄우기
            function windowPopup(){
                const url= './popup.html';
                const winWidth = $(window).innerWidth();
                const winHeight = $(window).innerHeight();
                const width = 530;
                const height = 569;
                const top =  (winHeight-height)/2;
                const left = (winWidth-width)/2;
                const winName ='address_popup';
                window.open( url , winName ,`width=${width}, height=${height}, top=${top}, left=${left}`);
            }

            // 11. 주소검색번튼 클릭 이벤트
            $('.addr-search-btn').on({
                click(e){
                    e.preventDefault();
                    windowPopup();
                }
            })

            // 12. 주소를 저장소에서 검색하여 있으면 
            // 주소 입력상자에 주소를 새로고침해도 유지 하도록 
            // 세션 스토레이지 key Value 값을 가져와서 입력상자에 입력한다.
            function getAddress(){
                // 세션 스토레이지 데이터 가져오기
                const key = 'KURLY_SIGNUP_ADDRESS';               
                const address = JSON.parse(sessionStorage.getItem(key));
                
                if(address!==null) {  // 주소가 있다면
                    // 입력상자 열어주고 데이터 입력
                    $('.row-07, .row-08, .row-09').addClass('on');
                    $('#inputAdd1').val( address.주소1 );
                    $('#inputAdd2').val( address.주소2 );
                    _this.회원.주소1 = address.주소1;
                    _this.회원.주소2 = address.주소2;
                }
                else { // 없다면
                    // 입력상자 닫기
                    // 리턴
                    $('.row-07, .row-08, .row-09').removeClass('on');
                    _this.회원.주소1 = '';
                    _this.회원.주소2 = '';
                    return;
                }
            }
            getAddress();

            // 13. 재검색 버튼 클릭 이벤트
            $('.addr-research-btn').on({
                click(e){
                    e.preventDefault();
                    windowPopup();
                }
            });


            // 14. 성별
            $('.gender-btn').on({
                change(){
                    _this.회원.성별 = $(this).val();
                    console.log(  _this.회원 );
                }
            });



            // 15. 생년월일
            function birth($this){

                const newDate = new Date(); // 현재날짜 생성
                const getYear = newDate.getFullYear(); //  2023-100=1923  
                const getMonth = newDate.getMonth();
                const getDate = newDate.getDate();

                // 1. 3칸 모두 공백이면 공백
                if( $('#year').val()==='' && $('#month').val()==='' && $('#date').val()==='' ){
                    $this.parent().parent().next().removeClass('on').text('');
                }
                else {                    
                    // 1. 년 - 100세 초과 불가
                    // 2. 년 - 미래년도 불가
                    // 3. 년 - 14세 이하 불가  
                    if( Number($('#year').val()) < getYear-100 ){ // 100세 초과 불가
                        $this.parent().parent().next().addClass('on').text('생년월일을 다시 확인해주세요.');                        
                    }
                    else if( Number($('#year').val()) > getYear ){ // 미래년도 불가
                        $this.parent().parent().next().addClass('on').text('생년월일이 미래로 입력 되었습니다.');                        
                    }
                    else if( Number($('#year').val()) >= getYear-14 ){ // 14세 미만 불가
                        $this.parent().parent().next().addClass('on').text('만 14세 미만은 가입이 불가합니다.');                        
                    }
                    else {
                        // 3. 월 - 1-12월           
                        if( Number($('#month').val()) < 1  ||  Number($('#month').val()) > 12 ){                            
                            $this.parent().parent().next().addClass('on').text('태어난 월을 정확하게 입력해주세요.');
                        }
                        else {
                            // 4. 일 - 1-31일
                            if( Number($('#date').val()) < 1  ||  Number($('#date').val()) > 31 ){ 
                                $this.parent().parent().next().addClass('on').text('태어난 일을 정확하게 입력해주세요.');
                            }
                            else {
                                $this.parent().parent().next().removeClass('on').text('');
                                _this.회원.생년월일 = `${$('#year').val()}-${$('#month').val()}-${$('#date').val()}`;
                            }
                        }
                    }
                }
            }

            // 16. 생년 입력상자
            $('#year').on({
                keyup(){                    
                    birth( $(this) );
                }
            })

            // 17. 생월 입력상자
            $('#month').on({
                keyup(){                    
                    birth( $(this) );
                }
            })

            // 18. 생년 입력상자
            $('#date').on({
                keyup(){                    
                    birth( $(this) );
                }
            })


            // 19. 추가입력사항
            $('.add-input-btn').on({
                change(e){
                // console.log( e.target.value );                   
                // console.log( e.target.type );                   
                // console.log( e.target.name );                   
                // console.log( e.target.id );                   
                // console.log( $(this).val() );
                    $('.row-14').addClass('on');

                    if( e.target.value === '친구초대 추천인 아이디' ){
                        $('.add-input-ok-btn').removeClass('off');
                        $('#addInputBox').attr('placeholder', '추천인 아이디를 입력해 주세요.');
                        $('.add-input-p').html('가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다');
                    }
                    else {
                        $('.add-input-ok-btn').addClass('off');
                        $('#addInputBox').attr('placeholder', '참여 이벤트명을 입력해 주세요.');
                        $('.add-input-p').html('대소문자 및 띄어쓰기에 유의해주세요.<br>가입 이후는 수정이 불가능 합니다.<br>대소문자 및 띄어쓰기에 유의해주세요.');
                    }

                    _this.회원.추천입력사항 = $(this).val();

                }
            });

            // 20. 추천인 아이디 확인 이벤트
            $('.add-input-ok-btn').on({
                click(e){
                    e.preventDefault();
                    alert('추천인 아이디 확인이벤트');
                    // $.ajax() 서버단 구축하고 그리고 구현
                }
            })

            // 21. 이용약관 동의
            // 체크박스 이벤트
            // All 체크
            $('#checkAll').on({
                change(e){
                    console.log( $(this).is(':checked') );
                    if( $(this).is(':checked') ){ // 전체체크
                        $('.chk-btn').prop('checked', true);
                        _this.회원.이용약관동의 = _this.회원.약관동의목록
                    }
                    else {
                        $('.chk-btn').prop('checked', false);
                        _this.회원.이용약관동의 = []; // 빈배열 삭제
                    }

                    console.log( _this.회원 );
                }
            })


            // 22. 개별체크  
            // 전개연산자 이용 누적 저장
            $('.chk-btn').on({
                change(e){
                    if( $(this).is(':checked') ){
                        _this.회원.이용약관동의 = [..._this.회원.이용약관동의, $(this).val() ]; // 맨뒤에 데이터 추가
                        // _this.회원.이용약관동의 = [$(this).val(), ..._this.회원.이용약관동의 ]; // 맨앞에 데이터 삽입
                        console.log(  _this.회원.이용약관동의 );
                    }
                    else { // 체크해제되면
                        _this.회원.이용약관동의 = _this.회원.이용약관동의.filter((item)=>item!==$(this).val() );
                        // 체크해제한 항목은 삭제
                        // 즉 체크해제한 항목을 제왼 모든 배열을 재구성하여 저장한다.
                        console.log(  _this.회원.이용약관동의 );
                    }

                    // 7개 항목이 체크되어 있다면 전체처크 선택
                    // 1개라도 항목이 체크해제되면 전체체크 선택해제하라
                    if(  _this.회원.이용약관동의.length ===7  ){ // 배열의 길이
                        $('#checkAll').prop('checked', true);
                    }
                    else {
                        $('#checkAll').prop('checked', false);
                    }


                }
            })


            // 백단에 전송하기
            // 프론트단 모든 항목을 유효성 검사를 거친다.(단, 필수항목과 선택항목) 구분
            // 전송버튼(서브밋 버튼) 클릭 이벤트
            $('.submit-btn').on({
                click(e){
                    e.preventDefault();


                    // 추가입력사항 입력상자
                    _this.회원.추천입력사항 =  `${_this.회원.추천입력사항} : ${$('#addInputBox').val()}`;
                    _this.회원.주소1 = $('#inputAdd1').val() ;
                    _this.회원.주소2 = $('#inputAdd2').val() ;


                    let cnt=0;
                     _this.회원.이용약관동의.map(function(item, idx){
                        if( item.indexOf('필수')!==-1 ){ // 찾았으면
                            cnt++;
                        }
                     });

                   
                    if( _this.회원.아이디==='' ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`아이디를 입력해 주세요`); 
                        return;
                    }                    
                    else if( _this.회원.비밀번호==='' ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`비밀번호를 입력해 주세요`); 
                        return;
                    }
                    else if( _this.회원.비밀번호확인==='' ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`한번더 비밀번호를 입력해 주세요`); 
                        return;
                    }
                    else if( _this.회원.이름==='' ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`이름을 입력해 주세요`); 
                        return;
                    }
                    else if( _this.회원.이메일==='' ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`이메일을 입력해 주세요`); 
                        return;
                    }
                    else if( _this.회원.휴대폰==='' ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`휴대폰을 번호를 입력해 주세요`); 
                        return;
                    }
                    else if( _this.회원.주소1==='' ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`주소1를 입력해 주세요`); 
                        return;
                    }
                    else if( _this.회원.주소2==='' ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`나머지 주소를 입력해 주세요`); 
                        return;
                    }
                    else if( cnt<3 ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`이용약관동의 필수 항목을 체크해 주세요`); 
                        return;
                    }
                    else if(_this.회원.아이디중복확인===false ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`아이디중복확인을 해주세요`); 
                        return;                        
                    }
                    else if( _this.회원.비밀번호확인===false ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`아이디중복확인을 해주세요`); 
                        return;                        
                    }
                    else if(_this.회원.이메일중복확인===false ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`이메일중복확인을 해주세요`); 
                        return;                        
                    }
                    else if(_this.회원.휴대폰인증확인===false  ){
                        $('#modal').fadeIn(300);
                        $('#modal .message').text(`휴대폰인증확인을 해주세요`); 
                        return;                        
                    }
                    else{
                        $('#modal').fadeOut(300);
                        $('#modal .message').text(``); 


                        // 최종 모든 데이터 객체 생성하여 전송할 데이터를 저장한다.
                        // 휴대폰 번호 : 010-7942-5305 ^(\d{3})-(\d{3,4})-(\d{4})$
                        const regExp = /^(\d{3})(\d{3,4})(\d{4})$/g;
                        const member = {
                            아이디: _this.회원.아이디,
                            비밀번호: _this.회원.비밀번호,
                            이름: _this.회원.이름,
                            이메일: _this.회원.이메일,
                            휴대폰: _this.회원.휴대폰.replace(regExp, '$1-$2-$3'),
                            주소: `${_this.회원.주소1} ${_this.회원.주소2}`,
                            성별: _this.회원.성별,
                            생년월일: _this.회원.생년월일,
                            추가입력사항:  _this.회원.추가입력사항,
                            이용약관동의:  JSON.stringify(_this.회원.이용약관동의),
                            가입일자: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
                        }

                        // BACKEND 전송하기이전 최종테스트 
                        // localStorage.setItem('마켓컬리회원가입', JSON.stringify(member) );

                        //location.href = './';  //전송후 루트로 이동
                        // 오늘 수업은 AJAX() 서버에 폼데이터 전송 MYSQL 데이터 저장
                        $.ajax({
                            url: './sign_up.php',
                            type: 'POST',  // 폼데이터 전송방식
                            data: member,
                            success(res){
                                console.log( res ); // 서버응답

                                // location.href = '../../';  //루트
                            },
                            error(err){
                                console.log( err );
                            }
                        });


                    }
                       
                   
                }
            })


        }
    }

    signUp.init();

})(jQuery, window, document);