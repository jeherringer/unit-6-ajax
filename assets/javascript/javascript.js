let searchTerms = ["Iron Man", "Hulk", "Spider-Man", "Nightcrawler"];


// need a function that will add the search term to searchTerms array and run the for each function
// giphy api key: QjnsrlcRR1bPCUn4xTBC8QCO1Ta58Sp9
// supehero apikey: 10211780581253538
// base superhero url: http://superheroapi.com/api/10211780581253538/search/

    
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

    $(document).on("click", ".buttonSearch", function() {
        event.preventDefault();
        let searchValue = $(this).attr("data-superhero");
        let lowerSearchValue = searchValue.toLowerCase();
        console.log(lowerSearchValue);
        let queryURL = "http://superheroapi.com/api/10211780581253538/search/" + lowerSearchValue;

        $.ajax({ 
            url: queryURL,
            method: "GET",
        })
        .then(function(response) {
            console.log(response);
            let result = response.results;
            for (var i = 0; i < result.length; i++) {

                $("#heroName").empty();
                let newName = $("<h1>");
                let heroName = result[i].name;
                newName.text(heroName);
                $("#heroName").prepend(newName);

                $("#heroFullName").empty();
                let newheroName = $("<p>");
                let heroFullName = result[i].biography["full-name"];
                newheroName.text(heroFullName);
                $("#heroFullName").append(newheroName);

                $("#heroAlterEgo").empty();
                let newheroEgo = $("<p>");
                let heroEgo = result[i].biography["alter-egos"];
                newheroEgo.text(heroEgo);
                $("#heroAlterEgo").append(newheroEgo);

                $("#heroBirth").empty();
                let newheroBirth = $("<p>");
                let heroBirth = result[i].biography["place-of-birth"];
                newheroBirth.text(heroBirth);
                $("#heroBirth").append(newheroBirth);

                $("#heroPublisher").empty();
                let newheroPublish = $("<p>");
                let heroPublish = result[i].biography["publisher"];
                newheroPublish.text(heroPublish);
                $("#heroPublisher").append(newheroPublish);

                $("#heroConnections").empty();
                let newheroConnection = $("<p>");
                let heroConnection = result[i].connections["group-affiliation"];
                newheroConnection.text(heroConnection);
                $("#heroConnections").append(newheroConnection);

                $("#heroImg").empty();
                let newheroImage = $("<img>");
                let heroImage = result[i].image.url;
                newheroImage.attr("src", heroImage);
                $("#heroImg").append(newheroImage);
            }
        })
    })
    
})
