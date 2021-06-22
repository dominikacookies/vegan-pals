console.log("hello to the client");

const renderHomePageCards = () => {};

const renderRecipe = (event) => {
  event.preventDefault();
  //click event on image
  window.location.replace("/recipe/:id");
};

const onSubmit = async (event) => {
  event.preventDefault();
  const searchInput = $("#searchInput").val();
  console.log(searchInput);

  let intolerances = document.querySelectorAll(".intolerance:checked");
  intolerances = Array.prototype.slice.call(intolerances);
  const prepTime = $("input[type='radio']:checked").attr("id");
  console.log(intolerances);
  const callback = (each) => {
    return each.name;
  };
  const intoleranceNames = intolerances.map(callback);
  console.log(intoleranceNames, prepTime);

  const requestBody = {
    searchInput,
    intoleranceNames,
    prepTime,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(requestBody),
  };
  const response = await fetch("/search-results", options);
  console.log(response);
  if (response.status !== 200) {
    console.log("FAILED TO RENDER SEARCH RESULTS");
  } else {
    window.location.replace("/search-results");
  }
};
$("#searchButton").on("click", onSubmit);
$("recipe-card").on("click", renderRecipe);

$(document).ready(() => {
  //   renderHomePageCards();
  console.log("hi");
});
