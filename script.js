const searchButton = document.getElementById('search-button');
const categoryInput = document.getElementById('category-input');
const gallery = document.getElementById('gallery');

searchButton.addEventListener('click', searchPictures);

function searchPictures() {
  const category = categoryInput.value;
  const url = `https://api.unsplash.com/search/photos?query=${category}&per_page=12&client_id=I_cO5jaiU5JAXGt_F68xn3EOV7cZ_JTJvkBpbwVc0Fo;`;

  fetch(url)
    .then(response => response.json())
    .then(data => displayPictures(data.results))
    .catch(error => console.log('Error:', error));
}

function displayPictures(pictures) {
  gallery.innerHTML = '';

  pictures.forEach(picture => {
    const pictureElement = document.createElement('div');
    pictureElement.classList.add('picture');

    const image = document.createElement('img');
    image.src = picture.urls.small;
    image.alt = picture.alt_description;

    const details = document.createElement('div');
    details.classList.add('details');
    details.innerHTML = `
      <p>By: <a href="${picture.user.links.html}" target="_blank">${picture.user.name}</a></p>
      <p>Description: ${picture.description || 'N/A'}</p>
    `;

    pictureElement.appendChild(image);
    pictureElement.appendChild(details);
    gallery.appendChild(pictureElement);
  });
}
