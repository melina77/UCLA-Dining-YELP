import './App.css';
function Header() {

  return (
    <div>
      <header>
        <h1 id='title'>BruinGrub</h1>
        <nav>
          <a class="active" href="#home">Home</a>
          <a href="#calorie-counter">Calorie Counter</a>
          <a href="#contact">Contact</a>
          <a href="#logout">Logout</a>
        </nav>
      </header>
    </div>
  )
}
function App() {
  return (
    <><Header /><div>
      <hr />
    </div></>
  );
}

export default App;
