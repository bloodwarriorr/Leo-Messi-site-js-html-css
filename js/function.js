function RegisterUser(event) {

    //ביטול ברירת מחדל של הדף-רענון דף
    event.preventDefault()

    //שליפת המידע מתוך הטופס
    let user_name = document.querySelector(`#user_name`).value
    let user_email = document.querySelector(`#user_email`).value
    let user_password = document.querySelector(`#user_password`).value
    let user_password_confirm = document.querySelector(`#user_password_confirm`).value
    let user_image = document.querySelector(`#user_img_register`).src
    let user_first_name = document.querySelector(`#user_first_name`).value
    let user_last_name = document.querySelector(`#user_last_name`).value
    let user_date_of_birth = document.querySelector(`#user_birthday`).value
    let user_city = document.querySelector(`#city`).value
    let user_street = document.querySelector(`#streets`).value
    let user_street_number = document.querySelector(`#user_street_number`).value
    //מעבר על מערך המשתמשים ובדיקה האם כתובת המייל בשימוש
    for (let i = 0; i < users.length; i++) {

        if (user_email === users[i].user_email) {
            alert(`כתובת מייל קיימת, נסה כתובת אחרת`)
            return

        }
        if (user_name === users[i].user_name) {
            alert(` שם משתמש קיים, נסה שם משתמש אחר`)
            return

        }

    }

    //בדיקה האם שם משתמש מכיל תווים מיוחדים,אותיות לועזיות ומספרים
    if (/^(?=[a-zA-Z0-9._]{2,60}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(user_name) == false) {
        let check1 = document.querySelector(`#user_name`)
        SetError(check1, "שם משתמש לא תקין")
        return
    }
    else if(user_name==="admin"){
        let check1 = document.querySelector(`#user_name`)
        SetError(check1, "לא ניתן להשתמש בשם זה")
        return
    }
    //בדיקה האם הסיסמא מכילה תווים מיוחדים,מספרים,אותיות גדולות
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(user_password) == false && user_password !== "admin1234admin") {
        let check2 = document.querySelector(`#user_password`)
        SetError(check2, "סיסמא לא תקינה")
        return
    }
    //אם הססמאות לא תואמות הודעת שגיאה וסיום פעולה של הפונקציה.
    if (user_password != user_password_confirm) {
        let check3 = document.querySelector(`#user_password_confirm`)
        SetError(check3, "סיסמא לא תואמת")
        return
    }
    //בדיקה האם שם פרטי מכיל תווים שונים מאותיות בעברית/אנגלית
    if (/^[a-z\u0590-\u05fe]+$/i.test(user_first_name) == false) {
        let check4 = document.querySelector(`#user_first_name`)
        SetError(check4, " שם פרטי לא מכיל תווים בעברית/אנגלית")
        return
    }
    //בדיקה האם שם משפחה מכיל תווים שונים מאותיות בעברית/אנגלית
    if (/^[a-z\u0590-\u05fe'-]+$/i.test(user_last_name) == false) {
        let check5 = document.querySelector(`#user_last_name`)
        SetError(check5, " שם משפחה לא מכיל תווים בעברית/אנגלית")
        return
    }

    //בדיקת אימייל
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user_email) == false||user_email.indexOf(".com") === -1) {
        let check6 = document.querySelector(`#user_email`)
        SetError(check6, "כתובת מייל לא תקינה")
        return
    }
    
   
    //בדיקת שם רחוב-עברית בלבד
    if ((/^[\u0590-\u05Fe'-]+$/i).test(user_street) == false) {
        let check7 = document.querySelector(`#streets`)
        SetError(check7, "שם רחוב לא בעברית בלבד")
        return
    }

    //אפשר לייצר אובייקט חדש של משתמש-הסיסמאות תואמות
    let user = new User(user_name, user_email, user_password, user_first_name, user_last_name, user_date_of_birth, user_city, user_street, user_street_number)

    //הוספת המשתמש למערך של כל המשתמשים
    users.push(user)
    //הוספת תמונה למערך של כל התמונות
    users_images.push(user_image)

    //שמירה בלוקאל
    localStorage.setItem(`users_images`, JSON.stringify(users_images))

    //שמירת האובייקט בlocalstorage
    //ממיר את האובייקט למחרוזת
    localStorage.setItem(`users`, JSON.stringify(users))
    location.href = `login.html`



}
function LoadUsers() {
    //ממיר את המחרוזת חזרה לאובייקט
    let data = JSON.parse(localStorage.getItem(`users`))

    //אם לא קיימים משתמשים רשומים בכלל-תייצר מערך ריק
    if (data == null)
        return new Array()
    else
        return data

}
function LoginUser(event) {

    //ביטול ברירת מחדל של הדף-רענון דף
    event.preventDefault()

    let user_name = document.querySelector(`#user_name`).value
    let user_password = document.querySelector(`#user_password`).value

    if (user_name === "admin" && user_password === "admin1234admin") {
        sessionStorage.setItem(`login_user`, JSON.stringify(user_name))
        location.href = "manager.html"
    }
    else if (user_name == "admin" && user_password !== "admin1234admin") {
        alert(`משתמש לא קיים במערכת`)
        return
    }
    //מעבר על כל המערך ושליפת המשתמש המתאים
    //המשתמש מוחזר בתוך מערך
    else {


        let user
        let user_image_profile
        for (let i = 0; i < users.length; i++) {

            if (user_name === users[i].user_name) {
                user = users[i]
                user_image_profile = users_images[i]
            }
        }

        if (user.user_password !== user_password) {
            alert(`פרטי הזיהוי שגויים`)
            return
        }

        //פרטי הזיהוי נכונים-המשתמש נמצא במאגר ולכן נעבור לדף פרופיל לאחר שמירה בsession storage
        sessionStorage.setItem(`image_user_profile`, user_image_profile)
        sessionStorage.setItem(`login_user`, JSON.stringify(user))
        sessionStorage.setItem("userName", user.user_name)
        // הפנייה לדף פרופיל רגיל
        location.href = "profile.html"
    }




}
function ShowImage(event) {
    //תפיסת קובץ התמונה והצגתו בעזרת file reader
    let file = event.target.files[0]

    let reader = new FileReader()

    reader.onload = () => {
        let img = document.querySelector(`#user_img_register`)
        img.classList.remove("dontShowImage");
        img.src = reader.result
        sessionStorage.setItem(`user_img_register`, reader.result)
    }
    reader.readAsDataURL(file)

}
//פונקציות אשר אחראיות על הצגת התמונה בדף הפרופיל, שליפת הקובץ מהsession storage  
//הצגת התמונה באמצעות reader
function displayImage() {


    const reader = new FileReader();

    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}
function displayImage() {

    let file = sessionStorage.getItem('image_user_profile');
    var image = document.querySelector(`#image_user_profile`);
    image.classList.remove("dontShowImage")
    image.src = file;
    var image2 = document.querySelector(`#image_user_profile_heading`);
    image2.src = file;

}
//הצגת פרטי המשתמש בדף הפרופיל, כולל תמונת הפרופיל
function ShowUserInfo() {
let year
let month
let day
let bday=login_user.user_date_of_birth
year=bday.substring(0,4)
month=bday.substring(5,7)
day=bday.substring(8,10)

    let div1 = document.querySelector(`#profile_user_details`)
    let div2 = document.querySelector(`#profile_user_details_header`)

    div1.innerHTML = `
    <center>
    <img id="image_user_profile" src="" name="aboutme" width="140" height="140" class="img-circle">
    <h3>${login_user.user_first_name} ${login_user.user_last_name}</h3>
    
    <p>${login_user.user_email} <span class="glyphicon glyphicon-envelope"></span> <br>${login_user.user_street} ${login_user.user_street_number} ${login_user.user_city} <i class="glyphicon glyphicon-map-marker"></i> <br> ${day}-${month}-${year} <i class="fa fa-birthday-cake"></i></p>
    <button class="btn btn-danger" id="logout">התנתק</button> <button class="btn btn-primary" id="BattleShip">למשחק</button>  
    <a href="#editEmployeeModal" class="edit" data-toggle="modal"><button class="btn btn-secondary" id="editdetails">ערוך פרטים</button> </a> 
    </center>
    `
    div2.innerHTML = ` 
    <center>
    <a href="#aboutModal" data-toggle="modal" data-target="#myModal"><img src="" id="image_user_profile_heading"
                name="aboutme" width="140" height="140" class="img-circle"></a>
                <br><span> לחץ לפרטים</span>
    <h3>${login_user.user_first_name} ${login_user.user_last_name}</h3>
    </center>
    `

    displayImage();


}
//הצגת פרטי כלל המשתמשים בדף האדמין על ידי לולאת foreach
//אשר רצה על איברי המערך(לוקאל)וצוברת לתוך אלמנט הtable body את הפרטים
function ShowAllUsersDetails() {
    let usersArray = [];
    usersArray = JSON.parse(localStorage.getItem(`users`));
    usersArray.forEach(user => {



        let tablebody = document.querySelector(`#user_details_manager`)


        tablebody.innerHTML += `
          
        <tr>
        <td>
        <span class="custom-checkbox">
                <input type="checkbox" name="options[]" class="checkboxes">
                <label></label>
                </span>
        </td>
        <td id="user_name">${user.user_name}</td>
        <td id="user_email">${user.user_email}</td>
        <td id="user_password">${user.user_password}</td>
        <td id="user_first_name">${user.user_first_name}</td>
        <td id="user_last_name">${user.user_last_name}</td>
        <td id="user_birthday">${user.user_date_of_birth}</td>
        <td id="city">${user.user_city}</td>
        <td id="streets">${user.user_street}</td>
        <td id="user_street_number">${user.user_street_number}</td>
        <td>
        <a href="#editEmployeeModal" class="edit" onclick="checkIfUserChecked()" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
        <a href="#deleteEmployeeModal" class="delete" onclick="checkIfUserChecked()" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
        </td>
        </tr>
               
        
        
        
        `



    });

}
//פונקציה אשר בודקת האם המשתמש סימן תיבת סימון לפני מחיקה
function removeItemOnClick() {
    let tempArray = [];
    let pictureArray = []
    let userIndex = 0;
    let checkBoxes = document.querySelectorAll("#user_details_manager .checkboxes")
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked === true) {
            tempArray = users.splice(userIndex, 1);
            pictureArray = users_images.splice(userIndex, 1)
            localStorage.setItem("users_images", JSON.stringify(users_images))
            localStorage.setItem("users", JSON.stringify(users));
            users = JSON.parse(localStorage.getItem(`users`));
            users_images = JSON.parse(localStorage.getItem(`users_images`))
            
            return;
        }
        userIndex++
    }


}
function PlayGame() {
    location.href = "battleshipjs/BattleShipGame.html"
}
function LogOut() {
    sessionStorage.clear()
    location.href = "index.html"
}
function checkIfUserChecked() {
    let checkBoxes = document.querySelectorAll(".checkboxes")
    let checked = false;
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked === true) {
            checked = true;
            return;
        }
    }
    if (!checked) {
        alert("לא נבחר משתמש")
        location.reload();
    }

}
function EditUserDetails(event) {

    let user_name = '';
    let userIndex = 0;
    let tempArray = [];

    let user_email, user_password, user_password_confirm, user_image, user_first_name, user_last_name, user_date_of_birth, user_city, user_street, user_street_number = '';

    if (login_user === "admin") {
        let checkBoxes = document.querySelectorAll(".checkboxes")
        for (let i = 0; i < checkBoxes.length; i++) {

            if (checkBoxes[i].checked === true) {
                tempArray = users.splice(userIndex + 1);

                user_name = users[userIndex].user_name;

                break;

            }

            userIndex++;
        }


        user_email = document.querySelector(`#edit_user_email`).value
        user_password = document.querySelector(`#edit_user_password`).value
        user_password_confirm = document.querySelector(`#edit_user_password_confirm`).value
        user_image = document.querySelector(`#user_img_register`).src
        user_first_name = document.querySelector(`#edit_user_first_name`).value
        user_last_name = document.querySelector(`#edit_user_last_name`).value
        user_date_of_birth = document.querySelector(`#edit_user_birthday`).value
        user_city = document.querySelector(`#edit_city`).value
        user_street = document.querySelector(`#edit_streets`).value
        user_street_number = document.querySelector(`#edit_user_street_number`).value
    }
    else {
        //ביטול ברירת מחדל של הדף-רענון דף
        event.preventDefault()
        if (sessionStorage.getItem("userName") !== "admin") {
            user_name = sessionStorage.getItem("userName")
        }
        user_email = document.querySelector(`#edit_user_email`).value
        user_password = document.querySelector(`#edit_user_password`).value
        user_password_confirm = document.querySelector(`#edit_user_password_confirm`).value
        user_image = document.querySelector(`#user_img_register`).src
        user_first_name = document.querySelector(`#edit_user_first_name`).value
        user_last_name = document.querySelector(`#edit_user_last_name`).value
        user_date_of_birth = document.querySelector(`#edit_user_birthday`).value
        user_city = document.querySelector(`#edit_city`).value
        user_street = document.querySelector(`#edit_streets`).value
        user_street_number = document.querySelector(`#edit_user_street_number`).value
    }


    //בדיקה האם הסיסמא מכילה תווים מיוחדים,מספרים,אותיות גדולות
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(user_password) == false && user_password !== "admin1234admin") {
        let check2 = document.querySelector(`#edit_user_password`)
        SetError(check2, "סיסמא לא תקינה")
        return
    }
    //אם הססמאות לא תואמות הודעת שגיאה וסיום פעולה של הפונקציה.
    if (user_password != user_password_confirm) {
        let check3 = document.querySelector(`#edit_user_password_confirm`)
        SetError(check3, "סיסמא לא תואמת")
        return
    }
    //בדיקה האם שם פרטי מכיל תווים שונים מאותיות בעברית/אנגלית
    if ((/[a-z\u0590-\u05FF]/).test(user_first_name) == false) {
        let check4 = document.querySelector(`#edit_user_first_name`)
        SetError(check4, " שם פרטי לא מכיל תווים בעברית/אנגלית")
        return
    }
    //בדיקה האם שם משפחה מכיל תווים שונים מאותיות בעברית/אנגלית
    if ((/[a-z\u0590-\u05FF]/).test(user_last_name) == false) {
        let check5 = document.querySelector(`#edit_user_last_name`)
        SetError(check5, " שם משפחה לא מכיל תווים בעברית/אנגלית")
        return
    }

    //בדיקת אימייל
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user_email) == false || user_email.indexOf(".com") === -1) {
        let check6 = document.querySelector(`#edit_user_email`)
        SetError(check6, "כתובת מייל לא תקינה")
        return
    }

    //בדיקת שם רחוב-עברית בלבד
    if ((/[\u0590-\u05FF]/).test(user_street) == false) {
        let check7 = document.querySelector(`#edit_user_street`)
        SetError(check7, "שם רחוב לא בעברית")
        return
    }

    let user2 = new User(user_name, user_email, user_password, user_first_name, user_last_name, user_date_of_birth, user_city, user_street, user_street_number)
    users.push(user2);
