
/**
 * Send data to server and validating form field data and registering user
 */
function registerUser() {
    $(document).ready(function () {
        $("#submit").click(function () {

            let registerData = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                mobileNo: document.getElementById("mobileNo").value,
            }
            console.log(registerData)
            showInput()
            function showInput() {
                if (registerData.name == "") {
                    document.getElementById('name_error').innerHTML =
                        "Enter your name"
                }

                if (registerData.name) {
                    if (registerData.name.length < 2) {
                        document.getElementById('name_error').innerHTML =
                            "Name atleast two Characters"
                    }
                    if (!isNaN(registerData.name)) {
                        document.getElementById('name_error').innerHTML =
                            "Name can not be of number type"
                    }
                }

                if (registerData.email == "") {
                    document.getElementById('email_error').innerHTML =
                        "Enter your email"
                }
                if (registerData.email) {
                    const regex = /^[A-Za-z0-9-.#@$%&]{3,}@[A-Za-z]{3,6}.[A-Za-z]{2,4}$/;
                    if (!regex.test(registerData.email)) {
                        document.getElementById('email_error').innerHTML =
                            "Enter valid email"
                    }
                }

                if (registerData.password == "") {
                    document.getElementById('password_error').innerHTML =
                        "Enter your password"
                }
                if (registerData.password) {
                    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
                    if (!regex.test(registerData.password)) {
                        document.getElementById('password_error').innerHTML =
                            "Your password should have 8 letters with atleast one Lowercase, Uppercase, Number and Special character."
                    }
                }

                if (registerData.mobileNo == "") {
                    document.getElementById('mobileNo_error').innerHTML =
                        "Enter your mobile number"
                }
                if (registerData.mobileNo) {
                    if (isNaN(registerData.mobileNo)) {
                        document.getElementById('mobileNo_error').innerHTML =
                            "Mobile Number should be a type of number"
                    }

                    let regex = /^[0-9]{10,10}$/
                    if (!regex.test(registerData.mobileNo)) {
                        document.getElementById('mobileNo_error').innerHTML =
                            "Mobile Number should have a minimum length of 10."
                    }
                }
            }
            $.post("/register",
                registerData,
                function (data, status) {
                    if (data.Message == "Email already exists") {
                        document.getElementById('server_error').innerHTML =
                            "Email already exists"
                    }

                    if (data.Message == "New User Created.") {
                        alert("User Registered Successfully");
                    }
                    // else {
                    //     alert("something went wrong");
                    // }
                }
            );
        });
    });
}



/**
 * Send data to server and validating form field data and Login user
 */
function loginUser() {
    $(document).ready(function () {
        $("#submit").click(function () {

            let loginData = {
                username: document.getElementById("email").value,
                password: document.getElementById("password").value
            }
            console.log(loginData)
            showInput()
            function showInput() {

                if (loginData.username == "") {
                    document.getElementById('email_error').innerHTML =
                        "Enter your email"
                }
                if (loginData.username) {
                    const regex = /^[A-Za-z0-9-.#@$%&]{3,}@[A-Za-z]{3,6}.[A-Za-z]{2,4}$/;
                    if (!regex.test(loginData.username)) {
                        document.getElementById('email_error').innerHTML =
                            "Enter valid email"
                    }
                }

                if (loginData.password == "") {
                    document.getElementById('password_error').innerHTML =
                        "Enter your password"
                }
                if (loginData.password) {
                    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
                    if (!regex.test(loginData.password)) {
                        document.getElementById('password_error').innerHTML =
                            "Your password should have 8 letters with atleast one Lowercase, Uppercase, Number and Special character."
                    }
                }

            }
            $.post("/login",
                loginData,
                function (data, status) {
                    if (data.Message == 'You entered the wrong email or password.') {
                        document.getElementById('server_error').innerHTML =
                            'You entered the wrong email or password.'
                    }

                    if (data.Message == 'Login Success.') {
                        alert("User Login Successfully");
                    }
                }
            );
        });
    });
}
