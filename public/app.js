// On click function for comment button
$(document).on("click", "#comment-button", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id of selected article
    var thisId = $(this).attr("data-id");

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the article information to the modal
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h3>" + data.title + "</h3>");
            // The summary of the article
            $("#notes").append('<p>' + data.summary + '</p>');
            // Comments, if any
            if (data.comment) {
                $("#notes").append('<small class="text-muted"><strong>' + data.comment.name + '</strong> says <em>' + data.comment.text + '</em></small><br>');

            };


            // Add comment
            // User's name
            $("#notes").append('<br><div class="form-group"><label for="nameinput">Enter your name</label><input type="name" class="form-control" id="nameinput"></div>')
            // $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            $("#notes").append('<form><div class="form-group"><label for="bodyinput">Add your comment</label><textarea class="form-control" id="bodyinput" name="body" rows="3"></textarea></div></form>')
            // Save comment to selected article using its _id
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        });
});

// On post click
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // POST comment text to selected article
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            name: $("#nameinput").val(),
            text: $("#bodyinput").val()
        }
    })
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").prepend('<em>Your comment has been added!</em>');
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#bodyinput").val("");
});
