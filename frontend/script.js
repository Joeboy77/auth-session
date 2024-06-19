// Function to handle signup form submission
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(signupForm);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const response = await axios.post('http://localhost:3000/signup', { username, password });
        document.getElementById('signupMessage').textContent = response.data.message;
        signupForm.reset();
    } catch (error) {
        console.error('Signup error:', error.response.data);
        document.getElementById('signupMessage').textContent = 'Error signing up. Please try again.';
    }
});

// Function to handle login form submission
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        const response = await axios.post('http://localhost:3000/login', { username, password });
        document.getElementById('loginMessage').textContent = response.data.message;
        loginForm.reset();
    } catch (error) {
        console.error('Login error:', error.response.data);
        document.getElementById('loginMessage').textContent = 'Invalid credentials. Please try again.';
    }
});
