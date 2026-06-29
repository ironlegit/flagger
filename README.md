# Flagger

A simple web app to identify flags based on their descriptions. Fetches country data from the [REST Countries API](https://restcountries.com/) and allows users to search by flag description or country name.

---

## Features

- **Search by Description**: Filter flags using keywords from their descriptions.
- **Alphabetical Sorting**: Flags are sorted and grouped by the first letter of the country name.
- **Toggle Names**: Show or hide country names below the flags.
- **Toggle Mode**: Switch between "Overview Mode" (compact view) and "Detail Mode" (expanded view).

---

## Local Development

### Prerequisites

- Docker and Docker Compose installed.
- A [REST Countries API key](https://restcountries.com/).

### Setup

1. **API Key**: Add REST Countries API key in `.env`
2. **Run the App**: Start the development server with `docker-compose up`
3. **Access the App**: Open your browser and open [localhost:8080](http://localhost:8080)

