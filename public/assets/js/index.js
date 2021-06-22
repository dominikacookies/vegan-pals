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


$("#searchButton").on("click", onSubmit);