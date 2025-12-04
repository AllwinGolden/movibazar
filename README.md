# Namlatic Movie Collection - React Project

This is a simple React app that fetches a **TMDB collection** and displays the movies (parts) in a grid.

## How to run

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the project root containing your TMDB API key:
```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
```

3. Start the dev server:
```bash
npm start
```

4. Open http://localhost:3000

## Usage

- Default Collection ID is `10` (Star Wars Collection). Change it in the input and press **Load**.
- The app shows poster, title, release date, and a short overview.

## Notes for submission to the company

- Ensure you include the `.env` with the API key when testing locally (do NOT send your API key in public repos).
- Zip the project folder (without node_modules) and send the zip to HR.