//במידה ואנחנו לא מחוברים דרך אדמין אלא אם משתמש רגיל שמור את הפרטים החדשים בסשן סטורג' ואת תמונת הפרופיל
    if (login_user !== "admin") {
        sessionStorage.setItem(`login_user`, JSON.stringify(user2))
        login_user = JSON.parse(sessionStorage.getItem(`login_user`))
        image_user_profile = sessionStorage.getItem(`user_image_profile`)
    }
    //במידה ואכן המשתמש נמצא במערך ואנו לא מחוברים דרך אדמין, בצע השמה של אובייקט מסוג USER
    //אשר יצרנו אותו במיקום של המשתמש המחובר במערך המשתמשים הכללי, וכמו כן את תמונת הפרופיל שלו. 
    //בצע חיתוך של מערך המשתמשים ועדכן את הלוקאל סטורג' בהתאם, כלומר את מערך המשתמשים שלנו, העבר בחזרה לדף פרופיל(משתמש רגיל)
    if (specific_user > -1 && login_user !== "admin") {
        users[specific_user] = user2
        users_images[specific_user] = user_image
        users.splice(-1, 1)
        //שמירה בלוקאל
        localStorage.setItem(`users_images`, JSON.stringify(users_images))
        //שמירת האובייקט בlocalstorage
        //ממיר את האובייקט למחרוזת
        localStorage.setItem(`users`, JSON.stringify(users))
        sessionStorage.setItem(`image_user_profile`, user_image)
        location.href = "profile.html"
    }
    //אחרת -מדובר בעדכון משתמש דרך דף אדמין- בצע השמה של האובייקט הנוצר במיקום ה USER INDEX
    //בצע חיתוך של מערך המשתמשים, כלומר המשתמש החדש אשר ביצענו לו PUSH 
    //יכנס למיקום המתאים והישן ימחק. לאחר מכן נבצע דחיפה של שאר המשתמשים אשר שמורים במערך הזמני על מנת לקבל מערך עדכני ותקין. 
    //לאחר מכן נבצע השמה של מערך המשתמשים ללוקאל סטורג', נקרא לפונקציה אשר אחראית על הדפסת כלל המשתמשים בטבלת דף האדמין.
    else {
        users[userIndex] = user2
        users_images[userIndex] = user_image
        users.splice(userIndex, 1);

        for (let i = 0; i < tempArray.length; i++) {
            users.push(tempArray[i])

        }

        localStorage.setItem(`users_images`, JSON.stringify(users_images))
        localStorage.setItem(`users`, JSON.stringify(users))
        

    }




}
//פונקציה אשר מוצאת את המשתמש הרצוי על פי בדיקה אם הוא מחובר-כלומר משיכה מהסשן סטורג'
function findIndexByProperty() {
    for (let i = 0; i < users.length; i++) {
        if (users[i].user_name === login_user.user_name) {
            return i;
        }
    }

    return -1;

}
function GoToEditPage() {
    location.href = "editProfile.html"
}
function SetCitiesList() {
    localStorage.setItem(`city_list`, JSON.stringify(cities))
    let list = JSON.parse(localStorage.getItem(`city_list`))
    if (list == null)
        return new Array()
    else
        return list

}
//חנות
function ShowProducts() {
    let TempArray = JSON.parse(localStorage.getItem(`products`))
    let str = ''
    for (let i = 0; i < TempArray.length; i++) {
        str = ''

        str += `
    <div class="col-sm-4 productsflex">
      <div class="thumbnail">
        <img src="${TempArray[i].image}" alt="Tour1"class="ImageSize" >
        <p><strong>${TempArray[i].name}</strong></p>
        `
        if (TempArray[i].SalePrice != 0)
            str += `
        <s><p>Price:${TempArray[i].Price}$</p></s>
       `
        else
            str += `<br>`
        str += `
       <p>Price:${TempArray[i].TotalPrice}$</p>
        <button class="btn show-more" data-toggle="modal" data-target="#myModal" data-product='${JSON.stringify(TempArray[i])}' >Show More</button> <button class="btn add-to-cart" data-product='${JSON.stringify(TempArray[i])}'>Add To Cart</button> 
      </div>
    </div>
  `

        document.querySelector(`#products`).innerHTML += str
        
    }
}
//טיפול בטפסי הרשמה
function SetError(input, text) {
    let inputfield = input.parentElement
    let small = inputfield.querySelector(`small`)
    small.innerHTML = `${text}`
    inputfield.className = `col-s-2 Invalid`
}
function RemoveClass(element) {
    element.parentElement.className = `col-s-2`
}
//הוספת מערך הראשוני של המוצרים ללוקאל סטורג'
function AddToProductArray() {
    localStorage.setItem(`products`, JSON.stringify(product_list))

}

