const onSubmit = async (event) => {
  event.preventDefault();

    const searchInput = $("#searchInput").val();

    console.log(searchInput)

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
    

    console.log(`/search-results/${searchInputParams}${intoleranceParams}${prepTimeParams}`)

    const response = await fetch(`/search-results/${searchInputParams}${intoleranceParams}${prepTimeParams}`,options)
    
};

$("#searchButton").on("click", onSubmit);
