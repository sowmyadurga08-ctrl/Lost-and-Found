import { useState } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const [view, setView] = useState('home')
  const [previousView, setPreviousView] = useState('home')
  const [itemName, setItemName] = useState('')
  const [itemCategory, setItemCategory] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [reportType, setReportType] = useState('Lost')
    const [items, setItems] = useState([
    {
      name: 'iPhone',
      location: 'Block A',
      status: 'Lost',
      icon: '📱',
      category: 'Electronics',    
      description: 'Black iPhone with a clear case',
      dateTime: '2026-09-09T14:00'
    },
    {
      name: 'Keys',
      location: 'Library',
      status: 'Found',
      icon: '🔑',
      category: 'Keys',
      description: 'A set of three silver keys',
      dateTime: '2026-09-09T12:30'
    },
    {
      name: 'AirPods',
      location: 'Cafeteria',
      status: 'Lost',
      icon: '🎧',
      category: 'Electronics',  
      description: 'White AirPods in a white charging case',
      dateTime: '2026-09-09T15:00'
    }
  ])
  const calculateMatch = (lostItem, foundItem) => {
  let score = 0

  if (lostItem.category === foundItem.category) {
    score += 25
  }

  if (lostItem.name.toLowerCase() === foundItem.name.toLowerCase()) {
    score += 25
  }

  if (lostItem.location.toLowerCase() === foundItem.location.toLowerCase()) {
    score += 20
  }

  if (lostItem.description.toLowerCase().includes(foundItem.description.toLowerCase()) ||
      foundItem.description.toLowerCase().includes(lostItem.description.toLowerCase())) {
    score += 15
  }

  if (lostItem.dateTime && foundItem.dateTime) {
    const lostTime = new Date(lostItem.dateTime)
    const foundTime = new Date(foundItem.dateTime)

    const difference = Math.abs(lostTime - foundTime) / (1000 * 60)

    if (difference <= 30) {
      score += 15
    } else if (difference <= 60) {
      score += 10
    } else if (difference <= 120) {
      score += 5
    }
  }

  return score
}
const lostItems = items.filter((item) => item.status === 'Lost')
const foundItems = items.filter((item) => item.status === 'Found')
const possibleMatches = lostItems.flatMap((lostItem) =>
  foundItems
    .map((foundItem) => ({
      lostItem,
      foundItem,
      score: calculateMatch(lostItem, foundItem)
    }))
    .filter((match) => match.score >= 50)
)
const getMatchReasons = (lostItem, foundItem) => {
  const reasons = []

  if (lostItem.category === foundItem.category) {
    reasons.push('Same category')
  }

  if (lostItem.name.toLowerCase() === foundItem.name.toLowerCase()) {
    reasons.push('Same item name')
  }

  if (lostItem.location.toLowerCase() === foundItem.location.toLowerCase()) {
    reasons.push('Same location')
  }

  if (
    lostItem.description.toLowerCase().includes(foundItem.description.toLowerCase()) ||
    foundItem.description.toLowerCase().includes(lostItem.description.toLowerCase())
  ) {
    reasons.push('Similar description')
  }

  if (lostItem.dateTime && foundItem.dateTime) {
    const difference =
      Math.abs(new Date(lostItem.dateTime) - new Date(foundItem.dateTime)) /
      (1000 * 60)

    if (difference <= 30) {
      reasons.push('Reported within 30 minutes')
    } else if (difference <= 60) {
      reasons.push('Reported within an hour')
    }
  }

  return reasons
}
    const filteredItems = items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || item.category === category

      return matchesSearch && matchesCategory
    })

    if (selectedItem) {
      return (
      <div className="app">
        <main className="item-details">
          <button
            onClick={() => {
              setSelectedItem(null)
              setView(previousView)
            }}
          >
           ← Back
          </button>

          <div className="details-icon">
            {selectedItem.icon}
          </div>

          <p className={selectedItem.status === 'Lost' ? 'lost' : 'found'}>
            {selectedItem.status}
          </p>

          <h1>{selectedItem.name}</h1>

          <p className="details-location">
            📍 {selectedItem.location}
          </p>

          <div className="details-card">
            <h2>Item details</h2>

            <p>
              <strong>Status:</strong> {selectedItem.status}
            </p>

            <p>
              <strong>Category:</strong> {selectedItem.category}
            </p>

            <p>
              <strong>Location:</strong> {selectedItem.location}
            </p>

            <p>
              <strong>Description:</strong> {selectedItem.description || 'No description provided'}
            </p>

            <p>
              <strong>Date & Time:</strong> {selectedItem.dateTime || 'Not provided'}
            </p>
          </div>

        </main>
      </div>
    )
  }

    if (view === 'browse') {
  return (
    <div className="app">
      <main className="item-details">
        <button onClick={() => setView('home')}>
          ← Back to home
        </button>

        <p className="eyebrow">CAMPUS ACTIVITY</p>
        <h1>Browse items</h1>
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
  <button
    className={category === 'All' ? 'active' : ''}
    onClick={() => setCategory('All')}
  >
    All
  </button>

  <button
    className={category === 'Electronics' ? 'active' : ''}
    onClick={() => setCategory('Electronics')}
  >
    Electronics
  </button>

  <button
    className={category === 'Keys' ? 'active' : ''}
    onClick={() => setCategory('Keys')}
  >
    Keys
  </button>

  <button
    className={category === 'Bags' ? 'active' : ''}
    onClick={() => setCategory('Bags')}
  >
    Bags
  </button>
</div>

        <div className="items">
          {filteredItems.map((item) => (
            <div
              className="item-card"
              key={item.name}
              onClick={() => {
                setPreviousView('browse')
                setSelectedItem(item)
              }}
            >
              <div className="item-icon">{item.icon}</div>

              <h3>{item.name}</h3>

              <p>{item.location}</p>

              <span className={item.status === 'Lost' ? 'lost' : 'found'}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
        if (view === 'report-lost') {
      return (
        <div className="app">
          <main className="report-page">

            <button
              className="back-button"
              onClick={() => setView('home')}
            >
              ← Back to home
            </button>

            <p className="eyebrow">REPORT AN ITEM</p>

            <h1>Report a {reportType.toLowerCase()} item</h1>

            <p className="report-description">
              Tell us a little about what you lost so we can help you find it.
            </p>
            <div className="report-form">

              <label>Item name</label>

              <input
              type="text"
              placeholder="e.g. Black wallet"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              />
              <label>Category</label>

              <select
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
>
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Keys">Keys</option>
                <option value="Bags">Bags</option>
                <option value="Other">Other</option>
              </select>

              <label>Description</label>
              <textarea
                placeholder="Describe the item, colour, brand, or any other details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>

              <label>Location</label>
              <input
                type="text"
                placeholder="e.g. Library, Block A, Cafeteria"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <label>Date & Time</label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />

              <button
                className="submit-button"
                onClick={() => {
                  const newItem = {
                    name: itemName,
                    location: location,
                    status: reportType,
                    icon: '📦',
                    category: itemCategory,
                    description: description,
                    dateTime: dateTime
                  }

                  setItems([...items, newItem])
                  setView('home')

                  setItemName('')
                  setItemCategory('')
                  setDescription('')
                  setLocation('')
                  setDateTime('')
                }}
              >
                Submit Report
              </button>
            </div>

          </main>
        </div>
      )
    }

    
  return (
    <div className="app">

      <header className="navbar">
        <h2>Lost & Found</h2>

        <nav>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setView('browse')
            }}
          >
            Browse
          </a>
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
            <button
              className={category === 'All' ? 'active' : ''}
              onClick={() => setCategory('All')}
            >
              All
              </button>

              <button
              className={category === 'Electronics' ? 'active' : ''}
              onClick={() => setCategory('Electronics')}
         >
              Electronics
          </button>

          <button
            className={category === 'Keys' ? 'active' : ''}
            onClick={() => setCategory('Keys')}
        >
          Keys
        </button>

        <button
          className={category === 'Bags' ? 'active' : ''}
          onClick={() => setCategory('Bags')}
        >
          Bags
        </button>
      </div>

          <p className="report-text">Can't find it?</p>

          <div className="buttons">
            <button
              className="primary-button"
              onClick={() => {
                setReportType('Lost')
                setView('report-lost')
              }}
            >
              Report Lost
            </button>
            <button
              className="secondary-button"
              onClick={() => {
                setReportType('Found')
                setView('report-lost')
              }}
            >
              Report Found
            </button>
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
              <div
                className="item-card"
                key={item.name}
                onClick={() => {
                  setPreviousView('home')
                  setSelectedItem(item)
                }}
              >

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
            {possibleMatches.map((match, index) => (
              <div className="match-card" key={index}>
                <div className="match-icon">
                  {match.lostItem.icon}
                </div>

              <div className="match-info">
                <h3>{match.lostItem.name}</h3>

                <p>
                  Found near {match.foundItem.location}
                </p>

                <div className="match-score">
                  <strong>{match.score}%</strong>
                  <span>possible match</span>
                </div>
                <div className="match-reasons">
                  {getMatchReasons(match.lostItem, match.foundItem).map((reason, reasonIndex) => (
                    <span key={reasonIndex}>✓ {reason}</span>
                  ))}
                </div>
              </div>
             </div>
            ))}
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
