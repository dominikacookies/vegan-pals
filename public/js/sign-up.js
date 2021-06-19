const handleSignupSubmit = async (event) => {
  event.preventDefault();

  const firstname = $("#firstname").val();
  const lastname = $("#lasttname").val();
  const password = $("#password").val();
  const confirmPassword = $("#confirmPassword").val();

  if (password === confirmPassword) {
    const requestBody = {
      firstname: firstname,
      lastname: lastname,
      password: password,
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

    if (response.status === 200) {
      window.location.replace("/login");
    } else {
      console.log("Failed to signup");
    }
  } else {
    console.log("Passwords do not match");
  }
};

console.log("client-side JS");
$("#sign-up-form").submit(handleSignupSubmit);
