const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

// Service REST /login parameter username, password 
async function login(){
	const username = loginForm.username.value;
    const password = loginForm.password.value;
	
	console.log("password", password);
	
	let response = await fetch('http://localhost:8080/login?username='+username+'&password='+password, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});
	let data = await response.json()
	
	console.log("data", data);
	
	if (data["status"] == "ok"){
		localStorage.setItem("username", data["username"]);
		window.location.href = "testApi.html";
	}
	else {
        // Otherwise, make the login error message show (change its oppacity)
        loginErrorMsg.style.opacity = 1;
    }
}
