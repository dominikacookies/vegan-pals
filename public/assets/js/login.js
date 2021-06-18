const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("submit")

  const email = $("#email").val();
  const password = $("#password").val();

  if (!email || !password) {
    $("#login-error-messages").empty()
    $("#login-error-messages").append(`
    <p class="login-error-message "> Please enter an email and password to login </p>
    `)
    return
  }

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      email,
      password,
    }),
  };

  const response = await fetch("http://localhost:3001/auth/login", options);
  console.log(response)

  if (response.status == 200) {
    window.location.replace("http://localhost:3001/"); 
  } else if (response.status == 404) {
    $("#login-error-messages").empty()
    $("#login-error-messages").append(`
    <p class="login-error-message "> Email or password incorrect, please try again. </p>
    `)
  } else {
    $("#login-error-messages").empty()
    $("#login-error-messages").append(`
    <p class="login-error-message "> Oops! We're having some trouble at the moment. Please try again later. </p>
    `)
  }

  console.log(response)
} 

const renderSignUpPage = (event) => {
  event.preventDefault();
  // event.stopPropagation()
  console.log("signup")
}



$("#login-form").submit(handleSubmit)

$("#signup-button").click(renderSignUpPage)