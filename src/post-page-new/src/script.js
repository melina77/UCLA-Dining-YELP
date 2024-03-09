function uploadImage() {
    const input = document.getElementById('imageInput');
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            // Here, you can display the image or send it to a server
            console.log(e.target.result); // This is the base64 image data
            // To display the image, you could do something like:
            const img = document.createElement('img');
            img.src = e.target.result;
            document.body.appendChild(img);
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        alert('Please select an image.');
    }
}
function displayReview(){
    
}
