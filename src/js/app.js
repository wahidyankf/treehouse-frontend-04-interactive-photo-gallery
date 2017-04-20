var stateApp = {
    galleryData: {},
    galleryLength: null,
    showLightbox: false,
    lightboxNav: {
        prevHref: null,
        currentHref: null,
        nextHref: null
    }
};

// ---------
// function declarations
// ---------

var initGalleryData = function () {
    var galleryItems = $('[data-lightbox="lightbox"]');
    stateApp.galleryLength = galleryItems.length;
    for (var i = 0; i < stateApp.galleryLength; i++) {
        stateApp.galleryData[i] = {};
        stateApp.galleryData[i].show = true;
        stateApp.galleryData[i].href = $(galleryItems[i]).attr("href");
        stateApp.galleryData[i].caption = $(galleryItems[i]).attr("data-caption");
        stateApp.galleryData[i].alt = $(galleryItems[i]).children().attr("alt");
    }
};

var filterImage = function (searchText) {
    for (var i = 0; i < stateApp.galleryLength; i++) {
        if (stateApp.galleryData[i].href.includes(searchText) || stateApp.galleryData[i].caption.includes(searchText) || stateApp.galleryData[i].alt.includes(searchText)) {
            stateApp.galleryData[i].show = true;
        } else {
            stateApp.galleryData[i].show = false;
        }
    }
};

var showImage = function () {
    for (var i = 0; i < stateApp.galleryLength; i++) {
        if (stateApp.galleryData[i].show === true) {
            $(`[href="${stateApp.galleryData[i].href}"]`).parent().show();
        } else {
            $(`[href="${stateApp.galleryData[i].href}"]`).parent().hide();
        }
    }
};

var updateLightboxNav = function (currentHref) {
    stateApp.lightboxNav.currentHref = currentHref;

    var currentIndex = 0;
    var nextIndex = 0;
    var prevIndex = 0;

    var filteredGalleryItems = [];
    for (var i = 0; i < stateApp.galleryLength; i++) {
        if (stateApp.galleryData[i].show === true) {
            filteredGalleryItems.push(i);
        }
    }
    var filteredGalleryLength = filteredGalleryItems.length;

    // find current href index in galleryData
    for (var j = 0; j < stateApp.galleryLength; j++) {
        if (stateApp.galleryData[j].href === currentHref) {
            currentIndex = j;
        }
    }

    // find current index position in filteredGallery
    var currentIndexOnFilteredGallery = null;
    for (var k = 0; k < filteredGalleryLength; k++) {
        if (currentIndex == filteredGalleryItems[k]) {
            currentIndexOnFilteredGallery = k;
        }
    }

    // find prev index
    if ((currentIndexOnFilteredGallery - 1) < 0) {
        prevIndex = filteredGalleryItems[filteredGalleryLength - 1];
    } else {
        prevIndex = filteredGalleryItems[currentIndexOnFilteredGallery - 1];
    }

    // find next index
    if ((currentIndexOnFilteredGallery + 1) >= filteredGalleryLength) {
        nextIndex = filteredGalleryItems[0];
    } else {
        nextIndex = filteredGalleryItems[currentIndexOnFilteredGallery + 1];
    }

    // find next href index
    stateApp.lightboxNav.nextHref = stateApp.galleryData[nextIndex].href;

    // find prev href
    stateApp.lightboxNav.prevHref = stateApp.galleryData[prevIndex].href;
};

var updateLightbox = function (currentHref) {
    $('#lightbox-image').attr("src", stateApp.lightboxNav.currentHref);

    var imageCaption = null;
    for (var i = 0; i < stateApp.galleryLength; i++) {
        if (stateApp.galleryData[i].href == currentHref) {
            imageCaption = stateApp.galleryData[i].caption;
        }
    }
    $('#lightbox-caption').html(imageCaption);
};

var showLightbox = function () {
    if (stateApp.showLightbox === true) {
        $('#overlay').css("display", "flex");
    } else {
        $('#overlay').css("display", "none");
    }
};

// --------
// main program
// --------

initGalleryData();

$('#search-box').keyup(function () {
    var searchText = $(this).val();
    filterImage(searchText);
    showImage();
});

$('.gallery-item a').click(function (event) {
    event.preventDefault();
    var currentHref = $(this).attr("href");
    updateLightboxNav(currentHref);
    updateLightbox(currentHref);
    stateApp.showLightbox = true;
    showLightbox();
});

$('#overlay .lightbox-center').click(function () {
    stateApp.showLightbox = false;
    showLightbox();
});

$('#lightbox-prev').click(function () {
    updateLightboxNav(stateApp.lightboxNav.prevHref);
    updateLightbox(stateApp.lightboxNav.prevHref);
});

$('#lightbox-next').click(function () {
    updateLightboxNav(stateApp.lightboxNav.nextHref);
    updateLightbox(stateApp.lightboxNav.nextHref);
});

$('body').keyup(function (e) {
    if (stateApp.showLightbox === true) {
        if (e.which == 27) {
            // esc has been pressed
            stateApp.showLightbox = false;
            showLightbox();
        } else if (e.which == 37 || e.which == 38) {
            // left or up arrow has been pressed
            updateLightboxNav(stateApp.lightboxNav.prevHref);
            updateLightbox(stateApp.lightboxNav.prevHref);
        } else if (e.which == 39 || e.which == 40) {
            // right or down arrow has been pressed
            updateLightboxNav(stateApp.lightboxNav.nextHref);
            updateLightbox(stateApp.lightboxNav.nextHref);
        }
    }
});