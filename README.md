# Lost-and-Found
# Mr.Sherlock — Lost & Found 2.0

## Google Drive link with demo video and screenshots - https://drive.google.com/drive/folders/19TiHucF4CpyZ1rp9iP8zKX5JiWsyWEyy?usp=drive_link
## Website link - https://sowmyadurga08-ctrl.github.io/Lost-and-Found/

## Login Credentials:
Email: demo@mrsherlock.com
Password: sherlock123

Guest option: Continue as Guest

## Tech Stack Used
React — Interactive Web Application, allowing users to report, browse, search, and explore items without unnecessary page reloads.
JavaScript — Application's core logic, including the Smart Matching algorithm, search, filtering, form handling, scoring, and navigation.
HTML — Provides the structure of the application
CSS — Creates the polished Mr.Sherlock interface, with custom styling, responsive layouts, interactive states, and a consistent visual identity.
Vite — Provides a fast and modern development and build environment, making the React application quick to develop and efficiently deploy.
localStorage — Gives Mr.Sherlock persistent client-side storage, allowing submitted reports to survive page refreshes without requiring a backend.
Git — Tracks the evolution of the project through structured version control, making development safer and changes easier to manage.
GitHub — Hosts the project's source code and provides a collaborative environment for version control and project management.
GitHub Pages — Makes the application publicly accessible through a live web deployment directly from the project repository.

## Don't just search. Let Mr.Sherlock find the match.

**Mr.Sherlock** is a campus-focused Lost & Found web application designed to make recovering lost items faster and smarter.

Instead of forcing students to manually search through dozens of reports, Mr.Sherlock uses a **rule-based Smart Matching system** to compare Lost and Found reports and identify possible matches automatically.

## Real time Problem that Iam trying to solve here 

Losing something on campus is frustrating.

Finding it can be even harder.

Traditional Lost & Found systems usually depend on users repeatedly searching through lists of reported items. This creates a simple problem:

**The person who lost an item may not know that someone else has already found it.**

Mr.Sherlock approaches the problem differently.

## Report it once. Let the system connect the dots

## What Makes Mr.Sherlock Different?

###  Smart Matching
Lost and Found reports are automatically compared using multiple factors instead of relying on a simple keyword search.

### Match Percentage
Every potential match receives a score out of **100**, making the system's confidence easy to understand.

### Explainable Results
Mr.Sherlock doesn't just say *"This might match." 

It explains **why**:

> ✓ Same category  
> ✓ Similar item name  
> ✓ Same location  
> ✓ Reported within 30 minutes

### Flexible Name Matching
The system can recognize:
- Exact item names
- Partial matches
- Common words between names

### Location Awareness
Reports from the same location receive additional matching weight.

### Persistent Reports
This is one place where I faced the real challenge. I was able to fix this by storing Reports using browser `localStorage`, so refreshing the application does not erase submitted reports.

### Guest-Friendly
Users can browse reported items without signing in.

### Direct Contact
Each report can include a phone number so that potential finders can contact the reporter directly.


## Core Features

### Report Lost / Found

Users can submit a report containing:

- Item name
- Category
- Description
- Phone number
- Location
- Date & time
- Report type — Lost or Found

### Search & Filter

Users can quickly browse reports by:

- Item name
- Category
- Electronics
- Keys
- Bags
- All reports

### Item Details

Each report has a dedicated details view containing the important information needed to identify and recover the item.


### The Smart Matching Engine

This is the core feature of Mr.Sherlock.

Instead of using a simple search, the application calculates a **match score** between Lost and Found reports.

| Matching Factor | Maximum Points |
|---|---:|
| Same Category | 25 |
| Item Name | 25 |
| Same Location | 20 |
| Description Similarity | 15 |
| Time Proximity | 15 |
| **Maximum Score** | **100** |

A possible match is displayed when the score reaches **50% or higher**.

#### Example

Suppose a student reports:

**Lost:** Black wallet  
**Location:** Library  
**Time:** 2:10 PM

Another student reports:

**Found:** Black leather wallet  
**Location:** Library  
**Time:** 2:25 PM

Mr.Sherlock can identify the reports as a potential match based on their:

**Category + Name + Location + Description + Time**

The important part is that the system doesn't simply produce a number.

It also provides **reasons behind the score**, making the result understandable to the user.


## How It Works

```text
              USER REPORT
                   │
                   ▼
        ┌─────────────────────┐
        │  Report Lost/Found  │
        └──────────┬──────────┘
                   │
                   ▼
          React Application
                   │
                   ▼
        ┌─────────────────────┐
        │ Smart Matching      │
        │                     │
        │ • Category          │
        │ • Name              │
        │ • Location          │
        │ • Description       │
        │ • Time              │
        └──────────┬──────────┘
                   │
                   ▼
             Match Score
                /100
                   │
                   ▼
        ┌─────────────────────┐
        │ Possible Match      │
        │ + Match Reasons     │
        └─────────────────────┘