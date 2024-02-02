// string sets arr
let stringarrset=['HELLO WORLD', 'HELLO MAN', 'HELLO BUDY', 'ELEPHANT','HANGMAN GAME'];

let isfail=false;
let isSuccess=false;
// random string on load
let tofindstring="";
let thespaces="";
let word=document.querySelector(`.word`);
let imgcnt=1;

window.onload=randomString();
function randomString() {
    tofindstring= stringarrset[Math.floor(Math.random() * stringarrset.length)];
    
    for(let i=0;i<tofindstring.length;i++){
        if(tofindstring[i]==' '){
            thespaces+=' ';
        }
        else{
            thespaces+='-';
        }
    }
    word.innerHTML=thespaces;
}

// success message
function success(){
    document.querySelector('.conclusion').style.zIndex="10";
    let btn=document.querySelector('.conclusion .btn');
    btn.textContent="Play Again!";
    btn.color="green";
}
// failure function
function faliure(){
    document.querySelector('.conclusion').style.zIndex="10";
    let message=document.querySelector('.conclusion h3');message.innerHTML=`<pre>
    You lose!. 
    The correct answer is 
    ${tofindstring}</pre>`;
    message.style.fontSize="20px";
    let btn=document.querySelector('.conclusion .btn');
     btn.style.backgroundColor="lightred";
    btn.style.color="red";
}
// try again button
let tryagainbtn=document.querySelector(".btn");
tryagainbtn.addEventListener("click",()=>{
    window.location.reload();
});



// Click and press handler
function onClickPressHandler(e,str){
    if(isfail || isSuccess){
        return;
    }

    let textcontent='';
    let etarget;
    if(str==='mouse'){
        textcontent=e.target.textContent;
        etarget=e.target;
    }else{
        textcontent=e.key;
        etarget=document.querySelector(`#letter_${textcontent.charCodeAt(0)-97}`)
        console.log(etarget);
        textcontent=etarget.textContent;
    }
    console.log(textcontent);
    if(tofindstring.includes(textcontent)){
        etarget.style.border="2px solid green";
        etarget.style.color="green";
        let tempspaces="";
        for(let i=0; i<tofindstring.length; i++){
            if(tofindstring[i]==textcontent){
                tempspaces+=textcontent;
            }else if(thespaces[i]!=='-'){
                tempspaces+=thespaces[i];
            }else{
                tempspaces+='-';
            }
        }
        thespaces=tempspaces;
        word.innerHTML=thespaces;
        if(!thespaces.includes('-')){
            isSuccess=true;
            success();

        }
    }else{
        etarget.style.border="2px solid red";
        etarget.style.color="red";
        let imgsrc=`./s${imgcnt}.jpg`;
        imgcnt++;
        document.querySelector(`.section1 img`).src=imgsrc;
        if(imgcnt>9){
            isfail=true;
            faliure();
        }
    }
}

for(let i=0;i<26;i++){
     let letter=document.querySelector(`#letter_${i}`);
     letter.addEventListener('click',(e)=>onClickPressHandler(e,'mouse'));
}
document.querySelector('body').addEventListener('keydown',(e)=>onClickPressHandler(e,''));