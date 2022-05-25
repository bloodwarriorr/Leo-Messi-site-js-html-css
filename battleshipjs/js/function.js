function NewGameSetup()
{
    //קביעת גודל המשחק על פי סימון תיבת הטקסט
    gameSize=document.querySelector("input[name=game-size]:checked").dataset.size
    //סוג צוללת מוקלד
    let subs=document.querySelectorAll(`.subtype`)
    //טבלת תוצאות
    let subInfoTd=document.querySelectorAll(`.Sub-Info`)
    

    for (let i = 0; i < subs.length; i++) {
        subTypeNum[i]=parseInt(subs[i].value)//שמירת ערך כמות הצוללות המבוקשת לכל סוג
        subInfoTd[i].innerHTML=subTypeNum[i]// אתחול טבלת התוצאות בערך הנקלט
        
    }
    totalSub=subTypeNum.reduce((a,b)=>a+b)
    //זימון פונקציית בניית הטבלה
    BuildTable()
  
}


function BuildTable() {
   //יצירת טבלה, יצירת data 
    let table = `<table>`
    let cell=0
    for (let tr = 0; tr<gameSize; tr++) {
      table+=`<tr>`
      for (let td = 0; td <gameSize; td++) {
        if(td==0)
        table+=`<td data-bounds="true" data-cell="${cell}" ></td>`
        else {
            table+= `<td></td>`
        }
          cell++
      }
      table +=`</tr>`
        
    }
table+= `</table>`
   document.querySelector(`#gameboard`).innerHTML=table
   //זימון לפונקצייה אשר אחראית על סידור הצוללות
   SetSubs()
   
   

}

function SetSubs()
{
    //תפיסת כל תאי הטבלה
    let ALllTds=document.querySelectorAll(`#gameboard td:not([data-bound="true"])`)

    for(let i=0;i<subTypeNum.length;i++)
    {
        for(let j=0;j<subTypeNum[i];j++)
        {
            while(!(SubCreator(i,ALllTds))){}
        }
    }
    //האזנה לאירועי לחיצה על תאי הטבלה וזימון הפונקציה אשר מטפלת באירוע
    TdClick=document.querySelectorAll(`#gameboard td`)
    for (let i = 0; i < TdClick.length; i++) {
        TdClick[i].addEventListener(`click`,TdClickHandler)
        
    }
}

function SubCreator(subtype)
{
    //פונקציה אשר אחראית על ייצור הצוללות, שולחת בכל פעם מיקום לפונקציה הרנדומלית על מנת שתמקם את הצוללת שנוצרה במיקום אחר
    // נרוץ על כל סוג צוללת בנפרד בלולאה, על פי כמות הצוללות מאותו הסוג, ונשייך לתא המכיל אותן תכונות מתאימות.
    //הלולאה תרוץ מ2 ומעלה מכיוון שסוג הצוללות הוא 2-5
let randomSubs=Randomizer()
let Tds=document.querySelectorAll(`#gameboard td`)

for(let i=0;i<subtype+2;i++)
{
    if(Tds[randomSubs+i]==undefined)
    return false
    else if(Tds[randomSubs+i].getAttribute(`data-sub`))
    return false
    else if(i>0&&Tds[randomSubs+i].getAttribute("data-bounds"))
    return false
}
//לולאה אשר משייכת תכונת דאטה מתאימה על מנת שנדע מהיכן הצוללת מתחילה והיכן מסתיימת.
for(let i=0;i<subtype+2;i++)
{
Tds[randomSubs+i].setAttribute(`data-sub`,`${subtype+2}`)
Tds[randomSubs+i].setAttribute(`data-sub-start`,`${randomSubs}`)
}
subTypePosition.push(randomSubs)
return true
}

function Randomizer()
{
    //פונקציה אשר אחראית על מיקום הצוללות במיקום רנדומלי, ומוודאת שלא יתנגשו זה בזה, או שיחרגו מגבול לוח המשחק.
    let random

    for (let i = 0; i < totalSub; i++) {
      random=Math.floor(Math.random()*gameSize*gameSize)
      if(subTypePosition.indexOf(random)!=-1)
      {
         i--
         continue
      }
        else
           
        return random
    }
    
    
}

