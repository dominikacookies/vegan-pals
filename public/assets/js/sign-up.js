const handleSignupSubmit = async (event) => {
  event.preventDefault();

  const firstname = $("#firstname").val();
  const lastname = $("#lasttname").val();
  const password = $("#password").val();
  const email = $("#email").val();
  const confirmPassword = $("#confirmPassword").val();

  if (password === confirmPassword) {
    const requestBody = {
      firstname: firstname,
      lastname: lastname,
      password: password,
      email: email,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(requestBody),
    };

    const response = await fetch("/auth/sign-up", options);

    if (response.status === 200) window.location.replace("/login");
  } else if (response.status == 404) {
    $("#sign-up-error-messages").empty();
    $("#sign-up-error-messages").append(`
      <p class="sign-up-error-message "> The email/password you have entered are incorrect.Please try again </p>
      `);
  } else {
    $("#sign-up-error-messages").empty();
    $("#sign-up-error-messages").append(`
      <p class="sign-up-error-message "> For the moment the page cannot be accessed. Please try again later </p>
      `);
  }
};

console.log("client-side JS");

$("#sign-up-form").submit(handleSignupSubmit);
