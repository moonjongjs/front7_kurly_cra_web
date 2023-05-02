    // Object 객체
    // 객체는 구성요소가 속성(프로퍼티스 Propterties)과, 메서드 => 프로퍼티스 + function(){}
    let  obj2 = {
        init: function(){ // 대표 메서드 
           console.log( `this.a = ${this.a}` );
           console.log( `this.b = ${this.b}` );
           this.c(); 
           this.d();  
           console.log( `this.좋아하는과일 =   ${this.좋아하는과일}`  );
           console.log( `this.학생.이름 =   ${this.학생.이름}`  );
           console.log( `this.학생.국어 =   ${this.학생.국어}`  );
           console.log( `this.학생.영어 =   ${this.학생.영어}`  );
           console.log( `this.학생.수학 =   ${this.학생.수학}`  );
           console.log( `this.학생.총점 =   ${this.학생.국어 + this.학생.영어 + this.학생.수학}` );
           console.log( `this.학생.평균 =   ${ (this.학생.국어+this.학생.영어+this.학생.수학)/3 }` );
        },
        a: 100,
        b: 300,
        c: function(){ 
            console.log( `this.a + this.b = ${this.a + this.b}` );
        },
        d: function(){
            console.log( `this.a + this.b + 500 =  ${this.a + this.b + 500}` );
        },
        좋아하는과일: '딸기',
        학생: {
            이름: '이순신',
            국어: 100,
            영어: 99,
            수학: 100
        }

    }
    obj2.init();


    