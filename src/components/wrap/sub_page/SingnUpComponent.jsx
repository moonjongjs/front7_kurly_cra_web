import React from 'react';
import axios from 'axios';

function SingnUpComponent({회원, timerCounterFn, timer }) {

   // 타이머 프롭스 비구조화
   const {seconds,minutes,setId,timerMsg,timerEnd} = timer;

   // 0. 변수관리(프롭스(변수) => 상태관리(state =>  setState 변경(수정) 세터 setter ))
   const [state, setState] = React.useState(회원); //state.회원:
  
   // 입력상자 포커스 : 
   let refHp = React.useRef();



   // 1-1. 아이디 : 입력상자 이벤트 온체인지 => 입력상자 변화생기면 동작 onChange 
   // 입력상자에 onChange={함수이름}
   // 함수이름을 가져와서 반드시 화살표 함수로 등록하고 사용한다.
   const onChangeInputId=(e)=>{   
      const regExp1 = /.{6,16}/g;  // true 정상 
      const regExp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;  // true 정상
      const regExp3 = /\s/g;  // true 공백 이면
      const regExp4 = /[~`!@#$%^&*()_\-+=|\\[\]{}'";:/?.>,<]/g;
      const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g; //한글

      let {value} = e.target;
      let msg = '';
      let isId = false;
      let 아이디= '';

       // 특수문자 입력하면 삭제한다.
          아이디 = value.replace(regExp4, '');


       // 입력제한 조건 
       if(  regExp1.test(value)===false || regExp2.test(value)===false || regExp3.test(value)===true   || regExp5.test(value)===true  ){
         // 빨강색 글자 표기
         // 메시지 
            isId = true;
            msg = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
       }
       else {
            isId = false;
            msg = '';
       }

      setState({
         ...state,  // 수정전 데이터를 전개연산자로 지정해서서 유지시키고, 추가(수정)한다.
         아이디: 아이디,  // 상태변수에 입력값 저장 수정된다.
         isId: isId,
         msg: msg
      })
   }
 

   // 1-2 아이디 중복확인 버튼 클릭 이벤트
   // 1) 아이디 유효성 검사 정규표현식
   // 2) 유효성검사 통과된 경우 아이디 중복 검사 : 서버와 연동 아이디 가져오기 중복검사
   const onClickInputId=(e)=>{
      e.preventDefault();
      const regExp1 = /.{6,16}/g;  // true 정상 
      const regExp2 = /(?=.*[A-Za-z])+(?=.*[0-9])*/g;  // true 정상
      const regExp3 = /\s/g;  // true 공백 이면
      // const regExp4 = /[~`!@#$%^&*()_\-+=|\\[\]{}'";:/?.>,<]/g;
      const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g; //한글

      let value = state.아이디;
      let modalMsg = '';
      let isModal = false;
      let 아이디= '';
      let 아이디중복확인= false;


       // 입력제한 조건 
       if(  regExp1.test(value)===false || regExp2.test(value)===false || regExp3.test(value)===true   || regExp5.test(value)===true  ){
            isModal = true;
            modalMsg = '6자 이상 16자 이하의 영문 혹은 영문과 숫자를 조합';
       }
       else {
            isModal = false;
            modalMsg = '';

            // 아이디 이상 없으면 중복검사
            // 비동기 전송방식 AXIOS 패키지 설치
            // axios().then().catch();
            axios({
               url:'https://moonjong.co.kr/cra_cors7/cors_member_id_email_select.php',
               method:'GET'
            })
            .then((res)=>{ // 성공
               // 성공하면
               if( res.status===200 ){
                  const result = res.data.map((item)=>item.아이디===state.아이디);
                  if( result.includes(true) ){
                     isModal = true;
                     modalMsg = '사용 불가능한 아이디입니다.';
                     아이디중복확인 = false;
                  }
                  else{
                     isModal = true;
                     modalMsg = '사용 가능한 아이디입니다.'; 
                     아이디중복확인 = true;                    
                  }
                  setState({
                     ...state,  // 수정전 데이터를 전개연산자로 지정해서서 유지시키고, 추가(수정)한다.        
                     isModal: isModal,
                     modalMsg: modalMsg,
                     아이디중복확인: 아이디중복확인
                  })
               }
            })
            .catch((err)=>{ // 실패
               console.log(err);
            });


       }

      setState({
         ...state,  // 수정전 데이터를 전개연산자로 지정해서서 유지시키고, 추가(수정)한다.        
         isModal: isModal,
         modalMsg: modalMsg
      })
   }






 
   // 2. 비밀번호 입력상자
   const onChangeInputPw=(e)=>{
      const regExp1 = /.{10,}/g;
      const regExp2 = /((?=.*[A-Za-z])+(?=.*[0-9])+)|((?=.*[A-Za-z])+(?=.*[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<])+)|((?=.*[0-9])+(?=.*[~`!@#$%^&*()_\-+=|\\\[\]{}'";:/?.>,<])+)/g;  // true 정상
      const regExp3 = /\s/g;  
      const regExp4 = /(.)\1\1/g;  // 동일한 문자 연속 3자 이상이면 오류 
      const regExp5 = /[ㄱ-ㅎ가-힣ㅏ-ㅣ]/g; //한글

      const {value} = e.target;
      let msg = '';
      let isPw = false;

      if(regExp1.test(value)===false){
            msg = '최소 10자 이상 입력';
            isPw = true;
      }                    
      else if(regExp2.test(value)===false  || regExp3.test(value)===true || regExp5.test(value)===true){
            msg = '영문/숫자/특수문자(공백 제외)만 허용하며, 2개 이상 조합';
            isPw = true;
      }                    
      else if(regExp4.test(value)===true ){
            msg = '동일한 숫자 3개 이상 연속 사용 불가';
            isPw = true;
      }
      else {
            msg = '';
            isPw = false;
      }

      setState({
         ...state,
         비밀번호: value,
         msg: msg,
         isPw: isPw
      })
   }


    // 3. 비밀번호확인 입력상자 
    const onChangeInputPw2=(e)=>{
         const {value} = e.target;
         let msg = '';
         let isPwOk = false;

         if( value!==state.비밀번호 ){
               msg = '동일한 비밀번호를 입력';     
               isPwOk = true;       
         }
         else {            
               msg = '';     
               isPwOk = false    
         }

         setState({
            ...state,
            msg: msg,
            isPwOk: isPwOk,
            비밀번호확인: value
         });
    }

    // 4. 이름 입력상자
    const onChangeInputName=(e)=>{
         const {value} = e.target;
         let msg = '';
         let isName = false;

         const regExp1 = /[^A-Za-z0-90-9가-힣ㄱ-ㅎㅏ-ㅣ\s]/g;

         if(value!==''){
            e.target.value = value.replace(regExp1, '');
            isName = false;
         }
         else {
            msg = '이름을 입력해 주세요.';
            isName = true;
         }

         setState({
            ...state,
            msg: msg,
            isName: isName,
            이름 : value
         })

    }

   // 5-1. 이메일 입력상자 onChange 이벤트
   const onChangeInputEmail=(e)=>{
      const {value} = e.target;
      const regExp = /^[A-Za-z0-9~`!#$%^&*+=|{}'/?]+([-_.]?[A-Za-z0-9~`!#$%^&*+=|{}'/?])*@[A-Za-z0-9~`!#$%^&*+=|{}'/?]+([-_.]?[A-Za-z0-9~`!#$%^&*+=|{}'/?])*\.[A-Za-z]{2,3}$/;
      let isMaile = false;
      let msg = '';

            if(regExp.test(value)===false){
               isMaile = true;
               msg = '이메일 형식으로 입력해 주세요.';   
            } 
            else{
               isMaile = false;
               msg = '';  
            }

            setState({
               ...state,
               isMaile: isMaile,
               msg: msg,
               이메일: value
            })

   }


   // 5-2. 이메일 중복확인 버튼 클릭 onClick 이벤트
   const onClickEmailOk=(e)=>{
      e.preventDefault();
      const value = state.이메일;
      const regExp = /^[A-Za-z0-9~`!#$%^&*+=|{}'/?]+([-_.]?[A-Za-z0-9~`!#$%^&*+=|{}'/?])*@[A-Za-z0-9~`!#$%^&*+=|{}'/?]+([-_.]?[A-Za-z0-9~`!#$%^&*+=|{}'/?])*\.[A-Za-z]{2,3}$/;
      let isModal = false;
      let modalMsg = '';
      let 이메일중복확인 = false;          

            if(regExp.test(value)===false){
               isModal = true;
               modalMsg = '이메일 형식으로 입력해 주세요.';   
            } 
            else{
               isModal = false;
               modalMsg = '';  
               // 이메일 중복검사
               axios({
                  url:'http://moonjong.dothome.co.kr/cra_cors7/cors_member_id_email_select.php',
                  method:'post'
               })
               .then((res)=>{
                  console.log( res );
                  if(res.status===200){
                     const result = res.data.map((item)=>item.이메일===state.이메일);
                     console.log( result );
                     if(result.includes(true)){
                        isModal = true;
                        modalMsg = '사용 불가능한 이메일 입니다.';  
                        이메일중복확인 = false;
                     }
                     else{
                        isModal = true;
                        modalMsg = '사용 가능한 이메일 입니다.';  
                        이메일중복확인 = true;
                     }
                     
                     setState({
                        ...state,
                        isModal: isModal,
                        modalMsg: modalMsg,
                        이메일중복확인 : 이메일중복확인
                     });

                  }
               })
               .catch((err)=>{
                  console.log(`axios 오류! ${err}`);
               });

            }

            setState({
               ...state,
               isModal: isModal,
               modalMsg: modalMsg
            })

   }

 
   // 6. 휴대폰
   // 6-1. 입력상자 이벤트
   const onChangeHpInput=(e)=>{
      const {value} = e.target;
      let 휴대폰 = '';
      const regExp = /[^0-9]/g;
      let isHp = true;
      let msgHp = '';

      휴대폰 = value.replace(regExp, '');

      // 휴대폰 번호가 1글자 이상이면 우측버튼 사용 가능하도록 활성화
      if(휴대폰.length>=1){
         isHp=false; // 버튼 사용가능
         msgHp=""
      }
      else {
         isHp=true;
         msgHp="휴대폰 번호를 입력해 주세요."
      }

      setState({
         ...state,
         휴대폰: 휴대폰,
         isHp: isHp,
         msgHp: msgHp
      })
   }
 

   // 6-2 휴대폰 인증번호 발송 버튼 클릭 이벤트
   //     입력상자 유효성검사
   //     휴대폰 정규표현식
   //     010-7942-5305
   //     ^ 01[0-9]{1}   7942{3,4}   5305{4} $
   const onClickHpBtn=(e)=>{
      e.preventDefault();

      const regExp = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;
      let isModal= false;
      let modalMsg= ''; 
      let num='';
      let isHpNum = false;

      if( regExp.test(state.휴대폰)===false ){
         isModal = true;
         modalMsg = '잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.';
      }
      else {
         // 휴대폰 인증번호 발송
         // 6자리의 숫자로 하되  반드시 6자리로 사용
         num = Math.floor(Math.random()*900000+100000);
         isModal = true;
         modalMsg = `인증번호가 발송되었습니다. ${num}`;
         isHpNum = true;
      }

      setState({
         ...state,
         isModal: isModal,
         modalMsg: modalMsg,
         발송인증번호: num,
         isHpNum: isHpNum
      });
   }
   

   // 6-3. 입력인증번호 입력상자 이벤트
   const onChangeInputHpnum=(e)=>{
      const {value} = e.target;

      setState({
         ...state,
         입력인증번호: value
      })
   }


   // 6-4. 입력인증번호와 발송인증번호 비교하기
   const onClickHpOkBtn=(e)=>{
      e.preventDefault();

      let isModal = false;
      let modalMsg = '';
      let isHpNum = false;
      let isHpNum2 = false;
      let 휴대폰인증확인 = false;

      if(Number(state.입력인증번호)!==state.발송인증번호){
         isModal = true;
         modalMsg = "잘못된 인증 코드 입니다.";
         isHpNum = true;
         isHpNum2 = false;
         휴대폰인증확인= false;
      }
      else {
         isModal = true;
         modalMsg = "인증에 성공 하였습니다.";
         isHpNum = false;
         isHpNum2 = true;
         휴대폰인증확인= true;
         // 타이머 일시중지
         clearInterval(setId);

      }

      setState({
         ...state,
         isModal: isModal,
         modalMsg: modalMsg,
         isHpNum: isHpNum,
         isHpNum2: isHpNum2,
         휴대폰인증확인: 휴대폰인증확인
      })

   }

   // 6-5. 다른번호 인증 클릭 이벤트
   const onClickHpNum2Btn=(e)=>{
      e.preventDefault();
      setState({
         ...state,
         isHpNum2: false,
         휴대폰: ''
      })
      //커서가 포커스
      refHp.current.focus();

   }




   // 7-1. 주소검색 버튼 클릭 이벤트
   const onClickAddressSearchBtn=(e)=>{
      e.preventDefault();
      // 팝업창 크기 530 * 569
      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const popW = 530;
      const popH = 569;
      const popT = (winH-popH)/2;
      const popL = (winW-popW)/2;
      const popFile = 'popup.html';
      const popName = 'addressSearch';

      window.open(popFile, popName,`width=${popW}, height=${popH}, top=${popT}, left=${popL}`);
   }


   // 7-2. 주소1 온체인지 이벤트
   const onChangeAddress1=(e)=>{
      setState({
         ...state,
         주소1: e.target.value
      });
   }

   // 7-3. 주소2 온체인지 이벤트
   const onChangeAddress2=(e)=>{
      setState({
         ...state,
         주소2: e.target.value
      });
   }

   // 7-4. 세션 스토레이지 데이터 가져오기
   const getAddress=()=>{

      const key = 'KURLY_SIGNUP_ADDRESS';
      if(sessionStorage.getItem(key)!==null){
         const result = JSON.parse(sessionStorage.getItem(key));

         setState({
            ...state,
            주소1: result.주소1,
            주소2: result.주소2,
            isAddress: true
         })
      }

   }

   // 7-5. 주소변경되면 마운트 후에 주소 가져오기 실행
   React.useEffect(()=>{
      getAddress();
   },[state.주소1, state.주소2]);



   // 8. 성별
   // 기본이 선택안함. 체크됨
   const onChangeGender=(e)=>{
      setState({
         ...state,
         성별: e.target.value
      })
   }




   // 9. 생년월일
   // 9-1. 생년 입력 상자 이벤트 : 숫자만 입력 그외는 즉시 삭제
   const onChangeYear=(e)=>{
      const regExp = /[^\d]/g;
      let 생년 = '';
      const {value} = e.target;
      
      생년 = value.replace(regExp, '');

      setState({
         ...state,
         생년: 생년
      })
   }

   // 9-2. 생월 입력 상자 이벤트 : 숫자만 입력 그외는 즉시 삭제
   const onChangeMonth=(e)=>{
      const regExp = /[^\d]/g;
      let 생월 = '';
      const {value} = e.target;
      
      생월 = value.replace(regExp, '');

      setState({
         ...state,
         생월: 생월
      })
   }

   // 9-3. 생일 입력 상자 이벤트 : 숫자만 입력 그외는 즉시 삭제
   const onChangeDate=(e)=>{
      const regExp = /[^\d]/g;
      let 생일 = '';
      const {value} = e.target;
      
      생일 = value.replace(regExp, '');

      setState({
         ...state,
         생일: 생일
      })
   }


   // 생년월일 모두 유효성검사
   const birthCheckFn=()=>{
      // 생년 
      // 1. 100초과 안됨
      // 2. 14미만안됨
      // 3. 미래입력안됨
      // 생월 : 1-12
      // 생일 : 1-31
      const {생년,생월,생일} = state;
      const newYear = new Date().getFullYear(); 
      let isBirth = false;
      let msgBirth = '';

      if(생년===''&& 생월==='' && 생일===''){
         isBirth = false;
         msgBirth = '';
         return;
      }
      else{
         // 생년체크
          if( Number(생년) > newYear ){
            isBirth = true;
            msgBirth ='생년월일이 미래로 입력 되었습니다.';
          }
          else if ( Number(생년) >= (newYear-14) ) {
            isBirth = true;
            msgBirth ='만 14세 미만은 가입이 불가 합니다';
          }
          else if ( Number(생년) < (newYear-100) ) {
            isBirth = true;
            msgBirth ='생년월일을 다시 확인해주세요';
          }
          else {
               // 생월체크
               if ( Number(생월) < 1 ||  Number(생월) > 12  ) {
                  isBirth = true;
                  msgBirth ='태어난 월을 정확하게 입력해주세요.';
                }
                else {
                  if ( Number(생일) < 1 ||  Number(생일) > 31  ) {
                     isBirth = true;
                     msgBirth ='태어난 알을 정확하게 입력해주세요.';
                   }
                   else {
                     isBirth = false;
                     msgBirth ='';
                   }
                }
          }
      }

      setState({
         ...state,
         isBirth: isBirth,
         msgBirth: msgBirth
      });


   }

   // 상태관리 변수가 입력이되거나 변경이되면 즉시 함수 실행
   React.useEffect(()=>{
      birthCheckFn();
   },[state.생년, state.생월, state.생일]);









   // 10-1. 추가입력사항
   const onChnageAddInput=(e)=>{
      let isAddInput = false;
      let 추가입력사항 = '';
      let addInputText = '';
      let addInputPlacehoder = '';

      if(e.target.checked===true){
         추가입력사항= e.target.value;
         isAddInput=true;

         if( e.target.value==='친구초대 추천인 아이디' ){
            addInputText = '가입 후 7일 내 첫 주문 배송완료 시, 친구초대 이벤트 적립금이 지급됩니다.';
            addInputPlacehoder ='추천인 아이디를 입력해주세요';
         }
         else{
            addInputText =  '추천인 아이디와 참여 이벤트명 중 하나만 선택 가능합니다.' ;
            addInputText += '대소문자 및 띄어쓰기에 유의해주세요.'; 
            addInputPlacehoder ='참여 이벤트 명을 입력해주세요';
         }        
      }

      setState({
         ...state,
         추가입력사항: 추가입력사항,
         isAddInput: isAddInput,
         addInputText: addInputText,
         addInputPlacehoder: addInputPlacehoder
      })

   }

   // 10-2. 추천인 아이디 입력상자
   const onChageAddInput2=(e)=>{
      e.preventDefault();
      setState({
         ...state,
         추천인아이디: e.target.value
      })
   }



   // 10-3. 추가입력사항 : 아이디 확인 애벤트   
   const onClickAddInputIdCheck=(e)=>{
         e.preventDefault();
         let isModal = false;
         let modalMsg = '';

               axios({
                  url:'http://moonjong.dothome.co.kr/cra_cors7/cors_member_id_email_select.php',
                  method:'post'
               })
               .then((res)=>{
                  if(res.status===200){
                     const result = res.data.map((item)=>item.아이디===state.추천인아이디);
                     if(result.includes(true)){
                        isModal = true;
                        modalMsg = '존재하는 아이디 입니다. 친구초대 이벤트에 참여 가능해요.';  
                     }
                     else{
                        isModal = true;
                        modalMsg = '존재하지 않는 아이디 입니다.';  
                     }
                     
                     setState({
                        ...state,
                        isModal: isModal,
                        modalMsg: modalMsg
                     });

                  }
               })
               .catch((err)=>{
                  console.log(`axios 오류! ${err}`);
               });
   }


   // 11. 이용약관동의
   // 11-1. 전체동의
   // 전체동의 체크박스 선택(체크하면) 7개의 약관동의목록이 모두 
   // 이용약관동의 배열에 저장된다
   
   // 11-2 
   // JSX 태그 요소
   // 각 체크박스(7개)의 value 값과 이용약관동의 값을 비교하여
   // 만약 value값이 있다면 체크를 자동으로 체크드 하게 한다.
   const onChangeCheckAll=(e)=>{

      if(e.target.checked===true){
         setState({
            ...state,
            이용약관동의: state.약관동의
         })
      }
      else{
         setState({
            ...state,
            이용약관동의: []
         })
      }
   }


   // 11-3. 이용약관동의 개별체크
   
   // 11-4-1) 무료배송 .... 체크하면 SNS, 이메일 체크된다.
   // 11-4-2) 무료배송 .... 체크해제하면 SNS, 이메일 체크해제된다.

   const onChangeService=(e)=>{

      if( e.target.checked===true ){

            if( e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SNS')===false && state.이용약관동의.includes('이메일')===false  ){
               setState({
                  ...state,
                  이용약관동의: [...state.이용약관동의, e.target.value, 'SNS', '이메일']
               })
            }
            else if( e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SNS')===true && state.이용약관동의.includes('이메일')===false  ){
               setState({
                  ...state,
                  이용약관동의: [...state.이용약관동의, e.target.value, '이메일']
               })
            }
            else if( e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SNS')===false && state.이용약관동의.includes('이메일')===true ){
               setState({
                  ...state,
                  이용약관동의: [...state.이용약관동의, e.target.value, 'SNS']
               })
            }
            else if( e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)' && state.이용약관동의.includes('SNS')===true && state.이용약관동의.includes('이메일')===true ){
               setState({
                  ...state,
                  이용약관동의: [...state.이용약관동의, e.target.value]
               })
            }
            else if( e.target.value==='SNS' && state.이용약관동의.includes('이메일')===true ){
               setState({
                  ...state,
                  이용약관동의: [...state.이용약관동의, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)']
               })
            }
            else if( e.target.value==='이메일' && state.이용약관동의.includes('SNS')===true ){
               setState({
                  ...state,
                  이용약관동의: [...state.이용약관동의, e.target.value, '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)']
               })
            }
            else{
               setState({
                  ...state,
                  이용약관동의: [...state.이용약관동의, e.target.value]
               })
            }

           
      }
      else{ // 체크해제 하면 삭제 => 체크해제한 항목만 제외하고 나머지모두 저장한다.(배열이 재구성)

         
         if(e.target.value==='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'){
            // 무료배송... 삭제1
            // SNS        삭제2
            // 이메일      삭제3
            let imsi = state.이용약관동의.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')
            imsi = imsi.filter((item)=>item!=='SNS');
            imsi = imsi.filter((item)=>item!=='이메일');
            setState({
               ...state,
               이용약관동의: imsi
            })
         }
         else if(e.target.value==='SNS' && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')===true && state.이용약관동의.includes('이메일')===true ){
            let imsi = state.이용약관동의.filter((item)=>item!=='SNS')
            imsi = imsi.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
            setState({
               ...state,
               이용약관동의: imsi
            })
         }
         else if(e.target.value==='이메일' && state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')===true && state.이용약관동의.includes('SNS')===true ){
            let imsi = state.이용약관동의.filter((item)=>item!=='이메일')
            imsi = imsi.filter((item)=>item!=='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)');
            setState({
               ...state,
               이용약관동의: imsi
            })
         }
         else{
            setState({
               ...state,
               이용약관동의: state.이용약관동의.filter((item)=>item!==e.target.value)
            })
         }
         
        

      }
   }


   // 11-4 개별체크하는데 7개 모두체크되면(배열이 7개가 다 찼다)
   // 그러면 전체동의가 체크되게한다.




 
 
   // 실행 주기(라이프 사이클)
   // 화면에 태그가 실행되서 화면이 그려지는 형태 마운트 => 유즈이펙트
   React.useEffect(()=>{

      if( timerEnd===true ){  // 유효시간 3분 경과하면
         setState({
            ...state,
            isModal: true,     // 모달 열기
            modalMsg: timerMsg // 모달 메시지
         });
      }
      
   }, [timerEnd]);  // [] 로딩시 1회만 실행 => [state.아이디] 아이디가 수정이되면 다시 실행



   // 모달 닫기 클릭 이벤트
   const onClickModalClose=(e)=>{
      e.preventDefault();

     
      // 인증번호가 발송되면 닫기 누르자 마자  타이머호출
      if( state.modalMsg.includes('발송')===true ){
         // 카운터 타이머 함수 호출 실행
         timerCounterFn();
      }


      setState({
         ...state,
         isModal: false,
         modalMsg: ''
      });    
   }



////////////////////////////////////////////////////////////////////////////
///  가입하기 버튼 클릭 이벤트 - 폼전송
////////////////////////////////////////////////////////////////////////////
// 가입하기 버튼(타입은 submit) 클릭하면 폼 이벤트 onSubmitForm 함수가 실행된다.
const onSubmitForm=(e)=>{
   e.preventDefault();


      let cnt=0;
      state.이용약관동의.map((item)=>{
         if(item.indexOf('필수')!==-1){  // 찾으면 1씩증가  3이면 필수항목 OK
            cnt++;
         }
      });



      // 유효성검사 : 버튼이 클릭하여 빈값이 있다면 필수항목은 반드시 채워야 한다.
      if(state.아이디===''){
         setState({
            ...state,
            isModal: true,
            modalMsg: '아이디를 입력 해주세요'
         });         
      }
      else if(state.비밀번호===''){
         setState({
            ...state,
            isModal: true,
            modalMsg: '비밀번호를 입력 해주세요'
         });         
      }
      else if(state.비밀번호확인===''){
         setState({
            ...state,
            isModal: true,
            modalMsg: '한번더 비밀번호를 입력 해주세요'
         });         
      }
      else if(state.이름===''){
         setState({
            ...state,
            isModal: true,
            modalMsg: '이름을 입력 해주세요'
         });         
      }
      else if(state.이메일===''){
         setState({
            ...state,
            isModal: true,
            modalMsg: '이메일을 입력 해주세요'
         });         
      }
      else if(state.휴대폰===''){
         setState({
            ...state,
            isModal: true,
            modalMsg: '휴대폰을 입력 해주세요'
         });         
      }
      else if(state.주소1===''){
         setState({
            ...state,
            isModal: true,
            modalMsg: '주소를  검색 해주세요'
         });         
      }
      else if(state.주소2===''){
         setState({
            ...state,
            isModal: true,
            modalMsg: '나머지 주소를  입력 해주세요'
         });         
      }
      else if( cnt < 3 ){
         setState({
            ...state,
            isModal: true,
            modalMsg: '이용약관동의 필수항목 3개 체크하세요'
         });         
      }
      // 중복확인(아이디, 이메일), 휴대폰인증확인
      else if(state.아이디중복확인===false){
         setState({
            ...state,
            isModal: true,
            modalMsg: '아이디 중복확인 해주세요'
         });         
      }
      else if(state.이메일중복확인===false){
         setState({
            ...state,
            isModal: true,
            modalMsg: '이메일 중복확인 해주세요'
         });         
      }
      else if(state.휴대폰인증확인===false){
         setState({
            ...state,
            isModal: true,
            modalMsg: '휴대폰 인증확인 해주세요'
         });         
      }
      else {

            ////////////////////////////////////////////////
            // 모든 항목 체크 끝나면 전송 준비 완료이면 폼전송
            ////////////////////////////////////////////////
            const newFormData = new FormData(); // 폼데이터 생성자 만들기
            newFormData.append('user_id',       state.아이디);
            newFormData.append('user_pw',       state.비밀번호);
            newFormData.append('user_name',     state.이름);
            newFormData.append('user_email',    state.이메일);
            newFormData.append('user_hp',       state.휴대폰);
            newFormData.append('user_addr',     `${state.주소1} ${state.주소2}` );
            newFormData.append('user_gender',   state.성별 );
            newFormData.append('user_birth',    `${state.생년}-${state.생월}-${state.생일}` );
            newFormData.append('user_add_input',`${state.추가입력사항} ${state.추천인아이디} ${state.참여이벤트명}` );
            newFormData.append('user_service',  state.이용약관동의 );
            newFormData.append('user_gaib_date', `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`);

            axios({
               url: 'https://moonjong.co.kr/cra_cors7/member_form_insert_test.php',
               method: 'POST',
               data: newFormData
            })
            .then((res)=>{ // 성공시 응답 Response

                  console.log( res.data );

                  // 가입정보 전송요청Request => 서버 => member_form_insert.php
                  // SQL => INSERT INTO 테이블이름 
                  // 폼전송된 회원정보를 받아서 데이터베이스에 저장한다.
                  // 1. 폼정보 전송 => 받아줄 php sql 작성
                  // 2. 변수 받는걸 테스트

                  // 가입완료시 성공메시지 모달창 띄우기
                  if(res.data.includes('성공')===true){
                     setState({
                        ...state,
                        isModal: true,
                        modalMsg: '회원가입을 감사드립니다.'
                     });   
                  }
                  else{
                     setState({
                        ...state,
                        isModal: true,
                        modalMsg: '회원가입을 다시 시도해 주세요'
                     });  
                  }
                 

            })
            .catch((err)=>{  // 실패시 에러메시지
               console.log(err);
            });


      }

}






   return (
      <>
        <main id='sub' className='sub5'>
          <section id='signUp'>
             <div className="container">
                <div className="title">
                   <h2>회원가입</h2>
                   <span><i>*</i>필수입력사항</span>
                </div>
                <div className="content">
                   <form  onSubmit={onSubmitForm} autocomplement='on' name='signup_form' id='singupForm' method='post' action='./signup.php'>
                      <ul>
                         <li className='row row-01'>
                            <div className='wrap'>
                               <label htmlFor="inputId">아이디<i>*</i></label>
                               <input 
                                 type="text" 
                                 maxLength={16} 
                                 id='inputId' 
                                 name='input_id' 
                                 placeholder='아이디를 입력해주세요'
                                 onChange={onChangeInputId}
                                 value={state.아이디}
                              />
                               <button 
                                 className='id-ok-btn'
                                 onClick={onClickInputId}
                              >중복확인</button>
                            </div>
                            <p className={`isError${ state.isId===true ? ' on':''}`}>{state.msg}</p>
                         </li>
                         <li className='row row-02'>
                            <div className='wrap'>
                               <label htmlFor="inputPw">비밀번호<i>*</i></label>
                               <input 
                                 type="text" 
                                 id='inputPw' 
                                 name='input_pw' 
                                 placeholder='비밀번호를 입력해주세요'
                                 onChange={onChangeInputPw}
                                 value={state.비밀번호}
                              />
                            </div>
                            <p className={`isError${ state.isPw===true ? ' on':''}`}>{state.msg}</p>
                         </li>
                         <li className='row row-03'>
                            <div className='wrap'>
                               <label htmlFor="inputPw2">비밀번호확인<i>*</i></label>
                               <input 
                                 type="text" 
                                 id='inputPw2' 
                                 name='input_pw2' 
                                 placeholder='비밀번호를 한번 더 입력해주세요'
                                 onChange={onChangeInputPw2}
                                 value={state.비밀번호확인}
                              />
                            </div>
                            <p className={`isError${ state.isPwOk===true ? ' on':''}`}>{state.msg}</p>
                         </li>
                         <li className='row row-04'>
                            <div className='wrap'>
                               <label htmlFor="inputName">이름<i>*</i></label>
                               <input 
                                 type="text" 
                                 id='inputName' 
                                 name='input_name' 
                                 placeholder='이름을 입력해주세요'
                                 onChange={onChangeInputName}
                                 value={state.이름}
                              />
                            </div>
                           <p className={`isError${ state.isName===true ? ' on':''}`}>{state.msg}</p>
                         </li>
                         <li className='row row-05'>
                            <div className='wrap'>
                               <label htmlFor="inputEmail">이메일<i>*</i></label>
                               <input 
                                 type="text" 
                                 id='inputEmail' 
                                 name='input_email' 
                                 placeholder='예: marketkurly@kurly.com'
                                 onChange={onChangeInputEmail}
                                 value={state.이메일}
                              />
                               <button 
                                 className='email-ok-btn'
                                 onClick={onClickEmailOk}
                              >중복확인</button>
                            </div>
                            <p className={`isError${ state.isMaile===true ? ' on':''}`}>{state.msg}</p>
                         </li>                     
                         <li className='row'>
                            <div className='wrap'>
                               <label htmlFor="inputHp">휴대폰<i>*</i></label>
                               <input 
                                 type="text" 
                                 id='inputHp' 
                                 maxLength={11} 
                                 name='input_hp' 
                                 placeholder='숫자만 입력해주세요.'
                                 onChange={onChangeHpInput}
                                 value={state.휴대폰}
                                 ref={refHp}
                              />
                               <button  
                                 className={`hp-res-num-btn${state.isHp?'':' on'}`} 
                                 disabled={state.isHp}
                                 onClick={onClickHpBtn}
                              >인증번호 받기</button>
                               <button 
                                 className={`hp-res-num-btn2${state.isHpNum2?' on':''}`}
                                 onClick={onClickHpNum2Btn}
                              >다른번호 인증</button>
                            </div>
                            <p className='isError on'>{state.msgHp}</p>
                         </li>                     
                         <li className={`row row-06${state.isHpNum?' on':''}`}>
                            <div className='wrap'>                          
                               <input 
                                 type="text" 
                                 id='inputHpnum' 
                                 name='input_hp_num' 
                                 placeholder='숫자만 입력해주세요.'
                                 onChange={onChangeInputHpnum}  /* 입력인증번호 */
                                 value={state.입력인증번호}
                              />
                               <span className='count-timer'>
                                  <em className='minute'>{minutes}</em>
                                  <i>:</i>
                                  <em className='second'>{seconds}</em>
                               </span>
                               <button 
                                 className='hp-ok-num-btn'
                                 onClick={onClickHpOkBtn}
                              >인증번호 확인</button>
                            </div>
                         </li>                     
                         <li className={`row row-07${state.isAddress?' on':''}`}>
                            <div className='wrap'>
                               <label htmlFor="inputAdd1">주소<i>*</i></label>
                               <input 
                                 type="text" 
                                 id='inputAdd1' 
                                 name='input_addr1' 
                                 placeholder='주소검색'
                                 onChange={onChangeAddress1}
                                 onFocus={onChangeAddress1}
                                 value={state.주소1}
                              />
                               <button 
                                 onClick={onClickAddressSearchBtn}  
                                 className='addr-research-btn'
                              ><img src="./img/ico_search.svg" alt=""/>재검색</button>
                            </div>
                         </li>                     
                         <li className={`row row-08${state.isAddress?' on':''}`}>
                            <div className='wrap'>
                              
                               <input 
                                 type="text" 
                                 id='inputAdd2' 
                                 name='input_addr2' 
                                 placeholder='나머지 주소 입력하세요.'
                                 onChange={onChangeAddress2}
                                 value={state.주소2}
                              />
                               
                            </div>
                         </li>                     
                         <li className={`row row-09${state.isAddress?' on':''}`}>
                            <div className='wrap'>
                               <label htmlFor="inputAdd1">주소<i>*</i></label>
                               <button 
                                 className='addr-search-btn'
                                 onClick={onClickAddressSearchBtn}
                              ><img src="./img/ico_search.svg" alt=""/>주소검색</button>
                               
                            </div>
                         </li>                     
                         <li className='row row-10'>
                            <div className='wrap'>
                               
                               <h4>샛별배송</h4>
                               <h5>배송지에 따라 상품 정보가 달라질 수 있습니다.</h5>
    
                            </div>
                         </li>                     
                         <li className='row row-11'>
                            <div className='wrap'>
                               
                               <label htmlFor="">성별</label>
    
                               <label className='radio' htmlFor="male">
                                    <input 
                                       type="radio" 
                                       name='gender' 
                                       id='male' 
                                       className='gender-btn' 
                                       value='남자'
                                       onChange={onChangeGender}
                                       checked={state.성별.includes('남자')}
                                    />남자</label>                   
                               <label className='radio' htmlFor="female">
                                    <input 
                                       type="radio" 
                                       name='gender' 
                                       id='female' 
                                       className='gender-btn' 
                                       value='여자'
                                       onChange={onChangeGender}
                                       checked={state.성별.includes('여자')}
                                    />여자</label> 
                               <label className='radio' htmlFor="unSelect">
                                    <input 
                                       type="radio" 
                                          name='gender' 
                                          id='unSelect' 
                                          className='gender-btn' 
                                          value='선택안함' 
                                          onChange={onChangeGender} 
                                          checked={state.성별.includes('선택안함')}
                                    />선택안함</label> 
    
                            </div>
                         </li>                     
                         <li className='row row-12'>
                            <div className='wrap'>
                               <label htmlFor="">생년월일</label>
                               <div className="birth-box">
                                  <input 
                                    type="text" 
                                    className='birth' 
                                    name='year' 
                                    id='year' 
                                    placeholder='YYYY'
                                    onChange={onChangeYear}
                                    value={state.생년}
                                    maxLength={4}
                                 />
                                  <i>/</i>
                                  <input 
                                    type="text" 
                                    className='birth'  
                                    name='month' 
                                    id='month' 
                                    placeholder='MM'
                                    onChange={onChangeMonth}
                                    value={state.생월}
                                    maxLength={2}
                                 />
                                  <i>/</i>
                                  <input 
                                    type="text" 
                                    className='birth' 
                                    name='date' 
                                    id='date' 
                                    placeholder='DD'
                                    onChange={onChangeDate}
                                    value={state.생일}
                                    maxLength={2}
                                 />
                               </div>                              
                            </div>
                            <p className={`isError${state.isBirth?' on':''}`}>{state.msgBirth}</p>
                         </li>   
                         <li className='row row-13'>
                            <div className='wrap'>
                               
                               <label htmlFor="">추가입력 사항</label>
    
                               <label className='radio' htmlFor="add_input1">
                                    <input 
                                       type="radio" 
                                       name='add_input' 
                                       id='add_input1' 
                                       className='add-input-btn' 
                                       value='친구초대 추천인 아이디'
                                       onChange={onChnageAddInput}
                                       checked={state.추가입력사항.includes('친구초대 추천인 아이디')}
                                    />친구초대 추천인 아이디</label>                   
                               <label className='radio' htmlFor="add_input2">
                                    <input 
                                       type="radio" 
                                       name='add_input' 
                                       id='add_input2' 
                                       className='add-input-btn' 
                                       value='참여 이벤트명'
                                       onChange={onChnageAddInput}
                                       checked={state.추가입력사항.includes('참여 이벤트명')}
                                    />참여 이벤트명</label> 
    
                            </div>
                         </li>                     
                         <li className={`row row-14${state.isAddInput?' on':''}`}>
                            <div className='wrap'>
                               
                               <input 
                                 type="text" 
                                 name="add_input_box" 
                                 id="addInputBox" 
                                 placeholder={state.addInputPlacehoder}
                                 onChange={onChageAddInput2}
                                 value={state.추천인아이디}
                              />                         
                               {
                                 state.추가입력사항.includes('친구초대 추천인 아이디') && (
                                    <button 
                                       onClick={onClickAddInputIdCheck} 
                                       className='add-input-ok-btn'
                                    >아이디 확인</button>
                                 )
                               }
    
                            </div>
                         </li>                     
                         <li className={`row row-14${state.isAddInput?' on':''}`}>
                            <div className='wrap'>
                                                         
                               <p className='add-input-p'>
                                 {state.addInputText}                                 
                               </p>
    
                            </div>
                         </li>                     
    
                         <li className='row row-15'>
    
                           <hr/> 
    
                         </li>
                         
                         <li className='row row-16'>
                            <div className='wrap'>
                               <label htmlFor="" className='check-label'>이용약관동의<i>*</i></label>
                               <label htmlFor="checkAll" className='check-box'>
                                 <input 
                                    type="checkbox" 
                                    name='check_all' 
                                    id='checkAll' 
                                    value='전체 동의합니다.'
                                    onChange={onChangeCheckAll}
                                    checked={state.이용약관동의.length===7?true:false}
                                 />전체 동의합니다.</label>
                               <p>선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를 이용할 수 있습니다.</p>
                            </div>
                         </li>
                         <li className='row row-17 row-check'>
                            <div className='wrap'>                           
                               <label htmlFor="check1" className='check-box'>
                                    <input 
                                       type="checkbox" 
                                       name='check1' 
                                       id='check1' 
                                       className='chk-btn' 
                                       value='이용약관 동의(필수)'
                                       checked={state.이용약관동의.includes('이용약관 동의(필수)')}
                                       onChange={onChangeService}
                                    />이용약관 동의</label><i>(필수)</i>
                            </div>
                         </li>
                         <li className='row row-18 row-check'>
                            <div className='wrap'>                           
                               <label htmlFor="check2" className='check-box'>
                                    <input 
                                       type="checkbox" 
                                       name='check2' 
                                       id='check2' 
                                       className='chk-btn' 
                                       value='개인정보 수집∙이용 동의(필수)'
                                       checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(필수)')}
                                       onChange={onChangeService}
                                    />개인정보 수집∙이용 동의</label><i>(필수)</i>                         
                            </div>
                         </li>
                         <li className='row row-19 row-check'>
                            <div className='wrap'>                           
                               <label htmlFor="check3" className='check-box'>
                                    <input 
                                       type="checkbox" 
                                       name='check3' 
                                       id='check3'
                                       className='chk-btn' 
                                       value='개인정보 수집∙이용 동의(선택)'
                                       checked={state.이용약관동의.includes('개인정보 수집∙이용 동의(선택)')}
                                       onChange={onChangeService}
                                    />개인정보 수집∙이용 동의</label><i>(선택)</i>                       
                            </div>
                         </li>
                         <li className='row row-20 row-check'>
                            <div className='wrap'>                           
                               <label htmlFor="check4" className='check-box'>
                                    <input 
                                       type="checkbox" 
                                       name='check4' 
                                       id='check4' 
                                       className='chk-btn' 
                                       value='무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)'
                                       checked={state.이용약관동의.includes('무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)')}
                                       onChange={onChangeService}
                                    />무료배송, 할인쿠폰 등 혜택/정보 수신 동의</label><i>(선택)</i>
                            </div>
                         </li>
                         <li className='row row-21 row-check'>
                            <div className='wrap'>                           
                               <label htmlFor="check5" className='check-box'>
                                    <input 
                                       type="checkbox" 
                                       name='check5' 
                                       id='check5' 
                                       className='chk-btn' 
                                       value='SNS'
                                       checked={state.이용약관동의.includes('SNS')}
                                       onChange={onChangeService}
                                    />SNS</label>                           
                               <label htmlFor="check6" className='check-box'>
                                    <input 
                                       type="checkbox" 
                                       name='check6' 
                                       id='check6' 
                                       className='chk-btn' 
                                       value='이메일'
                                       checked={state.이용약관동의.includes('이메일')}
                                       onChange={onChangeService}
                                    />이메일</label>                           
                               <p>동의 시 한 달간 [5%적립] + [2만원 이상 무료배송] 첫 주문 후 안내</p>
                            </div>
                         </li>
                         <li className='row row-22 row-check'>
                            <div className='wrap'>                           
                               <label htmlFor="check7" className='check-box'>
                                    <input 
                                       type="checkbox" 
                                       name='check7' 
                                       id='check7' 
                                       className='chk-btn' 
                                       value='본인은 만 14세 이상입니다.(필수)'
                                       checked={state.이용약관동의.includes('본인은 만 14세 이상입니다.(필수)')}
                                       onChange={onChangeService}
                                    />본인은 만 14세 이상입니다.</label><i>(필수)</i>
                            </div>
                         </li>                     
                      </ul>
    
                      <div className="button-box">
                         <button type='submit' className='submit-btn'>가입하기</button>
                      </div>
    
                   </form>
                </div>
             </div>    
          </section>      
        </main>
             
         {/*  모달창  */}
         {
            state.isModal && (
               <div id="modal">
                  <div className="wrap">
                     <div className="container">
                        <div className="message-box">
                           <h2 className='message'>{state.modalMsg}</h2>  
                        </div>
                        <div className="button-box">
                           <button onClick={onClickModalClose} className='modal-close-btn'>확인</button>
                        </div>
                     </div>
                  </div>
               </div>
            )
         }
      </>
    );
};

export default SingnUpComponent;

// 기본프롭스 설정
SingnUpComponent.defaultProps = {
   회원: {
      // 모달
      isModal: false,
      modalMsg: '',
      
      아이디: '', // String
      msg: '',
      isId: false,

      아이디중복확인: false,  // Boolean

      비밀번호: '', // String
      isPw : false,
      
      비밀번호확인: false,  // Boolean
      isPwOk: false,

      이름:'', // String
      isName: false,


      이메일:'', // String
      isMaile: false,

      이메일중복확인: false,  // Boolean


      휴대폰:'', // String
      isHp: true, // 버튼 사용불가
      msgHp:'',
      발송인증번호: '',
      입력인증번호: '',
      isHpNum: false,
      isHpNum2: false,
      
      인증번호: 0, // Number
      휴대폰인증확인: false,  // Boolean


      주소1:'', // String
      주소2:'', // String
      isAddress: false, // 클래스 on


      성별: '선택안함', // String


      생년: '', // String
      생월: '', 
      생일: '', 
      isBirth: false, 
      msgBirth: '', 


      
      추가입력사항: '',
      추천인아이디:'',
      isAddInput: false,
      addInputText: '',
      addInputPlacehoder: '',

      약관동의: [
          '이용약관 동의(필수)',
          '개인정보 수집∙이용 동의(필수)',
          '개인정보 수집∙이용 동의(선택)',
          '무료배송, 할인쿠폰 등 혜택/정보 수신 동의(선택)',
          'SNS',
          '이메일',
          '본인은 만 14세 이상입니다.(필수)'
      ],
      이용약관동의: []
   }
}