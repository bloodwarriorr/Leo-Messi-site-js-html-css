//טעינת כל המשתמשים
var users = LoadUsers()
var users_images = JSON.parse(localStorage.getItem(`users_images`)) || []
//טעינת משתמש מחובר
var login_user = JSON.parse(sessionStorage.getItem(`login_user`))
var image_user_profile = sessionStorage.getItem(`user_image_profile`) || ""
//בדיקת קלט בדפי הרשמה/עריכת פרופיל
if(location.href.indexOf(`register.html`)!=-1||location.href.indexOf(`editProfile.html`) != -1)
{
let invalids=document.querySelectorAll(`input`)
for (let i = 0; i < invalids.length; i++) {
    invalids[i].addEventListener(`keyup`,()=>RemoveClass(invalids[i]))
}
}
//רשימת ערים
var cities_list = document.querySelector(`#cities`) //add data list
var cityJsonList = SetCitiesList()
//לולאה שרצה על כל הערים במערך
if (cities_list != null) {
    for (let i = 0; i < cityJsonList.length; i++) {
        let option = `<option>${cityJsonList[i].name}<option/>`
        cities_list.innerHTML += option
    }
}
//הצגת תמונה בדף הרשמה
if (document.querySelector(`#user_img`)) {
    document.querySelector(`#user_img`).addEventListener(`change`, ShowImage);
}
//אם קיים משתמש מחובר ואני נמצא בדף פרופיל
if (location.href.indexOf(`profile.html`) != -1 && login_user !== null) {
    ShowUserInfo();
    document.getElementById("ifUserIsLoggedIn").innerHTML = `<p>ברוך הבא ${login_user.user_first_name} ${login_user.user_last_name} </p>`;
    document.getElementById("ifUserIsLoggedIn").classList.add('loginProfile')

} else {
    if (location.href.indexOf(`profile.html`) != -1) {
        location.href = "login.html"
    }
}
//אם משתמש מחובר ואני לא בדף עריכת פרופיל בטל את אופציית ההתחברות והצג ברוך הבא במקום, הפוך את קישור ההתחברות למעבר לדף פרופיל
if (login_user !== null && location.href.indexOf(`editProfile.html`) === -1) {
    if (login_user === "admin") {
        document.getElementById("ifUserIsLoggedIn").href = "manager.html"
        document.getElementById("ifUserIsLoggedIn").innerHTML = `<p>ברוך הבא ${JSON.stringify(login_user)} </p>`
    }
    else {
        document.getElementById("ifUserIsLoggedIn").innerHTML = `<p>ברוך הבא ${login_user.user_first_name} ${login_user.user_last_name} </p>`;
        document.getElementById("ifUserIsLoggedIn").href = "profile.html"
    }
}
//אם אני נמצא בדף אדמין- בטל את אופציית התחברות, הצג ברוך הבא, הפעל פונקצייה לבדיקה האם תיבת הסימון סומנה לפני מחיקה-במקרה שלא נבחר כלום
//אחרת אם לא-הפנה לדף הבית, אין גישה ללא התחברות עם הפרטים
if (location.href.indexOf(`manager.html`) != -1 && login_user !== null) {
    ShowAllUsersDetails()
    ShowAllProducts()
    document.getElementById("ifUserIsLoggedIn").innerHTML = `<p>ברוך הבא ${JSON.stringify(login_user)} </p>`;
    document.getElementById("ifUserIsLoggedIn").classList.add('loginProfile')
} else {
    if (location.href.indexOf(`manager.html`) != -1) {
        location.href = "login.html"
    }
}
//catch event form submit
if (document.querySelector(`#register_form`))
    document.querySelector(`#register_form`).addEventListener(`submit`, RegisterUser)
//שליחת טופס התחברות
if (document.querySelector(`#login_form`))
    document.querySelector(`#login_form`).addEventListener(`submit`, LoginUser)

//הפניה למשחק צוללות
if (location.href.indexOf(`profile.html`) != -1 && login_user !== null) {
    document.querySelector(`#BattleShip`).addEventListener(`click`, PlayGame)
}
//התנתקות מהמשתמש
if (location.href.indexOf(`profile.html`) != -1 && login_user !== null) {
    document.querySelector(`#logout`).addEventListener(`click`, LogOut)
}
//עדכון פרטי משתמש
if (login_user !== null) {
    var specific_user = findIndexByProperty()
}
//אם אני בדף פרופיל ומשתמש מחובר, האזן לאירוע לחיצה על כפתור עריכת פרטים
if (location.href.indexOf(`profile.html`) != -1 && login_user !== null) {
    document.querySelector(`#editdetails`).addEventListener(`click`, GoToEditPage)
}
//אם הצלחתי לתפוס את הדיב של עריכת פרטים, האזן לאירוע לחיצה על כפתור אישור של עדכון טופס עריכת פרטי משתמש והפעל את פונקציית העריכה
if (document.querySelector(`#register_form_edit`)) {
    document.querySelector(`#register_form_edit`).addEventListener(`submit`, EditUserDetails)
}
//התנתקות מדף אדמין
if (location.href.indexOf(`manager.html`) != -1 && login_user !== null) {
    document.querySelector(`#admin_logout`).addEventListener(`click`, LogOut)
}
//חנות
//הוספת המוצרים הקיימים לחנות
if(JSON.parse(localStorage.getItem(`products`))==null){
    AddToProductArray()
}
 if (location.href.indexOf(`shop.html`) != -1) {
    ShowProducts()  
}
//עגלת קניות
var cart=JSON.parse(sessionStorage.getItem(`cart`)) || []
//אירוע לחיצה אם קיימים כפתורי פילטר קטגוריה
if (document.querySelectorAll(`.category`)) {
    let btns = document.querySelectorAll(`.category`)
    btns.forEach(btn => btn.addEventListener(`click`, CategoryFilterHandler))
}
//אירוע לחיצה אם קיימים כפתורי פילטר מחיר
if (document.querySelectorAll(`.price`)) {
    let btns = document.querySelectorAll(`.price`)
    btns.forEach(btn => btn.addEventListener(`click`, PriceFilterHandler))
}
//אירוע לחיצה אם קיימים כפתורי הוספה לסל
if (document.querySelectorAll(`.add-to-cart`)) {
    let btns = document.querySelectorAll(`.add-to-cart`)
    btns.forEach(btn => btn.addEventListener(`click`, AddToCart))
}
//אירוע לחיצה אם קיימים כפתורי הצג עוד מידע
if (document.querySelectorAll(`.show-more`)) {
    let btns = document.querySelectorAll(`.show-more`)
    btns.forEach(btn => btn.addEventListener(`click`, ShowMoreHandler))
}
//הצגת תמונה בדף עדכון מוצר
if (document.querySelector(`#Product_img`)) {
    document.querySelector(`#Product_img`).addEventListener(`change`, ShowProductImage);
}
//הצגת תמונה בדף הוספת פריט
if (document.querySelector(`#Add-Product_img`)) {
    document.querySelector(`#Add-Product_img`).addEventListener(`change`, ShowProductAddImage);
}
//הדפסת כלל המוצרים לפחות פעם אחת
  PrintCartItems()


 