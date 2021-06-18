const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("submit")

  const email = $("#email").val();
  const password = $("#password").val();

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