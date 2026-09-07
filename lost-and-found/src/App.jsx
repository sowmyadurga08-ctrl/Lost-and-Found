import { useState } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
    const items = [
    {
      name: 'iPhone',
      location: 'Block A',
      status: 'Lost',
      icon: '📱',
      category: 'Electronics'
    },
    {
      name: 'Keys',
      location: 'Library',
      status: 'Found',
      icon: '🔑',
      category: 'Keys'
    },
    {
      name: 'AirPods',
      location: 'Cafeteria',
      status: 'Lost',
      icon: '🎧',
      category: 'Electronics'
    }
  ]
    const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">

      <header className="navbar">
        <h2>Lost & Found</h2>

        <nav>
          <a href="#">Browse</a>
          <a href="#">My Reports</a>
        </nav>
      </header>

      <main>

        <section className="hero">

          <p className="eyebrow">CAMPUS LOST & FOUND</p>

          <h1>
            What are you<br />
            looking for?
          </h1>

          <p className="hero-description">
            Find items reported across campus or help someone
            get back what they've lost.
          </p>

          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search for an item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="categories">
            <button>All</button>
            <button>Electronics</button>
            <button>Keys</button>
            <button>Bags</button>
          </div>

          <p className="report-text">Can't find it?</p>

          <div className="buttons">
            <button className="primary-button">Report Lost</button>
            <button className="secondary-button">Report Found</button>
          </div>

        </section>

        <section className="recent">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CAMPUS ACTIVITY</p>
              <h2>Recently reported</h2>
            </div>
            <a href="#">View all</a>
          </div>
          <div className="items">
            {filteredItems.map((item) => (
              <div className="item-card" key={item.name}>

                <div className="item-icon">{item.icon}</div>

                <h3>{item.name}</h3>

                <p>{item.location}</p>

                <span className={item.status === 'Lost' ? 'lost' : 'found'}>
                  {item.status}
                </span>

              </div>
            ))}
          </div>
        </section>

        <section className="matches">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SMART MATCHING</p>
              <h2>Possible matches</h2>
            </div>
            <a href="#">View all</a>
          </div>
          <div className="match-items">
            <div className="match-card">
              <div className="match-icon">🎧</div>
              <div className="match-info">
                <h3>Airpods</h3>
                <p>Found near Cafeteria</p>
                <div className="match-score">
                  <strong>87%</strong>
                  <span>possible match</span>
                </div>
              </div>
          </div>
          <div className="match-card">
            <div className="match-icon">🎒</div>
            <div className="match-info">
              <h3>Black Backpack</h3>
              <p>Reported near Block A</p>
              <div className="match-score">
                <strong>76%</strong>
                <span>possible match</span>
              </div>
            </div>
          </div>
        </div>
                </section>

        <section className="how-it-works">

          <div className="section-heading">
            <div>
              <p className="eyebrow">HOW IT WORKS</p>
              <h2>From lost to found.</h2>
            </div>
          </div>

          <div className="steps">

            <div className="step">
              <span>01</span>
              <h3>Report</h3>
              <p>Tell us what you lost or found and where it happened.</p>
            </div>

            <div className="step">
              <span>02</span>
              <h3>We match</h3>
              <p>Our system compares reports and finds possible matches.</p>
            </div>

            <div className="step">
              <span>03</span>
              <h3>Reunite</h3>
              <p>Check the match and connect to get the item back.</p>
            </div>

          </div>

        </section>

      </main>

    </div>
  )
}

export default App
