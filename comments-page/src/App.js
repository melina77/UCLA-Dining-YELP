import './App.css';
import Nav from './nav.js';
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
      <button className="pics" onClick={handleButtonClick} style={{fontFamily: 'monospace'}}>Upload an image</button>
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

function Comment() {
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef(null);
  const adjustHeight = (event) => {
    const element = event.target;
    element.style.height = 'auto'; // Reset height to recalculate
    element.style.height = `${element.scrollHeight}px`; // Set new height based on content
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', inputValue);
    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formData.append('image', fileInputRef.current.files[0]); // Ensure the image is included
    }

    try {
      // Replace 'your-server-endpoint' with your actual endpoint URL
      const response = await fetch('your-server-endpoint', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      console.log(result);
      // Handle success
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  }


  
  return (
    <div className="App">
      {/* <div className="BG-header">
          BruinGrub  
        </div>
        <hr /> */}
      <h1> ~ Here is the comment section! ~ </h1>
      
      <div className="App-header">
      <div className = "box-border">
      <form id="postForm" onSubmit={handleSubmit}>
      <textarea
            placeholder = "Add a comment..."
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
              fontFamily: 'monospace'

            }}
        />
        <ImageUpload fileInputRef={fileInputRef}/> 
        <button className="submit" style={{fontFamily: 'monospace'}}>Save & Post</button>
        </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
    <Nav />
    <div>
      <Comment />
    </div>
    </>
  );
}

export default App;
