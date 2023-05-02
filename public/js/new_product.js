(($)=>{

   const obj = {
        init(){
            this.newProduct();
            this.category();
        },
        newProduct(){
           // 데이터 폴더에 저장된 product.json 파일을 
           // 제이쿼리 비동기식 전송방식 API인 제이쿼리.ajax()를 사용
           // 처리한다.
           let txt = '';
           $.ajax({
                url: './data/product.json',
                dataType: 'JSON',
                success:(result)=>{

                    function commaFormat(z){                        
                        // z 값은 숫자이다
                        // 12,000
                        // 콤머외쪽은 반드시 1자이상 숫자가 있어야 한다.
                        // 코머의 오른쪽은 반드시 3자로된 숫자가 있어야한다.
                        // 정규표현식은 반드시 문자열만 변환할 수있다. 
                        // 정규표현식은 RegExp 
                        // 정규표현식 표현식변수 = /정규표현식/;
                        // 정규표현식  숫자 소문자           \d 
                        // 정규표현식  숫자 가아닌것은 대문자 \D
                        // 정규표현식  시작 ^
                        // 정규표현식  끝   $
                        // 정규표현식  1자이상  +
                        // 정규표현식  0자이상  * 한글자도 없을 수도 있다. 
                        // 정규표현식  ?자이상  0자 또는 1문자 대응인데 없을 수도 있고 있을 수 있다.
                        // 변환(치환) 메서드 replace('정규표현식', '$그룹1,$그룹2')
                        // 정규표현식.test(str) 참, 거짓 판별한다.
                        let str = z.toString(); //문자열로 변환(형변환) 숫자(number)=>문자열(string)
                        const regExp = /(^\d+)(\d{3})/;   // 왼쪽1자이상 오른쪽 3자 
                       
                        // 12,300,000
                        while( regExp.test(str) ){ // 왼쪽1자이상, 오른쪽 3자 만족시 참 true 아니면 false
                            // console.log('참 아니면 거짓 판별 test(): ', regExp.test(str) );
                            str = str.replace(regExp, '$1,$2');   
                            // console.log('참 아니면 거짓 판별 test(): ', regExp.test(str) );                         
                        }
                        return str;

                        //return z; //되돌려준값
                        // return  값이 없으면 언디파인드  undefined
                    }

                    result.신상품.map((item, idx)=>{

                        txt+=`<li data-key="list-${idx+1}">`;
                        txt+=`    <div class="col-gap">`;
                        txt+=`        <div class="img-box">`;
                        txt+=`                <img src="./img/sub1/${item.상품이미지}" alt="">`;
                        txt+=`                <span><img src="./img/sub1/${item.카트아이콘}" alt=""></span>`;
                        txt+=`        </div>`;
                        txt+=`        <div class="txt-box">`;
                        txt+=`                <h2>[${item.제조사}] ${item.상품명}</h2>`;
                        txt+=`                <h5>${item.상품정보}</h5>`;
                        txt+=`                <h3>
                                                ${
                                                    item.할인율 > 0 ? `<strong>${Math.round(item.할인율*100)}%</strong>` : ``
                                                }       
                                                <em>${commaFormat(Math.round(item.정가*(1-item.할인율)))}원</em>
                                              </h3>`;
                        txt+=`                ${ item.할인율 > 0 ? `<h4><s>${commaFormat(item.정가)}원</s></h4>`:``}`;
                        txt+=`                <h5>후기<span>151</span></h5>`;
                        txt+=`                ${ item.판매처!=='' ? `<h4>${item.판매처}</h4>`:``}`;
                        txt+=`        </div>`;
                        txt+=`    </div>`;
                        txt+=`</li>`;

                    });

                    $('.new-product').html( txt );

                },
                error:(error)=>{
                    console.log( error );
                }
           }); 


        },
        category(){
            // 카테고리 메뉴 버튼 클릭 이벤트
           const $categoryBtn = $('#section2 .category-btn');
           
            // 토글버튼 슬라이드
            $categoryBtn.on({
                click: function(e){
                    e.preventDefault();
                    $(this).next().slideToggle(300); //slideUp 과 slideDown                    
                    // $(this).children('svg').toggleClass('on');                    
                    $(this).find('svg').toggleClass('on');                    
                }
            });


            // 모달닫기 버튼 클릭 이벤트
            const $modalCloseBtn = $('.modal-close-btn');
            $modalCloseBtn.on({
                click: function(e){
                    e.preventDefault();
                    $('.sub1-modal').removeClass('on');
                }
            });
           
            // 모달닫기 버튼 클릭 이벤트
            const $categoryMoreViewBtn = $('.category-more-view-btn');
            $categoryMoreViewBtn.on({
                click: function(e){
                    e.preventDefault();
                    $('.sub1-modal').addClass('on');
                }
            });
           
        }
   }

   obj.init();


})(jQuery);
