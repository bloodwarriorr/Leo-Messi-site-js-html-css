class User {
    //props
    user_name
    user_email
    user_password
    user_first_name
    user_last_name
    user_date_of_birth
    user_city
    user_street
    user_street_number
    //ctor
    constructor(user_name, user_email, user_password, user_first_name, user_last_name, user_date_of_birth, user_city, user_street, user_street_number) {
        this.user_name = user_name
        this.user_email = user_email
        this.user_password = user_password
        this.user_first_name = user_first_name
        this.user_last_name = user_last_name
        this.user_date_of_birth = user_date_of_birth
        this.user_city = user_city
        this.user_street = user_street
        this.user_street_number = user_street_number
    }
    GetFullName() {
        return `${login_user.user_first_name} ${login_user.user_first_name}`
    }

    GetBirthDate() {
        return `${login_user.user_date_of_birth}`
    }

    updateDetails(user_name, user_email, user_password,
        user_first_name,
        user_last_name,
        user_date_of_birth,
        user_city,
        user_street,
        user_street_number) {
        this.user_name = user_name
        this.user_email = user_email
        this.user_password = user_password
        this.user_first_name = user_first_name
        this.user_last_name = user_last_name
        this.user_date_of_birth = user_date_of_birth
        this.user_city = user_city
        this.user_street = user_street
        this.user_street_number = user_street_number

    }

}



