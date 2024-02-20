
export default function App() {
  function handleLogout() {
    console.log("test")
  }

  return (
    <div>
      <header>
        <h1 id='title'>BruinGrub</h1>
        <div className='logout-box'>
          <button id='logout-button' onClick={handleLogout}>Logout</button>
        </div>
      </header>
      <hr className="styled-hr"/>
    </div>
  )
}