//פונקציה להוספת מוצר לסל הקניות
function AddToCart(event) {
    //מציאת הכפתור עליו לחצתי
    let btn = event.target
    //שליפת המידע על המוצר מתוך התכונה של הdata product
    let product = JSON.parse(btn.dataset.product)
    //הוספת המוצר למערך של עגלת הקניות
    cart.push(product)
    //עדכון הsession storage
    sessionStorage.setItem(`cart`, JSON.stringify(cart))
    PrintCartItems()
}
//פונקציה לטיפול בכל הצגת פרטים נוספים פר כפתור
function ShowMoreHandler(event) {
    //מציאת הכפתור עליו לחצתי
    let btn = event.target
    //שליפת המידע על המוצר מתוך התכונה של הdata product
    let product = JSON.parse(btn.dataset.product)
    ShowMoreDetails(product)
}
//הצגת פרטים נוספים על המוצר
function ShowMoreDetails(product) {
    let str = ''

    str = ''

    str += `
        <div class="col-xsm-4 productsflex">
          <div class="thumbnail">
            <img src="${product.image}" alt="Tour1"class="ImageSize" >
            <p><strong>Product Name:${product.name}</strong></p>
            <p><strong>Description:${product.Description}</strong></p>
            <p><strong>Category:${product.Category}</strong></p>
            <p><strong>Stock:${product.Amount}</strong></p>
            `
    if (product.SalePrice != 0)
        str += `
            <s><p>Price:${product.Price}$</p></s>
           `
    else
        str += `<br>`
    str += `
           <p>Price:${product.TotalPrice}$</p>
            
          </div>
        </div>
      `

    document.querySelector(`#itemDetails`).innerHTML = str
}

