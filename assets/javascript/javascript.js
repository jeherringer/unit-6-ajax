let searchTerms = ["Iron Man", "The Hulk", "Spider Man", "Nightcrawler"];


// need a function that will add the search term to searchTerms array and run the for each function
// giphy api key: QjnsrlcRR1bPCUn4xTBC8QCO1Ta58Sp9
// marvel api key: f907289dd290b05286371a02243fb091
// base marvel url: https://gateway.marvel.com

    
$(document).ready(function () {
    searchTerms.forEach(superhero => {
        let newheroButton = $("<button>");
        $(newheroButton).attr("data-superhero", superhero);
        $(newheroButton).addClass("buttonSearch");
        $(newheroButton).attr("id", "searchButtons");
        $(newheroButton).text(superhero);
        $("#superheroButtons").append(newheroButton);
    });

    console.log(searchTerms)

    $("#searchButton").click(function(event){
        event.preventDefault();
        var addedSearch = $("#searched").val();
        searchTerms.push(addedSearch);
        let newheroButton = $("<button>");
        $(newheroButton).attr("data-superhero", addedSearch)
        $(newheroButton).addClass("buttonSearch");
        $(newheroButton).attr("id", "searchButtons");
        $(newheroButton).text(addedSearch);
        $("#superheroButtons").append(newheroButton);
        console.log(searchTerms);
    })

    $(document).on("click", ".buttonSearch", function() {
        event.preventDefault();
        let searchValue = $(this).attr("data-superhero");
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchValue + "&api_key=QjnsrlcRR1bPCUn4xTBC8QCO1Ta58Sp9&limit=10";
    
        $.ajax({
            url: queryURL,
            method: "GET",
        })
        .then(function(response) {
            $("#superheroGif").empty();
            console.log(response);

            let results = response.data;
            for (var i = 0; i < results.length; i++) {

                  var gifDiv = $("<div class='item'>");

                  var rating = results[i].rating;
 
                  var p = $("<p>").text("Rating: " + rating);
 
                  var superheroImage = $("<img>");

                  superheroImage.attr("src", results[i].images.fixed_height_still.url);
                  superheroImage.attr("data-still", results[i].images.fixed_height_still.url);
                  superheroImage.attr("data-animate", results[i].images.fixed_height.url);
                  superheroImage.attr("data-state", "still");
                  superheroImage.addClass("gif");

                  gifDiv.append(p);
                  gifDiv.append(superheroImage);

                  $("#superheroGif").prepend(gifDiv);
                }
            })
        });
    
    $(document).on("click", ".gif", function() {

        let clickedGif = $(this);
      
        let state = clickedGif.data("state");
        let animated_url = clickedGif.data("animate");
        let still_url = clickedGif.data("still");
      
        if (state == "still") {
            clickedGif.attr("src", animated_url)
            clickedGif.data("state", "animate")
        }
        else if (state == "animate") {
            clickedGif.attr("src", still_url)
            clickedGif.data("state", "still")
        }
        else {
            console.log("Oh no!!!!")
        }
    
        if (state == "still") {
            clickedGif.attr("src", animated_url);
            clickedGif.attr("data-state", "animate");
        }
      
        else if (state == "animate") {
            clickedGif.attr("src", still_url);
            clickedGif.attr("data-state", "still");
        }
        });
/*
    $(document).on("click", ".buttonSearch", function() {
        event.preventDefault();
        let searchValue = $(this).attr("data-superhero");
        let ts = $.now();
        let publickey = "f907289dd290b05286371a02243fb091";
        let privatekey = "4bc439f37cd4eb21850494135779844c28ac4ae5";
        let queryURL = "http://gateway.marvel.com/v1/public/characters?name=";

        $.ajax({ 
            url: queryURL,
            method: "GET",
        })
        .then(function(response) {
            $("#superheroInfo").empty();
            console.log(response);

        })
    })
    */
})
