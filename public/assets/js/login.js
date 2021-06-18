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
  }

  console.log(email)
  console.log(password)
} 

const renderSignUpPage = (event) => {
  event.preventDefault();
  // event.stopPropagation()
  console.log("signup")
}



$("#login-form").submit(handleSubmit)

$("#signup-button").click(renderSignUpPage)