//כאשר בדף אדמין הצג את כל המוצרים הקיימים במערך בטבלה
function ShowAllProducts() {
    let productArray = [];
    productArray = JSON.parse(localStorage.getItem(`products`));
    productArray.forEach(product => {



        let tablebody = document.querySelector(`#Shop-products`)


        tablebody.innerHTML += `
          
        <tr>
        <td>
        <span class="custom-checkbox">
                <input type="checkbox" name="options[]" class="checkboxes">
                <label></label>
                </span>
        </td>
        <td id="product_id">${product.id}</td>
        <td id="product_name">${product.name}</td>
        <td id="product_price">${product.Price}</td>
        <td id="product_sale_price">${product.SalePrice}</td>
        <td id="product_category">${product.Category}</td>
        <td id="product_amount">${product.Amount}</td>
        <td>
        <a href="#editProductModal" class="edit" onclick="checkIfUserChecked()" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
        <a href="#deleteProductModal" class="delete" onclick="checkIfUserChecked()" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
        </td>
        </tr>
               
        
        
        
        `



    });

}

//מחיקת מוצר מהמערך
function RemoveProductOnClick() {

    let tempArray = [];
    let productArray = JSON.parse(localStorage.getItem(`products`))
    let productIndex = 0;
    let checkBoxes = document.querySelectorAll("#Shop-products .checkboxes")
    for (let i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked === true) {
            
            tempArray = productArray.splice(productIndex, 1);
            localStorage.setItem(`products`, JSON.stringify(productArray));
            product_list = JSON.parse(localStorage.getItem(`products`));

            
            return;
        }
        productIndex++
    }

}
//עריכת פרטי מוצר
function EditProductDetails() {
    let productIndex = 0;
    let tempArray = [];
    let productArray = JSON.parse(localStorage.getItem(`products`))
    let product_id, product_name, product_full_price, product_sale_price, product_image, product_description, product_category, product_amount, total_price;
    let checkBoxes = document.querySelectorAll("#Shop-products .checkboxes")
    for (let i = 0; i < checkBoxes.length; i++) {

        if (checkBoxes[i].checked === true) {


            break;
        }

        productIndex++;
    }
    product_id = document.querySelector(`#edit_product_id`).value
    product_name = document.querySelector(`#edit_product_name`).value
    product_full_price = document.querySelector(`#edit_product_full_price`).value
    product_sale_price = document.querySelector(`#edit_product_sale_price`).value
    product_image = document.querySelector(`#edit_product_img`).src
    product_description = document.querySelector(`#edit_product_description`).value
    product_category = document.querySelector(`#edit_product_category`).value
    total_price = document.querySelector(`#edit_total_price`).value
    product_amount = document.querySelector(`#edit_product_amount`).value


    let productobj = new Product(product_id, product_name, product_full_price, product_sale_price, product_image, product_description, product_category, product_amount, total_price)
    productArray[productIndex] = productobj

    localStorage.setItem(`products`, JSON.stringify(productArray))
   
}
//קריאת תמונה בטופס עדכון פריטים

