
function Header() {

  return (
    <div>
      <header>
        <h1 id='title'>BruinGrub</h1>
        <nav>
          <a class="active" href="#home">Home</a>
          <a href="#news">News</a>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
        </nav>
      </header>
    </div>
  )
}

function CalorieCounter() {
  return (
    <main>
      <div className='main-container'>
        <div className='counter-container'>

          <div className='counter-title'>
            <h2>Calorie Counter</h2>
          </div>

          <div className='food-calorie-title-container'>
            <div className='food-title'>
              <h3>Foods</h3>
            </div>

            <div className='calorie-title'>
              <h3>Calories</h3>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}


export default function App() {
  return (
    <div>
      <Header />
      <CalorieCounter />
    </div>
  )
}
