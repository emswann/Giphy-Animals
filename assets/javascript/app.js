/**
 * @file Main file for executing the Giphy Animals application.
 * @author Elaina Swann
 * @version 1.0 
 */

$(document).ready(function(){
  var animals = ["LION", "TIGER", "WOLF", "GIRAFFE", "KOALA BEAR",
                 "SKUNK", "KANGAROO", "BADGER", "ELEPHANT", "DOG"];

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

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);

      $("#animal-images").empty();

      /* Create image div and initialize source to still image. */
      for (let i = 0; i < LIMIT; i++) {
        var divAnimal = $("<div>")
                      .addClass("div-animal");

        var rating    = $("<label>")
                      .text("Rating: " + response.data[i].rating.toUpperCase());

        var imgAnimal = $("<div>")
                      .addClass("img-animal")
                      .css("background-image", "url(" + 
                            response.data[i].images.downsized_still.url + ")")
                      .data("isStill", true)
                      .data("still", 
                            response.data[i].images.downsized_still.url)
                      .data("move", 
                            response.data[i].images.downsized.url);

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
      $(this).css("background-image", "url(" + 
                  $(this).data("move") + ")");
    }
    else {
      $(this).data("isStill", true);
      $(this).css("background-image", "url(" + 
                  $(this).data("still") + ")");     
    }
  }

  /** 
   * @function doesExist 
   * @description Checks if animal exists in animals array.
   * @returns {boolean} Returns array index if animal exists or -1 if animal does not exist in animals array.
  */
  function findAnimal(animal) {
    return animals.indexOf(animal);
  }

  /** 
   * @function clearInput 
   * @description Clears input field of the form.
  */
  function clearInput() {
    $("#animal-input").val("");
  }

  /** 
   * @function addAnimal 
   * @description Adds animal to animals array based on input from user.
   * @throws Error if animal already exists in animals array.
   * @throws Error when user inputs a blank name. At least one character is required.
  */
  function addAnimal() {
    try {
      event.preventDefault();

      var animal = $("#animal-input").val().trim().toUpperCase();

      /* Have to input at least one character. Empty string is not allowed. Trim takes care of all blanks input. */
      if (animal.length > 0) {
        if (findAnimal(animal) === -1) {
          animals.push(animal);
          renderButtons();
        }
        else {
         throw("Choose another animal to add - " + animal + " already exists.");
        }
      }
      else {
        throw("You need to enter an animal name - blanks are not acceptable.");
      }
    }
    catch(error) {
      alert(error);
    }

    clearInput();
  }

  /** 
   * @function deleteAnimal 
   * @description Deletes animal from animals array based on input from user.
   * @throws Error if animal does not exist in animals array.
   * @throws Error when user inputs a blank name. At least one character is required.
  */
  function deleteAnimal() {
    try {
      // type = button (vs. submit), so no default behavior to compensate for.

      var animal = $("#animal-input").val().trim().toUpperCase();

      /* Have to input at least one character. Empty string is not allowed. Trim takes care of all blanks input. */
      if (animal.length > 0) {
        var index = findAnimal(animal);
        if (index !== -1) {
          animals.splice(index, 1); /* remove animal from array based on found position. */
          renderButtons();
        }
        else {
          throw("Choose another animal to delete - " + animal + " does not exist.");
        }
      }
      else {
        throw("You need to enter an animal name - blanks are not acceptable.");
      }
    }
    catch(error) {
      alert(error);
    }

    clearInput();
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
   * @listens #add-animal When add/submit button to add an animal is chosen. 
   * @param {function} addAnimal
  */
  $("#add-animal").on("click", addAnimal);

  /** 
   * @event .on ("click") 
   * @listens #delete-animal When delete button to delete an animal is chosen. 
   * @param {function} deleteAnimal
  */
  $("#delete-animal").on("click", deleteAnimal);

});