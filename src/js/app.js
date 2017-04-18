var galleryData = {
};

var galleryItems = $(".gallery-item");

for (var i = 0; i < galleryItems.length; i++){
    galleryData[i] = {
            source: "source "+i.toString(),
            caption: "caption "+i.toString(),
        };
}

for (var key in galleryData) {
}

// filter the image search box
var filterImage = function(){
    var searchText = $('#search-box').val().toLowerCase();
    
    $(".gallery-item a").each(function(index) {
        var href = $(this).attr("href").toLowerCase();
        var caption = $(this).attr("data-caption").toLowerCase();
        var alt = $(this).children().attr("alt").toLowerCase();

        if (href.includes(searchText) || caption.includes(searchText) || alt.includes(searchText)){
            $(this).parent().show();
        } else {
            $(this).parent().hide();
        }
    });
};

// event handlers

$('.gallery-item a').click(function(event){
    event.preventDefault();
    console.log(event);
    console.log(this);
});

$('#search-box').keyup(filterImage);