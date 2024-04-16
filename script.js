const uploadInput = document.getElementById('uploadInput');
const uploadedImage = document.getElementById('uploadedImage');
const imageContainer = document.getElementById('imageContainer');
const uploadText = document.querySelector('.upload-text');
const convertBtn = document.getElementById('convertBtn');
const downloadBtn = document.getElementById('downloadBtn');
const sizeDiv = document.querySelector('.size');
const uploadIcon = document.querySelector('.upload-icon');

uploadInput.addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
            uploadedImage.src = event.target.result;
            uploadedImage.style.display = 'block';
            uploadText.style.display = 'none';
            uploadIcon.style.display = 'none'; // Hide the upload icon
        };

        reader.readAsDataURL(file);
    }
});

imageContainer.addEventListener('click', function () {
    uploadInput.click();
});

function convertToWebP() {
    const inputElement = document.getElementById('uploadInput');

    if (!inputElement.files || inputElement.files.length === 0 || inputElement.files[0].type !== 'image/png') {
        alert('Please select a PNG image file for conversion to WebP.');
        return;
    }
    const file = inputElement.files[0];
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (e) {
        img.src = e.target.result;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);

            canvas.toBlob(function (blob) {
                const convertedSize = (blob.size / 1024).toFixed(2); // Size in KB
                const webpDataURL = URL.createObjectURL(blob);

                // Update the size div with image name and size after conversion
                sizeDiv.innerHTML = `Image Name: ${file.name}<br>Image Size (WEBP): ${convertedSize} KB`;

                // Store the converted image in a global variable for download later
                window.convertedImage = webpDataURL;
            }, 'image/webp');
        };
    };

    reader.readAsDataURL(file);
}

function convertToWebP() {
    const inputElement = document.getElementById('uploadInput');
    const file = inputElement.files[0];

    if (!file) {
        alert('Please select an image file for conversion.');
        return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (e) {
        img.src = e.target.result;

        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);

            canvas.toBlob(function (blob) {
                const convertedSize = (blob.size / 1024).toFixed(2); // Size in KB
                const webpDataURL = URL.createObjectURL(blob);

                // Update the size div with image name and size after conversion
                sizeDiv.innerHTML = `Image Name: ${file.name}<br>Image Size (WEBP): ${convertedSize} KB`;

                // Store the converted image in a global variable for download later
                window.convertedImage = webpDataURL;
            }, 'image/webp');
        };
    };

    reader.readAsDataURL(file);
}


convertBtn.addEventListener('click', function () {
    convertToWebP();
});

downloadBtn.addEventListener('click', function () {
    if (window.convertedImage) {
        const downloadLink = document.createElement('a');
        downloadLink.href = window.convertedImage;
        downloadLink.download = 'converted_image.webp';
        downloadLink.click();
    } else {
        alert('Please convert the image first.');
    }
});


const resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener('click', function () {
    uploadedImage.style.display = 'none';
    uploadedImage.removeAttribute('src');
    uploadText.style.display = 'block';
    uploadIcon.style.display = 'flex'; // Display the upload icon properly
    sizeDiv.innerHTML = ''; // Clear the size div content
    window.convertedImage = null; // Reset converted image variable if any
    uploadInput.value = ''; // Reset input value to allow re-uploading of the same file
    imageContainer.style.alignItems = 'center'; // Reset the alignment of the image container
});