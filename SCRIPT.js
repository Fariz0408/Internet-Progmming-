// popup alert 
function handleSubmit() {
    // Get the form values
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    // Verify the form values
    if (name === "admin" && password === "123" || name === "Kaimin" & password === "13579") {
        alert("User " + name + " Has Been Login Successful! You will be redirected to the home page.");
        // Redirect to the home page
        window.location.href = "home.html";
    } else {
        alert("The User ID or Password is incorrect Please try again !");
    }

    // Prevent the default form submission behavior
    return false;
}

// order online button
const orderOnlineButton = document.querySelector('.btn-order-online');

orderOnlineButton.addEventListener('click', () => {
  window.location.href = "food.html";
});

function handleRegister() {
    // Get the input fields
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email');
    const phoneNumber = document.getElementById('phone-number');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const date = document.getElementById('date');

    // Check if all fields are filled
    if (fullName.value === '') {
        alert('Please fill in your Full Name!');
        fullName.focus();
        return false;
    }

    if (email.value === '') {
        alert('Please fill in your Email!');
        email.focus();
        return false;
    }

    if (phoneNumber.value === '') {
        alert('Please fill in your Phone Number!');
        phoneNumber.focus();
        return false;
    }

    if (password.value === '') {
        alert('Please fill in your Password!');
        password.focus();
        return false;
    }

    if (confirmPassword.value === '') {
        alert('Please re-enter your Password!');
        confirmPassword.focus();
        return false;
    }

    if (date.value === '') {
        alert('Please select your Date!');
        date.focus();
        return false;
    }

    // Check if password and confirm password match
    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match!');
        password.focus();
        return false;
    }

    // If all fields are filled and passwords match, navigate to home page
    alert("User " + fullName.value + " Sign Up Successful! You will be redirected to the home page.");
    window.location.href = 'home.html';
    return true;
}

