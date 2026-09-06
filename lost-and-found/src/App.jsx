import './App.css'
function App() {
  return (
    <div>
      <header className = "navbar">
        <h2>Lost and Found</h2>
        <nav>
          <a href = "#">Browse</a>
          <a href="#">Report Lost</a>
          <a href="#">Report Found</a>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-text">
          <p className="small-heading">CAMPUS LOST & FOUND</p>
          <h1>
            Lost something?
            <br />
            Let's find it
          </h1>
          <p>
            Report lost or found items around campus
            and help get them back to their owners.
          </p>
        <div className="buttons">
          <button>Report Lost Item</button>
          <button>Report Found Item</button>
        </div>
      </div>
    </section>
    </div>
    
   
  )
}
export default App
