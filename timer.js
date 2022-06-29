let audio = new Audio('sing.mp3');

//ДИСПЛЕЙ РАБОЧЕГО ВРЕМЕНИ-----------------------------------------------
let minute = document.querySelector('.minute');
minute.innerHTML = "00";

let second = document.querySelector('.second');
second.innerHTML = "00";

//ДИСПЛЕЙ ВРЕМЕНИ ОТДЫХА-----------------------------------------------
let Rminute = document.querySelector('.R-minute');
Rminute.innerHTML = "00";

let Rsecond = document.querySelector('.R-second');
Rsecond.innerHTML = "00";

//КНОПКИ ДЛЯ НАЙСТРОЙКИ РАБОЧЕГО ВРЕМЕНИ----------------------------------
let start = document.querySelector('.start');
start.addEventListener('click', go);

function go(){
    if(second.innerHTML > 0 || minute.innerHTML > 0){
        work();
    }else{
        relax();
    }
    start.removeEventListener('click', go);
}

;(function(){
    let stop = document.querySelector('.stop');
     stop.addEventListener('click', function(){
         start.addEventListener('click', go);
         clearInterval(t);
     }) 
 })()

 let startMinute = '00';
;(function(){
    let minuteUp = document.querySelector('.minuteUp');
        minuteUp.addEventListener('click', function(){
            up(minute);
            startMinute = minute.innerHTML;
        });
})()    

;(function(){
    let minuteDown = document.querySelector('.minuteDown');
        minuteDown.addEventListener('click', function(){
            down(minute);
            startMinute = minute.innerHTML;
        })
})()

let startSecond = '00';
;(function(){
    let secondUp = document.querySelector('.secondUp');
        secondUp.addEventListener('click', function(){
            up(second);
            startSecond = second.innerHTML;
        })
})()

;(function(){
    let secondDown = document.querySelector('.secondDown');
        secondDown.addEventListener('click', function(){
            down(second);
            startSecond = second.innerHTML;
        })
})()

//КНОПКИ ДЛЯ ВРЕМЕНИ ОТДЫХА--------------------------------------------
let startRminute = '00';
;(function(){
    let RminuteUp = document.querySelector('.R-minuteUp');
        RminuteUp.addEventListener('click', function(){
            up(Rminute);
            startRminute = Rminute.innerHTML;
        });
})() 

;(function(){
    let RminuteDown = document.querySelector('.R-minuteDown');
        RminuteDown.addEventListener('click', function(){
            down(Rminute);
            startRminute = Rminute.innerHTML;
        })
})()

let startRsecond
;(function(){
    let RsecondUp = document.querySelector('.R-secondUp');
        RsecondUp.addEventListener('click', function(){
            up(Rsecond);
            startRsecond = Rsecond.innerHTML;
        })
})()

;(function(){
    let RsecondDown = document.querySelector('.R-secondDown');
        RsecondDown.addEventListener('click', function(){
            down(Rsecond);
            startRsecond = Rsecond.innerHTML;
        })
})()

//СЧЕТЧИК УВЕЛИЧЕНИЯ И УМЕНЬШЕНИЯ ВРЕМЕНИ
function up(per){
    per.innerHTML++;
    addNull(per);
    newCycle(per);
}

function down(per){
    Mines(per);
    newCycle(per);
}

//ИНЫЕ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
function minesMinute(per1, per2){
    per2.innerHTML = 59;
    per1.innerHTML--;
    addNull(per1);
}

function addNull(per){
    if(per.innerHTML < 10 && per.innerHTML >= 0){
    per.innerHTML = '0'+ per.innerHTML;
}
}

function Mines(per){
    if(per.innerHTML > 0){
    per.innerHTML--;
    addNull(per);
}
}

function newCycle(per){
    if(per.innerHTML > 59){
        per.innerHTML = '00';
    }else if(per.innerHTML < 0){
        per.innerHTML = 59;
}
}

function minesSecond(per){
    per.innerHTML--;
    addNull(per);
}

//СЧЕТЧИК ТАЙМЕРА

let numCycle = 1;
let count = 1;

function work(){
    clearInterval(t);
    func(minute, second); 
}

function relax(){
    clearInterval(t);
    func(Rminute, Rsecond);
}

let t;
function func(num1, num2){
    if(num1.innerHTML > 0 || num2.innerHTML > 0){
        
        let startNewCycle = function(){
            audio.play();
            count++;
        }

    t = setInterval(function(){
    
        minesSecond(num2);
        if(num1.innerHTML > 0 && num2.innerHTML < 0){
            minesMinute(num1, num2);
        }
        
        if(num1.innerHTML < 1 && num2.innerHTML < 1){
            if(numCycle <= userNumCycle){
                if(count % 2 !== 0){
                    Rminute.innerHTML = startRminute;
                    Rsecond.innerHTML = startRsecond;
                    startNewCycle();
                    relax();
                    numCycle++;
                }else{
                    minute.innerHTML = startMinute;
                    second.innerHTML = startSecond;
                    startNewCycle();
                    work();
                }
            }else{
                audio.play();
                clearInterval(t);
                count = 1;
                numCycle = 1;
            }
        }else{start.addEventListener('click', go);}
    },1000)
}}

//Настройка повторов
let setNumCycle = document.querySelector('.setNumCycle');
let userNumCycle = setNumCycle.innerHTML = 1;

;(function(){
    let setPlus = document.querySelector('.setPlus');
    setPlus.addEventListener('click', function(){
        userNumCycle++;
        setNumCycle.innerHTML++;
    })
})()

;(function(){
    let setMines = document.querySelector('.setMines');
    setMines.addEventListener('click', function(){
        if(userNumCycle > 1){
            userNumCycle--;
            setNumCycle.innerHTML--;
        }
    })
})()