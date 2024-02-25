
function Header() {

  return (
    <div>
      <header>
        <h1 id='title'>BruinGrub</h1>

        <div id='navbar'>
          <nav>
            <a href='google.com'>Test</a>
            <a href='google.com'>Test2</a>
            <a className='active' href='calorie-counter'>Calorie Counter</a>
          </nav>
        </div>

      </header>
      <hr className="styled-hr"/>
    </div>
  )
}

function NavBar() {
  return null
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
      <NavBar />
      <CalorieCounter />
    </div>
  )
}