function ShowProductImage(event) {
    //תפיסת קובץ התמונה והצגתו בעזרת file reader
    let file = event.target.files[0]

    let reader = new FileReader()

    reader.onload = () => {
        let img = document.querySelector(`#edit_product_img`)
        img.classList.remove("dontShowImage");
        img.src = reader.result
    }
    reader.readAsDataURL(file)

}
//פונקציה אשר אחראית על הוספת מוצר למערך המוצרים הקיים
function AddProduct() {
    
    let productArray = JSON.parse(localStorage.getItem(`products`))
    let product_id, product_name, product_full_price, product_sale_price, product_image, product_description, product_category, product_amount, total_price;

    product_id = document.querySelector(`#Add_product_id`).value
    product_name = document.querySelector(`#Add_product_name`).value
    product_full_price = document.querySelector(`#Add_product_full_price`).value
    product_sale_price = document.querySelector(`#Add_product_sale_price`).value
    product_image = document.querySelector(`#Add_product_img`).src
    product_description = document.querySelector(`#Add_product_description`).value
    product_category = document.querySelector(`#Add_product_category`).value
    total_price = document.querySelector(`#Add_total_price`).value
    product_amount = document.querySelector(`#Add_product_amount`).value

    let productobj = new Product(product_id, product_name, product_full_price, product_sale_price, product_image, product_description, product_category, product_amount, total_price)
    productArray.push(productobj)

    localStorage.setItem(`products`, JSON.stringify(productArray))
    
  
  
   
}
//הצגת תמונת המוצר כאשר אנו במעמד ההוספה
function ShowProductAddImage(event) {
    //תפיסת קובץ התמונה והצגתו בעזרת file reader
    let file = event.target.files[0]

    let reader = new FileReader()

    reader.onload = () => {
        let img = document.querySelector(`#Add_product_img`)
        img.classList.remove("dontShowImage");
        img.src = reader.result
    }
    reader.readAsDataURL(file)

}