function TdClickHandler(event)
{
//פונקציה המקבלת אירוע לחיצה ושומרת אותו בתור אלמנט, מזמנת את פונקציית בדיקת הפגיעות ושולחת לה את אירוע הלחיצה
let element=event.target
MarkHits(element)
}

function MarkHits(element)
{
    //פונקצייה אשר אחראית על בדיקת הפגיעות
    //בדיקה האם האלמנט קיבל את התכונה של data מסויים
    //אם האלמנט קיבל שיוך, נוסיף לתא הטבלה את הקלאס של פגיעה, נפעיל את פונקציית השמע.
    if(element.getAttribute("data-sub"))
    {
    element.classList.add(`hit`)
    audioHit.play()
    audioHit.currentTime=0;
    //הגדרת משתנה אשר קובע האם כל הצוללת טבעה, על ידי זימון הפונקצייה ושליחת האלמנט אליה
    let isSunk=IsSunk(element)
    if(isSunk)
    {
        sunkMsg(element)
    }
    }
    else
    element.classList.add(`sea`)

}

function IsSunk(element)
{//פונקציה אשר בודקת האם הצוללת טבעה.
    //תפיסת כל תאי הטבלה, הגדרת משתנה סוג צוללת, והגדרת משתנה התחלת הצוללת, על מנת שנדע מהיכן לבדוק את הפגיעות.
    // והגדרת מונה בקרה לספור פגיעות על מנת לקבוע האם כלל הצוללת נפגעה
    let tds=document.querySelectorAll(`#gameboard td`)
    let subType=element.getAttribute("data-sub")
    let subStart=parseInt(element.getAttribute("data-sub-start"))
    let counter=subType
    //לולאה אשר רצה על כל סוג צוללת בנפרד, ועל כל צוללת בנפרד, אם כל התאים אשר מייצגים צוללת קיבלו את הקלאס המתאים,
    //נבצע הסרה של 1 מכמות הצוללות. נבדוק לאחר מכן האם המונה שווה ל0 כלומר הצוללת טבעה במלואה, ונחסיר צוללת אחת מטבלת הצוללות על פי סוג
    // .בכל פעם שצוללת שלמה טבעה, נציג הודעה אשר היא הוטבעה ותמונה מתאימה בתא הטבלה
    for(let i=0 ;i<subType; i++)
    {
        console.log(tds[subStart+i])
        if(!(tds[subStart+i].classList.contains(`hit`)))
        return false
        else 
        counter--
    }
    if(counter==0)
    {
        audioHit.pause()
        audioSunk.play()
        for (let i = 0; i < subType; i++) {
            tds[subStart+i].innerHTML=`<img src="../battleshipjs/Images/boom.png">`
        }
        totalSub--
        if(totalSub!=0)
        {
        document.querySelector(`.win h1`).innerHTML+=`sunk`
        setTimeout(function() {
            document.querySelector(`.win h1`).innerHTML=``
        
        },1000)
    }
    return true
    }
}
function sunkMsg(element)
{
    //פונקציה אשר מציגה הודעה בכל פעם שיש "בול פגיעה",מחסירה אחד מטבלת התוצאות אם הצוללת טבעה, אם מתבצעת פגיעה 
    //באחד מתאי הצוללת, תוצג הודעת בום, עם תמונה מתאימה וצליל מתאים. לבסוף אם כלל הצוללות טבעו, תציג הודעה שהמשתמש הטביע את כלל הצוללות.
let subType=element.getAttribute("data-sub")
let subInfoTd=document.querySelectorAll(`.Sub-Info`)
subInfoTd[subType-2].innerHTML --
subInfoTd[subType-2].classList.add(`minus`)
let FullBoom=document.querySelector(`.msg`)
FullBoom.innerHTML=`<img src ="../battleshipjs/Images/boombig.png">`
let fullBoomImg=document.querySelector(`.msg img`)

setTimeout(function(){fullBoomImg.parentNode.removeChild(fullBoomImg)},2000)
if(subInfoTd[subType-2].innerHTML!=0)
setTimeout(function(){subInfoTd[subType-2].classList.remove(`minus`)},500)

if(totalSub==0)
{
document.querySelector(`.win h1`).innerHTML=`You sunk all battleship`
}

}

function NewGameReload(){
    location.reload();
}

function GoToHomePage(){
    location.href="../index.html"
}