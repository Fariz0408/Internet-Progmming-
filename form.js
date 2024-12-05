document.getElementById('appointmentForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/submit-appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Failed to book appointment.');
            }
        })
        .then((message) => {
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('successMessage').textContent = message;
            console.log(message);
        })
        .catch((error) => console.error('Error:', error));
});
