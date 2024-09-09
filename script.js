const imgContainer = document.getElementById('image-container');
const para = document.getElementById('para');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');

let selectedImages = [];
let imageElements = [];

// Array of image class names (images are set via CSS)
const images = [
  { class: 'img1' },
  { class: 'img2' },
  { class: 'img3' },
  { class: 'img4' },
  { class: 'img5' }
];

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderImages() {
  imgContainer.innerHTML = ''; // Clear container for rerender
  selectedImages = [];
  para.innerHTML = '';

  // Select a random image to repeat
  const randomImage = images[Math.floor(Math.random() * images.length)];

  // Create a copy of the images array and add the repeated image
  let allImages = [...images, randomImage];

  // Shuffle the images
  allImages = shuffle(allImages);

  // Create img elements dynamically
  allImages.forEach((imgObj, index) => {
    const imgElement = document.createElement('img');
    imgElement.className = imgObj.class; // Set class based on the image object
    imgElement.onclick = () => selectImage(imgObj, imgElement); // Attach click handler
    imgContainer.appendChild(imgElement);
    imageElements.push(imgElement);
  });
}

function selectImage(img, imgElement) {
  // If already selected two images or if the same image is clicked, return
  if (selectedImages.length >= 2 || selectedImages.includes(img)) return;

  selectedImages.push(img);
  imgElement.classList.add('selected'); // Mark image as selected

  // Show reset button when any image is clicked
  resetButton.style.display = 'inline';

  // Show verify button if exactly two images are selected
  if (selectedImages.length === 2) {
    verifyButton.style.display = 'inline';
  }
}

function verify() {
  if (selectedImages.length !== 2) return;

  const [firstImage, secondImage] = selectedImages;

  // Check if the two selected images are the same
  if (firstImage.class === secondImage.class) {
    para.innerHTML = 'You are a human. Congratulations!';
  } else {
    para.innerHTML = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  // Hide the verify button after verification
  verifyButton.style.display = 'none';
}

function resetGame() {
  renderImages(); // Re-render the images
  resetButton.style.display = 'none'; // Hide reset button
  verifyButton.style.display = 'none'; // Hide verify button
  selectedImages = [];
  imageElements.forEach(img => img.classList.remove('selected')); // Remove selection highlight
}

// Initialize the game on page load
renderImages();
