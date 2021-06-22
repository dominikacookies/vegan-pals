$(".datepicker").datepicker(); 

const onSubmit = async (event) => {
  event.preventDefault();

    const searchInput = $("#searchInput").val();

    let searchInputParams = ""

    if (searchInput) {
      searchInputParams = `&query=${searchInput}`
    }
  
    const checkedIntolerances = document.querySelectorAll(".intolerance:checked")

    let intoleranceParams = ""

    if (checkedIntolerances.length > 0) {
      const intolerances = Array.prototype.slice.call(checkedIntolerances);

       const getIntoleranceName = (intolerance) => {
          return intolerance.name
      }

      intoleranceParams = "&intolerances=" + intolerances.map(getIntoleranceName).join(",")
    }

    let prepTimeParams =""

    const prepTime = $("input[type='radio']:checked").attr("id")

    if (prepTime) {
      prepTimeParams = `&maxReadyTime=${prepTime}`
    }

    window.location.replace(`/search-results?${searchInputParams}${intoleranceParams}${prepTimeParams}`)
    
};

const renderMoreResults = async () => {
   console.log("render")
}

const createCookTogether = async (event) => {
  const date = $("#date-input").val()
  const mealType = $(".form-check-input:checked").val()
  const message = $(".message").val()
  const contactDetailsForSendingUser = $(".contact-details").val()
  const userIdReceivingInvite = $(".offcanvas").attr("data-user")
  const recipeId = $("#pal-cards-container").attr("data-recipe")

  console.log(date, mealType, message, contactDetailsForSendingUser, userIdReceivingInvite, recipeId)

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
      recipeId
    }),
  };

  const response = await fetch("/api/cooktogether", options);

  if (response.status === 200) {

    $(".offcanvas-body").empty()
    $(".offcanvas-body").append(`
    <h3> Request sent successfully! </h3>`)

    setTimeout(() => { window.location.replace(`/cooktogether`) }, 500);

  }
  //handle errors

}


$("#searchButton").on("click", onSubmit);
$("#renderMoreResults").on("click", renderMoreResults)
$("#cooktogether-button").on("click", createCookTogether)
