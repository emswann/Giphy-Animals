/**
 * @file Main file for executing the Giphy Animals application.
 * @author Elaina Swann
 * @version 1.0 
 */

$(document).ready(function(){
  var animals = ["lion", "tiger", "wolf", "giraffe", "koala bear",
                 "skunk", "kangaroo", "badger", "elephant", "dog" ];

  /** 
   * @function initialize 
   * @description Immediately invoked function which initializes application after document is loaded.
  */
  (function initialize() {
    renderButtons();
  })();

  /** 
   * @function renderButtons 
   * @description Renders animal buttons based on animals array.
  */
  function renderButtons() {
    $("#animal-buttons").empty();

    for (let i = 0; i < animals.length; i++) {
      $("#animal-buttons").append
        ($("<button>").attr("type", "button")
                      .addClass("btn btn-default btn-lg btn-animal")    
                      .data("name", animals[i])
                      .text(animals[i]));
    }
  }

  /** 
   * @function renderImages 
   * @description Renders images based on chosen animal name.
  */
  function renderImages() {
    const LIMIT = 10;
    var animalName = $(this).data("name");

    var APIkey = "u9qdX80ktrplgKRTTlkg4oihZ8LR1Wfq";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=u9qdX80ktrplgKRTTlkg4oihZ8LR1Wfq&q=" + animalName + "&" + "limit=" + LIMIT + "&lang=en";

    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);

      $("#animal-images").empty();

      /* Create image div and initialize source to still image. */
      for (let i = 0; i < LIMIT; i++) {
        var divAnimal = $("<div>")
                      .addClass("div-animal pull-left");

        var rating    = $("<label>")
                      .text("Rating: " + response.data[i].rating.toUpperCase());

        var imgAnimal = $("<img>")
                      .addClass("img-responsive img-animal")
                      .attr("src", 
                            response.data[i].images.fixed_height_still.url)
                      .attr("alt", animalName + " " + i + " Image")
                      .data("isStill", true)
                      .data("still", 
                            response.data[i].images.fixed_height_still.url)
                      .data("move", 
                            response.data[i].images.fixed_height.url);

        $("#animal-images").append(divAnimal.append(rating).append(imgAnimal)); 
      }
    });
  }

  /** 
   * @function toggleImage 
   * @description Changes the image from still to moving or moving to still based on its current status.
  */
  function toggleImage() {
    if ($(this).data("isStill")) {
      $(this).data("isStill", false);
      $(this).attr("src", $(this).data("move"));
    }
    else {
      $(this).data("isStill", true);
      $(this).attr("src", $(this).data("still"));     
    }
  }

  /** 
   * @function addAnimal 
   * @description Adds animal to animals array based on input from user.
   * @throws Error when user inputs a blank name. At least one character is required.
  */
  function addAnimal() {
    try {
      event.preventDefault();

      var animal = $("#animal-input").val().trim();

      /* Have to input at least one character. Empty string is not allowed. Trim takes care of all blanks input. */
      if (animal.length > 0) {
        animals.push(animal);
        renderButtons();
      }
      else {
        throw("You need to enter an animal name.");
      }
    }
    catch(error) {
      alert(error);
    }
  }

  /** 
   * @event .on ("click") 
   * @listens .btn-animal When animal button to display gifs is chosen. 
   * @param {function} renderImages
  */
  $(document).on("click", ".btn-animal", renderImages);

  /** 
   * @event .on ("click") 
   * @listens .img-animal When animal gif to toggle animation is chosen. 
   * @param {function} toggleImage
  */
  $(document).on("click", ".img-animal", toggleImage);

  /** 
   * @event .on ("click") 
   * @listens #add-animal When submit button to add animal is chosen. 
   * @param {function} addAnimal
  */
  $("#add-animal").on("click", addAnimal);

});