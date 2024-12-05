document.getElementById("clinicForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const doctor = document.getElementById("doctor").value;

    const confirmationMessage = `
        Thank you, ${name}! 
        Your appointment is confirmed with ${doctor} on ${date} at ${time}.
    `;
    document.getElementById("confirmation").innerHTML = confirmationMessage;

    console.log({
        name,
        email,
        phone,
        date,
        time,
        doctor,
    });
});
