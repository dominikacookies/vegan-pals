const handleSignupSubmit = async (event) => {
  event.preventDefault();

  const checkedIntoleranceElements = document.querySelectorAll(
    ".intolerance:checked"
  );

  let intolerances = {};
  const defaultIntolerances = {
    gluten: false,
    peanut: false,
    sesame: false,
    grain: false,
    soy: false,
    sulphite: false,
    "tree nut": false,
    wheat: false,
  };

  if (checkedIntoleranceElements.length > 0) {
    const intoleranceElements = Array.prototype.slice.call(
      checkedIntoleranceElements
    );
    const intoleranceToObject = (acc, currValue) => {
      return {
        ...acc,
        [currValue.name]: true,
      };
    };
    intolerances = intoleranceElements.reduce(intoleranceToObject, {});
  }

  const firstName = $("#firstName").val();
  const lastName = $("#lastName").val();
  const password = $("#password").val();
  const email = $("#email").val();
  const bio = "";
  const confirmPassword = $("#confirmPassword").val();

  if (password === confirmPassword) {
    const requestBody = {
      firstName,
      lastName,
      password,
      email,
      bio,
      intolerances: {
        ...defaultIntolerances,
        ...intolerances,
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(requestBody),
    };

    const response = await fetch("/auth/signup", options);

    if (response.status === 200) {
      window.location.replace("/login");
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
  }
};

console.log("client-side JS");

$("#sign-up-form").submit(handleSignupSubmit);
