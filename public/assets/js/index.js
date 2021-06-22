$(".datepicker").datepicker();

const onSubmit = async (event) => {
  event.preventDefault();

  const searchInput = $("#searchInput").val();

  let searchInputParams = "";

  if (searchInput) {
    searchInputParams = `&query=${searchInput}`;
  }

  const checkedIntolerances = document.querySelectorAll(".intolerance:checked");

  let intoleranceParams = "";

  if (checkedIntolerances.length > 0) {
    const intolerances = Array.prototype.slice.call(checkedIntolerances);

    const getIntoleranceName = (intolerance) => {
      return intolerance.name;
    };

    intoleranceParams =
      "&intolerances=" + intolerances.map(getIntoleranceName).join(",");
  }

  let prepTimeParams = "";

  const prepTime = $("input[type='radio']:checked").attr("id");

  if (prepTime) {
    prepTimeParams = `&maxReadyTime=${prepTime}`;
  }

  window.location.replace(
    `/search-results?${searchInputParams}${intoleranceParams}${prepTimeParams}`
  );
};

const renderMoreResults = async () => {
  console.log("render");
};

const createCookTogether = async (event) => {
  const date = $("#date-input").val();
  const mealType = $(".form-check-input:checked").val();
  const message = $(".message").val();
  const contactDetailsForSendingUser = $(".contact-details").val();
  const userIdReceivingInvite = $(".offcanvas").attr("data-user");

  console.log(
    date,
    mealType,
    message,
    contactDetailsForSendingUser,
    userIdReceivingInvite
  );

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      date,
      mealType,
      message,
      contactDetailsForSendingUser,
      userIdReceivingInvite,
    }),
  };

  const response = await fetch("/api/cooktogether", options);

  if (response.status === 200) {
    $(".offcanvas-body").empty();
    $(".offcanvas-body").append(`
    <h3> Request sent successfully! </h3>`);

    setTimeout(() => {
      window.location.replace(`/cooktogether`);
    }, 500);
  }
  //handle errors
};

const saveToFavourites = async (event) => {
  const title = $('[name="recipe-title"]').text();
  const image = $('[name="recipe-image"]').attr("src");
  const { id } = event.currentTarget;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify({
      title,
      image,
      id,
    }),
  };

  console.log(title, image, id);
  const response = await fetch(`/api/recipe/${id}`, options);

  if (response.status !== 200) {
    console.log("FAILED TO SAVE RECIPE");
  } else {
    window.location.replace(`/myrecipes`);
  }
}

const provideCooktogetherContactDetails = async (event) => {
  $(event.currentTarget).parent().empty()
  $(event.currentTarget).parent().append(`
    <p> What's the best way to get in touch?</p>
    <textarea class="contact-details"> </textarea>
    <button class="accept-request-button"> Accept </button>
  `)
}

const acceptCooktogether = async (event) => {
  event.preventDefault()
  const cooktogetherId = $(event.currentTarget).parent().attr("data-requestId")

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  const response = await fetch(`/api/cooktogether/${cooktogetherId}`, options);

  if (response.status === 200) {
    $(".requests-buttons").parent().empty()
    $(".requests-buttons").parent().append(`
    <p> Deleted successfully. </p>
    `)
    setTimeout(() => { location.reload() }, 500);
  }
}

const deleteCooktogether = async (event) => {
  event.preventDefault()
  const cooktogetherId = $(event.currentTarget).parent().attr("data-requestId")

  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
  };

  const response = await fetch(`/api/cooktogether/${cooktogetherId}`, options);

  if (response.status === 200) {
    $(".requests-buttons").empty()
    $(".requests-buttons").append(`
    <p> Deleted successfully. </p>
    `)
    setTimeout(() => { location.reload() }, 500);
  }
}


$("#searchButton").on("click", onSubmit);
$("#renderMoreResults").on("click", renderMoreResults)
$("#cooktogether-button").on("click", provideCooktogetherContactDetails)
$(".extra-info-button").on("click", acceptCooktogether)
$(".accept-request-button").on("click", acceptCooktogether)
$(".cancel-request-button").on("click", deleteCooktogether)
$(".decline-request-button").on("click", deleteCooktogether)
$('button[name="add-to-favourites-btn"]').on("click", saveToFavourites);
