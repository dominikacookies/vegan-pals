const handleSubmit = async (event) => {
  event.preventDefault();

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

  const { status } = await fetch("/auth/login", options);

  if (status === 200) {
    window.location.replace("/"); 
  } else if (status > 399 && status < 500 ) {
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
} 



$("#login-form").submit(handleSubmit)