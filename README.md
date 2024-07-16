### Frontend README

# Web Scraper Frontend

This frontend application allows users to input a URL and scrape data from it.
It displays the first 30 entries with the number, title, points, and comments, and provides filtering options.

## Features

- Allows users to input a URL of news ycombinato to scrape
- Displays scraped data (number, title, points, comments)
- Filters entries by title length and sorts by number of comments or points

## How to use site

- Go to https://web-scraper-vite.onrender.com/

The url will be filled in, you just have to click the scrape btn.
![screenshot-web-scraper-vite onrender com-2024 07 15-11_02_28](https://github.com/user-attachments/assets/278a6bff-574c-4e69-beb0-f52c18743fbd)

Once the data has loaded, you can filter the options.
![screenshot-web-scraper-vite onrender com-2024 07 15-11_06_42](https://github.com/user-attachments/assets/2412df88-8d35-4fd2-8e4c-be2fdb29795a)

## Technologies Used
- Vite
- Axios
- Cypress

### Prerequisites

- Node.js and npm installed

### Installation

  **Clone the repository**:

   git clone https://github.com/yourusername/web-scraper.git
   cd web-scraper

  **Run**:
   - npm i
   - npm i axios
   - npm i cypress
   - npm run dev

  **Run cypress test**
  - npx cypress open
    - Navagate to E2E Testing
    - Click browser option and click the Start E2E testing btn
     - Select the test "url_scraper_component.cy.js"
