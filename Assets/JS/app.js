var animals = ["cat", "dog", "bird"]

function createButtons() {
    var buttonArea = $("#buttonArea")

    buttonArea.empty();

    for (var i = 0; i < animals.length; i++) {
        var a = $("<button>");
        a.attr("data-name", animals[i]);
        a.text(animals[i]);
        buttonArea.append(a);
    }

}

$("#submitButton").on("click", function(event) {
    event.preventDefault();
    var animal = $("#animalInput").val().trim();
    animals.push(animal);
    $("#animalInput").val("");
    createButtons();
});

createButtons();

$("body").on("click", "button", function() {
    var choice = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8mUA8gc5IAhQbC2laZbOVxxZTMrRLhu3&q=" + choice + "&limit=10&offset=0&lang=en"

    $.ajax({
        url: queryURL,
        method : "GET"
    }).then(function(response) {
        console.log(response);
        $("#row1").empty();
        for (var j = 0; j < 10; j++) {
        var imgURL = response.data[j].images.fixed_height_still.url;
        var imgMotion = response.data[j].images.fixed_height.url;
        var amlImg = $("<img>");
        var rating = $("<p>").text("Rating: " + response.data[j].rating);
        amlImg.attr("src", imgURL);
        amlImg.attr("data-motion", imgMotion);
        amlImg.attr("data-still", imgURL);
        amlImg.attr("data-state", "still");
        rating.append(amlImg);
        console.log(response.data[j].rating);
        $("#row1").prepend(rating);
    }
    });

})

$("body").on("click", "img", function() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-motion"));
        $(this).attr("data-state", "animated")
    }

    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    }
})