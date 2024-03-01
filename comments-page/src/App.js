import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {useRef} from 'react';
function ImageUpload() {
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

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
      {image && <img src={image} alt="Uploaded" style={{ width: '100%', marginTop: '20px' }} />}
    </div>
  );
}
function App() {
  const [inputValue, setInputValue] = useState('');
  const adjustHeight = (event) => {
    const element = event.target;
    element.style.height = 'auto'; // Reset height to recalculate
    element.style.height = `${element.scrollHeight}px`; // Set new height based on content
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
        <div>
          
        </div>
          <ImageUpload /> 
          <hr />
          <button className="post">Save & Post</button>
          </div>
      </header>
      
    </div>
  );
}

export default App;