// פילטור מוצרים בחנות לפי קטגוריה
function CategoryFilterHandler(event) {
    //מציאת הכפתור עליו לחצתי
    let btn = event.target
    //שליפת המידע על המוצר מתוך התכונה של הdata product
    let filter = btn.dataset.category
    ShowFilterdItems(filter)
}
//הצגת המוצרים לאחר פילטור
function ShowFilterdItems(filter) {
    document.querySelector(`#products`).innerHTML = ""
    let TempArray = JSON.parse(localStorage.getItem(`products`))
    let str = ''
    for (let i = 0; i < TempArray.length; i++) {
        str = ''
        if (TempArray[i].Category === filter) {
            str += `
    <div class="col-sm-4 productsflex">
      <div class="thumbnail">
        <img src="${TempArray[i].image}" alt="Tour1"class="ImageSize" >
        <p><strong>${TempArray[i].name}</strong></p>
        `
            if (TempArray[i].SalePrice != 0)
                str += `
        <s><p>${TempArray[i].Price}$</p></s>
       `
            else
                str += `<br>`
            str += `
       <p>${TempArray[i].TotalPrice}$</p>
        <button class="btn show-more" data-toggle="modal" data-target="#myModal" data-product='${JSON.stringify(TempArray[i])}' >Show More</button> <button class="btn add-to-cart" data-product='${JSON.stringify(TempArray[i])}'>Add To Cart</button> 
      </div>
    </div>
  `
            document.querySelector(`#products`).innerHTML += str


        }

    }
    let btns = document.querySelectorAll(`.show-more`)
    btns.forEach(btn => btn.addEventListener(`click`, ShowMoreHandler))
    let btns2 = document.querySelectorAll(`.add-to-cart`)
    btns2.forEach(btn => btn.addEventListener(`click`, AddToCart))

}

