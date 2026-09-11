import { useEffect, useState } from 'react'
import './App.css'

function LoginPage({ onBack, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const handleLogin = (event) => {
  event.preventDefault()

  if (email === 'demo@mrsherlock.com' && password === 'sherlock123') {
    alert('Login successful!')
    onLogin()
  } else {
    alert('Invalid email or password.')
  }
}

  return (
    <div className="login-page">

      <div className="login-visual">
        <img
          src="/images/sherlock-login.png"
          alt="Mr.Sherlock Lost and Found"
        />
      </div>

      <div className="login-section">

        <div className="login-card">

          <div className="login-logo">
            Mr.Sherlock
          </div>

          <h1>Welcome Back</h1>

          <p className="login-subtitle">
            Sign in to report items, track your reports,
            and find what you lost.
          </p>

          <form className="login-form" onSubmit={handleLogin}>

            <label>Email address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button
              type="submit"
              className="login-button"
            >
              Sign In →
            </button>

          </form>

          <p className="login-switch">
            Don't have an account?{' '}
            <button type="button">
              Sign Up
            </button>
          </p>

          <button
            className="login-back"
            onClick={onBack}
          >
            Continue as Guest →
          </button>

        </div>

      </div>

    </div>
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const [view, setView] = useState('login')
  const [previousView, setPreviousView] = useState('home')
  const [itemName, setItemName] = useState('')
  const [itemCategory, setItemCategory] = useState('')
  const [description, setDescription] = useState('')
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [reportType, setReportType] = useState('Lost')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [items, setItems] = useState(() => {
  const savedItems = localStorage.getItem('items')

  if (savedItems) {
    return JSON.parse(savedItems)
  }

  return []
})

useEffect(() => {
  localStorage.setItem('items', JSON.stringify(items))
}, [items])
  const calculateMatch = (lostItem, foundItem) => {
  let score = 0

  const lostName = lostItem.name.toLowerCase().trim()
  const foundName = foundItem.name.toLowerCase().trim()

  if (lostItem.category === foundItem.category) {
    score += 25
  }

  // Smart item-name matching
  if (lostName === foundName) {
    score += 25
  } else if (
    lostName.includes(foundName) ||
    foundName.includes(lostName)
  ) {
    score += 20
  } else {
    const lostWords = lostName.split(/\s+/)
    const foundWords = foundName.split(/\s+/)

    const commonWords = lostWords.filter((word) =>
      foundWords.includes(word)
    )

    if (commonWords.length > 0) {
      score += 15
    }
  }

  if (lostItem.location.toLowerCase() === foundItem.location.toLowerCase()) {
    score += 20
  }

  if (
    lostItem.description.toLowerCase().includes(foundItem.description.toLowerCase()) ||
    foundItem.description.toLowerCase().includes(lostItem.description.toLowerCase())
  ) {
    score += 15
  }

  if (lostItem.dateTime && foundItem.dateTime) {
    const lostTime = new Date(lostItem.dateTime)
    const foundTime = new Date(foundItem.dateTime)

    const difference =
      Math.abs(lostTime - foundTime) / (1000 * 60)

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

  const lostName = lostItem.name.toLowerCase().trim()
  const foundName = foundItem.name.toLowerCase().trim()

  if (lostName === foundName) {
    reasons.push('Same item name')
  } else if (
    lostName.includes(foundName) ||
    foundName.includes(lostName)
  ) {
    reasons.push('Similar item name')
  } else {
    const lostWords = lostName.split(/\s+/)
    const foundWords = foundName.split(/\s+/)

  if (lostWords.some((word) => foundWords.includes(word))) {
    reasons.push('Related item name')
  }
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
              <strong>Phone:</strong> {selectedItem.phone || 'Not provided'}
            </p>

            <p>
              <strong>Date & Time:</strong> {selectedItem.dateTime || 'Not provided'}
            </p>
          </div>

        </main>
      </div>
    )
  }
 if (view === 'login') {
  return (
    <LoginPage
      onBack={() => setView('home')}
      onLogin={() => {
        setIsLoggedIn(true)
        setView('home')
      }}
    />
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

              <label>Phone number</label>

              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

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
                    phone: phone,
                    dateTime: dateTime
                  }

                  setItems([...items, newItem])
                  setView('home')

                  setItemName('')
                  setItemCategory('')
                  setDescription('')
                  setPhone('')
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
        <h2>Mr.Sherlock</h2>

        <nav>
  <button
    className="nav-link"
    onClick={() => setView('browse')}
  >
    Browse
  </button>

  {!isLoggedIn && (
    <button
      className="login-nav"
      onClick={() => setView('login')}
    >
      Sign In
    </button>
  )}
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
            
            <button
              className="view-all-button"
              onClick={() => setView('browse')}
            >
              View all
            </button>
          </div>
          <div className="items">
            {filteredItems.slice(0, 3).map((item) => (
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
            <button
              className="view-all-button"
              onClick={() => setView('browse')}
            >
              View all
            </button>
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
