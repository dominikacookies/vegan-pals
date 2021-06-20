const onSubmit = async (event) => {
  event.preventDefault();

  const searchInput = $("#searchInput").val();
  
    const checkedIntolerances = document.querySelectorAll(".intolerance:checked")

    let intoleranceParams

    if (checkedIntolerances.length > 0) {
      const intolerances = Array.prototype.slice.call(checkedIntolerances);

       const getIntoleranceName = (intolerance) => {
          return intolerance.name
      }

      intoleranceParams = "&intolerances=" + intolerances.map(getIntoleranceName).join(",")
    }

    const prepTime = $("input[type='radio']:checked").attr("id")

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(requestBody),
    };
    const response = await fetch("/search-results",options)
    
};

$("#searchButton").on("click", onSubmit);
