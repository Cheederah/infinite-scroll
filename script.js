let isInitialLoad = true;

let initialCount = 5;
let ready = false;
let imagesLoaded = 0;
let totalImages= 0;
let photosArray = [];

// Unsplash API
const apiKey = 'O5JpmDXg99WzHlyTy7FT-H0Le4hsr2HOFCY6vTP1API';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

// Update API URL With New Count
function UpdateAPIURLWithNewCount(picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;

};

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Helper function to set attributes on DOM elements
function setAttributes(elements, attributes){
    for (const key in attributes) {
        elements.setAttribute(key, attributes[key])
    }
}




// Check if all images were loaded
function imageLoaded () {
    imagesLoaded++;
    console.log(imagesLoaded)
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        
    }
}




// Create elememts for links and photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })

        // Create img for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
         })

        //  Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a> then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item)

    });
}


// Get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
        if (isInitialLoad) {
            UpdateAPIURLWithNewCount(30)
            isInitialLoad = false;
        }

    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of the page, Load more photos
window.addEventListener('scroll', ()=> {
    // console.log('scroll')
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    
    ready = false;
    getPhotos();
}
});

// On Load
getPhotos();