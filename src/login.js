const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

const registerForm = document.getElementById("register-form");
const registerButton = document.getElementById("register-form-submit");
const registerErrorMsg = document.getElementById("register-error-msg");
const registerSuccessMsg = document.getElementById("register-success-msg");

if (sessionStorage.getItem("username")) {
  window.location.href = "./index.html";
}

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
		sessionStorage.setItem("username", data["username"]);
		window.location.href = "./index.html";
	}
	else {
        // Otherwise, make the login error message show (change its oppacity)
        loginErrorMsg.style.opacity = 1;
    }
}

async function register() {
  const username = registerForm.username.value;
  const password = registerForm.password.value;

  if (!username || !password) {
    registerErrorMsg.textContent = "Please enter a username and password";
    registerErrorMsg.style.opacity = 1;
    return;
  }

  let response = await fetch('http://localhost:8080/adduser?username=' + username + '&password=' + password, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  let data = await response.json();

  if (data["status"] === "ok") {
    sessionStorage.setItem("username", data["username"]);
    registerSuccessMsg.style.opacity = 1;
  } else {
    registerErrorMsg.textContent = "Username already exists";
    registerErrorMsg.style.opacity = 1;
  }
}
