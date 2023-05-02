
import React from 'react';
import $ from 'jquery';


function Section6Component() {


    React.useEffect(()=>{
        const newDate = new Date();

        function saleEndTimer(){
            // 종료싯점이 22:00:00
            
            let start = new Date( `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()} 19:30:00`); //매일 밤 10시 타임세일종료싯점
            let nowDate = new Date(); //타임세일시작싯점
            
            // console.log('세일 종료 일 시간 : '+ start );
            // 세일 시작 일 시간 : Fri Apr 07 2023 19:30:00 GMT+0900 (한국 표준시)

            // 2. 셋팅 5시간
            start.setHours(start.getHours()+3); //매일 6시부터 + 5시간 설정(세터함수())
            // start.setDate(start.getDate()+1); //1일(24시간) 설정(세터함수())
            
            // console.log('세일 종료 시간 : '+  start );
            // console.log('현재 시간 : '+  nowDate );
             // 세일 종료 일 시간 : Sat Apr 08 2023 19:30:00 GMT+0900 (한국 표준시)


          
            // 3. 세일 종료 시간 현재시간과 차이 계산 = 세일 종료 남은 시간
            let  endTime = start - nowDate;

            // console.log( endTime );  // 1/1000 초 단위 밀리초

            // 4. 일, 시, 분, 초
            // 일
            let endDate = Math.floor( endTime/(60*60*24*1000) );  // endTime/60분*60초*24시간*1000
            // console.log( endDate + '일' );

            // 시
            let endHour = Math.floor( (endTime/(60*60*1000))%24 );  // (endTime/(60분*60초*1000)) % 24
            // console.log( endHour + '시' );

            // 분
            let endMinute = Math.floor( (endTime/(60*1000))%60 );  // (endTime/(60초*1000)) % 60
            // console.log( endMinute + '분' );
          
            // 초
            let endSecond = Math.floor( endTime/1000%60 );    // endTime/1000%60
            // console.log( endSecond + '초' );

            function displayTime(){
                $('#section6 .timer-second').text( endSecond<10 ? `0${endSecond}`:endSecond ); // 초
                $('#section6 .timer-minute').text( endMinute<10 ? `0${endMinute}`:endMinute  ); // 분
                $('#section6 .timer-houre') .text( endHour<10 ? `0${endHour}`:endHour  ); // 
            }
                

            if( nowDate >= start){
                endSecond=0;
                endMinute=0;
                endHour=0;
                displayTime();
            }
            else {
                displayTime();
            }




        }
    
        let setId = 0;
        clearInterval(setId);
        setId = setInterval(saleEndTimer, 1000);

        
        if(`${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`==='22:00:00' ){
            clearInterval(setId);   
            return;
        }


    },[])

    return (
        <section id="section6">
            <div className="container">
                <div className="content">
                    <ul>
                        <li>
                            <div className="gap">
                                <h2>선착순 1천 개 한정</h2>
                                <h3>매일 저녁6시 한정수량 오픈!</h3>
                                <div className="timer-box">
                                    <span className="timer-svg-image">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36" preserveAspectRatio="xMidYMid meet" style={{width:'100%', height:'100%', transform: 'translate3d(0px, 0px, 0px)'}}><defs><clipPath id="__lottie_element_132"><rect width="36" height="36" x="0" y="0"></rect></clipPath></defs><g clipPath="url(#__lottie_element_132)"><g transform="matrix(1,0,0,1,3.75,3.75)" opacity="1" style={{display:'block'}}><g opacity="1" transform="matrix(1,0,0,1,14.25,14.25)"><path fill="rgb(189,118,255)" fillOpacity="1" d=" M14,0 C14,7.73199987411499 7.73199987411499,14 0,14 C-7.73199987411499,14 -14,7.73199987411499 -14,0 C-14,-7.73199987411499 -7.73199987411499,-14 0,-14 C7.73199987411499,-14 14,-7.73199987411499 14,0z"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="2" d=" M14.25,8.293999671936035 C14.25,8.293999671936035 14.25,14.293999671936035 14.25,14.293999671936035"></path></g><g opacity="1" transform="matrix(1,0,0,1,0,0)"><path strokeLinecap="round" strokeLinejoin="round" fillOpacity="0" stroke="rgb(255,255,255)" strokeOpacity="1" strokeWidth="2" d=" M20.25,14.293999671936035 C20.25,14.293999671936035 14.25,14.293999671936035 14.25,14.293999671936035"></path></g></g></g></svg>
                                    </span>
                                    <span className="timer-houre">04</span><i>:</i><span className="timer-minute">59</span><i>:</i><span className="timer-second">59</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="gap">
                            <div className="img-box">                                    
                                    <img src="./img/sec5_img1.jpg" alt=""/>                                    
                                    <span><img src="./img/cart_fill.svg" alt=""/></span>                                    
                            </div> 
                            <div className="txt-box">
                                    <h2>[비오젠트라] 야채 스톡</h2>
                                    <h3><strong>7%</strong><em>7,905원</em></h3>
                                    <h4><s>8,500원</s></h4>
                                    <h5>후기<span>151</span></h5>
                            </div> 
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section> 
    );
};

export default Section6Component;