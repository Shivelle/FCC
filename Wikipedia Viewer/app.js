var searchQuery;
var url;

//press enter for search
$("#query").keyup(function(event) {
    if (event.keyCode == 13) {
        $("#query-btn").click();
    }
});

//query btn
$("#query-btn").on("click", function() {
    $("#results").empty();
    submit();
});

function submit() {
    searchQuery = $("#query").val();
    url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&titles=&utf8=1&srsearch=' + searchQuery + '&srlimit=15';
    $.ajax({
        url: url,
        dataType: "jsonp",
        success: function(response) {
            for (var i = 0; i < 15; i++) {
                $("#brainiac").addClass("animated fadeOut").fadeOut();
                $("#results").append("<div class='box container'></div>");
                $(".box:last-child").addClass("animated fadeInUp");
                $(".box:last-child").append('<a class="title" target="_blank" href="https://en.wikipedia.org/wiki/' + response.query.search[i].title + '">' + response.query.search[i].title + '</a>');
                $(".box:last-child").append('<p id="demo">' + response.query.search[i].snippet + '</p>');
             
            }

        }

    });
}