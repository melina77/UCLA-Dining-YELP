import './App.css';
import {useState} from 'react';
import {useRef} from 'react';
function ImageUpload({fileInputRef}) {
  const [image, setImage] = useState(null);
  // Function to handle the image selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImage(imageUrl);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="App">
      <button className="pics" onClick={handleButtonClick}>Add an image</button>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }} // Hide the file input
        ref={fileInputRef}
      />
      <div>
      {image && <img src={image} alt="Uploaded" style={{ width: '70%', marginTop: '20px' }} />}
      </div>
    </div>
  );
}
function App() {
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef(null);
  
  const adjustHeight = (event) => {
    const element = event.target;
    element.style.height = 'auto'; // Reset height to recalculate
    element.style.height = `${element.scrollHeight}px`; // Set new height based on content
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object to hold the data to submit
    const formData = new FormData();
    // Append the selected file to the FormData object. Ensure that `fileInputRef.current.files[0]` exists
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append('image', fileInputRef.current.files[0]);
    }
    // Append the caption or description text to the FormData object
    formData.append('caption', inputValue);

    // Replace 'https://your-backend.com/api/posts' with your actual API endpoint
    fetch('https://your-backend.com/api/posts', {
      method: 'POST',
      body: formData,
      // Omit Content-Type header, let the browser set it with the correct boundary for multipart/form-data
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  };



  
  return (
    <div className="App">
      <div className="BG-header">
          BruinGrub  
        </div>
        <hr />
      <div className="App-title">
      Comments
      <div>
      ____________
      </div>
      </div>
      
      
      <header className="App-header">
      <div className = "box-border">
      <form id="postForm" onSubmit={handleSubmit}>
      <textarea
            placeholder = "Add description..."
            value={inputValue}
            onChange={(e) =>{
              setInputValue(e.target.value);
              adjustHeight(e);
            }}
            style={{ 
              overflowY: 'hidden',
              width: '500px',
              height: '55px',
              resize: 'none',
              fontFamily: 'Arial, sans-sherif'

            }}
        />
          <ImageUpload fileInputRef={fileInputRef}/> 
          <hr />
          <button className="submit">Save & Post</button>
          </form>
          </div>
      </header>
      
    </div>
  );
}

export default App;