// פילטור מוצרים בחנות לפי מחיר
function PriceFilterHandler(event) {
    //מציאת הכפתור עליו לחצתי
    let btn = event.target
    //שליפת המידע על המוצר מתוך התכונה של הdata product
    let LowPrice = btn.dataset.low
    let HighPrice = btn.dataset.high
    ShowFilterdItemsByPrice(LowPrice, HighPrice)
}

function ShowFilterdItemsByPrice(LowPrice, HighPrice) {

    document.querySelector(`#products`).innerHTML = ""
    let TempArray = JSON.parse(localStorage.getItem(`products`))

    let str = ''
    for (let i = 0; i < TempArray.length; i++) {
        str = ''
        if (TempArray[i].TotalPrice >= LowPrice && TempArray[i].TotalPrice <= HighPrice) {
            str += `
    <div class="col-sm-4 productsflex">
      <div class="thumbnail">
        <img src="${TempArray[i].image}" alt="Tour1"class="ImageSize" >
        <p><strong>${TempArray[i].name}</strong></p>
        `
            if (TempArray[i].SalePrice != 0)
                str += `
        <s><p>${TempArray[i].Price}$</p></s>
       `
            else
                str += `<br>`
            str += `
       <p>${TempArray[i].TotalPrice}$</p>
        <button class="btn show-more" data-toggle="modal" data-target="#myModal" data-product='${JSON.stringify(TempArray[i])}' >Show More</button> <button class="btn add-to-cart" data-product='${JSON.stringify(TempArray[i])}'>Add To Cart</button> 
      </div>
    </div>
  `
            document.querySelector(`#products`).innerHTML += str

        }

    }
    let btns = document.querySelectorAll(`.show-more`)
    btns.forEach(btn => btn.addEventListener(`click`, ShowMoreHandler))
    let btns2 = document.querySelectorAll(`.add-to-cart`)
    btns2.forEach(btn => btn.addEventListener(`click`, AddToCart))
}
//ניקוי עגלת הקניות
function ClearCart() {
    sessionStorage.removeItem('cart');
    document.querySelector(`#cart-count`).innerHTML = 0
    document.querySelector(`#ShoppingCart`).innerHTML = ""
    location.reload()
}
//הצג את נתוני העגלה
function PrintCartItems() {
    let cart = JSON.parse(sessionStorage.getItem(`cart`)) || []
    document.querySelector(`#ShoppingCart`).innerHTML = ""
    document.querySelector(`#cart-count`).innerHTML = cart.length
    for (let i = 0; i < cart.length; i++) {

        let str = ''


        str += `
        <div class="col-mm-4 productsflex">
          <div class="thumbnail">
            <img src="${cart[i].image}" alt="Tour1"class="ImageSize" >
            <p><strong>Product Name:${cart[i].name}</strong></p>
            <p><strong>Description:${cart[i].Description}</strong></p>
            <p><strong>Category:${cart[i].Category}</strong></p>
            <p><strong>Stock:${cart[i].Amount}</strong></p>
            `
        if (cart[i].SalePrice != 0)
            str += `
            <s><p>Price:${cart[i].Price}$</p></s>
           `
        else
            str += `<br>`
        str += `
           <p>Price:${cart[i].TotalPrice}$
           </p> 
           <div class="modal-footer">
           <button type="submit" class="btn btn-success btn-default pull-left" data-product='${i}' onclick="BuyItem()">
             <span class="glyphicon glyphicon-ok-circle"></span> Buy Item
           </button>
           <button type="submit" class="btn btn-danger btn-default pull-left"  data-product='${i}' onclick="ClearProduct()">
             <span class="glyphicon glyphicon-remove"></span> Clear Item
           </button>
          </div>
        </div>
      `

        document.querySelector(`#ShoppingCart`).innerHTML += str
    }

}
//רכישה של כלל המוצרים בעגלת הקניות
function BuyItems() {
    if (login_user !== null) {
        sessionStorage.removeItem('cart');
        document.querySelector(`#cart-count`).innerHTML = 0
        document.querySelector(`#ShoppingCart`).innerHTML = ""
        alert(`Thanks For Shopping!!`)
        setTimeout(function () { location.reload() }, 1000);
    }
    else {
        
        window.alert(`You Need To Log In Before Purchase`)
        location.href = `login.html`
    }
}
//רכישה של מוצר בודד על פי מיקומו בעגלה
function BuyItem(){
    if(login_user!==null){
     //מציאת הכפתור עליו לחצתי
     let btn = event.target
     //שליפת המידע על המוצר מתוך התכונה של הdata product
    let index= JSON.parse(btn.dataset.product)
    let cart = JSON.parse(sessionStorage.getItem(`cart`)) || []
    cart.splice(index,1)
    sessionStorage.setItem('cart',JSON.stringify(cart))
    window.alert(`Thanks For Shopping!!`)
    }
    else{
        event.preventDefault()
        window.alert(`You Need To Log In Before Purchase`)
        location.href = `login.html` 
    }

}
//הסרת מוצר ספציפי מהעגלה
function ClearProduct(){
    
        //מציאת הכפתור עליו לחצתי
        let btn = event.target
        //שליפת המידע על המוצר מתוך התכונה של הdata product
       let index= JSON.parse(btn.dataset.product)
       let cart = JSON.parse(sessionStorage.getItem(`cart`)) || []
       cart.splice(index,1)
       sessionStorage.setItem('cart',JSON.stringify(cart))
       
}

function RegisterForm(){
    location.href="register.html"
}
