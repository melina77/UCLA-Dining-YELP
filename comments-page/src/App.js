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
  const HandleInputChange = (event) => {
    setInputValue(event.target.value);    
  };


  
  return (
    <div className="App">
      <div className="App-title">
      Comments - [RESTAURANT/DINING HALL]
      </div>
      
      <header className="App-header">
      <hr />
          <input
          type="text"
          value={inputValue}
          onChange={HandleInputChange}
          placeholder="Write a comment..."
        />
          <ImageUpload /> 
          <hr />
          <button className="post">Save & Post</button>
 
      </header>
    </div>
  );
}

export default App;
