import axios from 'axios';

// Set the API key in the headers for all requests
axios.defaults.headers.common['x-api-key'] = 'your_key';

// Function to fetch breeds
export function fetchBreeds() {
  // Show loader while the request is in progress
  document.querySelector('select.breed-select').style.display = 'none';
  document.querySelector('div.cat-info').style.display = 'none';
  document.querySelector('p.loader').style.display = 'block';
  document.querySelector('p.error').style.display = 'none';

  return new Promise((resolve, reject) => {
    axios
      .get('https://api.thecatapi.com/v1/breeds')
      .then(response => {
        const breeds = response.data;
        // Populate the breed-select options
        const breedSelect = document.querySelector('select.breed-select');
        breedSelect.innerHTML = '';
        breeds.forEach(breed => {
          const option = document.createElement('option');
          option.value = breed.id;
          option.text = breed.name;
          breedSelect.appendChild(option);
        });

        // Hide loader and show breed-select
        document.querySelector('select.breed-select').style.display = 'block';
        document.querySelector('p.loader').style.display = 'none';

        resolve(breeds);
      })
      .catch(error => {
        // Show error message
        document.querySelector('p.error').style.display = 'block';
        document.querySelector('p.loader').style.display = 'none';
        reject(error);
      });
  });
}

// Function to fetch cat information by breed
export function fetchCatByBreed(breedId) {
  // Show loader while the request is in progress
  document.querySelector('div.cat-info').style.display = 'none';
  document.querySelector('p.loader').style.display = 'block';
  document.querySelector('p.error').style.display = 'none';

  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
      .then(response => {
        const catData = response.data[0];
        const catInfo = document.querySelector('div.cat-info');
        catInfo.innerHTML = `
          <img src="${catData.url}" alt="Cat Image">
          <p><strong>Breed:</strong> ${catData.breeds[0].name}</p>
          <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
        `;

        // Hide loader and show cat-info
        document.querySelector('div.cat-info').style.display = 'block';
        document.querySelector('p.loader').style.display = 'none';

        resolve(catData);
      })
      .catch(error => {
        // Show error message
        document.querySelector('p.error').style.display = 'block';
        document.querySelector('p.loader').style.display = 'none';
        reject(error);
      });
  });
}
