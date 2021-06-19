console.log("hello to the client");

const renderHomePageCards = () => {
    
}


const onSubmit = (event) => {
  event.preventDefault();

  const searchInput = $("#searchInput").val();
  console.log(searchInput);
  
    let intolerances = document.querySelectorAll(".intolerance:checked")
    intolerances = Array.prototype.slice.call(intolerances);
    const prepTime = $("input[type='radio']:checked").attr("id")
    console.log(intolerances)
     const callback = (each) => {
        return each.name
    }
    const intoleranceNames = intolerances.map(callback)
    console.log(intoleranceNames,prepTime)
};

$("#searchButton").on("click", onSubmit);

$(document).ready(() => {
//   renderHomePageCards();
});
