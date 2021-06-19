console.log("hello to the client");
$(document).ready(()=>{


    const onSubmit = (event) => { 
        event.preventDefault()
        
       const searchInput =  $("#searchInput").val()
       console.log(searchInput)
       
    }
    
    $(".radioButton").on("click",(event)=>{
        console.log(event.target.id)
       })
    $("#searchButton").on("click",onSubmit)

})

