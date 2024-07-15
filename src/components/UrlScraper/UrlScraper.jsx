import React, { useState } from 'react';
import axios from 'axios';
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Animations/loading_animation.json";
import { FaFilter } from "react-icons/fa";

export function UrlScraper() {
  const [url, setUrl] = useState('https://news.ycombinator.com/');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filterDisplay, setFilterDisplay] = useState(false);
  const [resultsDisplay, setResultsDisplay] = useState(false);

  // --------------------------------------------------------------------- Scrape handler
  const handleScrape = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3001/scrape', { params: { url } });
      console.log("response:", response);
      setData(response.data);
      setFilteredData(response.data);
      setResultsDisplay(true)
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------------------- Filter functuions
  const filterByComments = () => {
    const filtered = data
      .filter(entry => entry.title.split(' ').length > 5)
      .sort((a, b) => b.comments - a.comments);
    setFilteredData(filtered);
    setFilterDisplay(false)
  };

  const filterByPoints = () => {
    const filtered = data
      .filter(entry => entry.title.split(' ').length <= 5)
      .sort((a, b) => b.points - a.points);
    setFilteredData(filtered);
    setFilterDisplay(false)
  };

  const clearFilter = () => {
    setFilteredData(data)
    setFilterDisplay(false)
  };

  return (
      <main className='main_container'>

        <h1>Ycombinator Scraper</h1>

        <div className='searchbox_container'>
            <input
                className='searchbox_input'
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL to scrape"
                data-testid="searchbox-input-field"
            />

            <button className='searchbox_btn' onClick={handleScrape} data-testid="searchbox-btn">Scrape Data</button>
        </div>
      
      {loading && <Lottie animationData={loadingAnimation} style={{ height: "10rem" }}/>}
      {error && <p>Error: {error}</p>}

      <div className={resultsDisplay ?'results_container' : "displayNone"}>
        <div className='results__filter_container'>
            <button className='results__filter_btn' onClick={() => setFilterDisplay(prevCheck => !prevCheck)} data-testid="filter-btn"><span>{<FaFilter />}</span> Filter</button>
                <div className={filterDisplay ? 'results_filter_options' : "displayNone"}>
                    <button onClick={filterByComments} data-testid="more-than-5">More than 5 words</button>
                    <button onClick={filterByPoints} data-testid="less-than-5">5 words or less</button>
                    <button onClick={clearFilter} data-testid="clear-filter">Clear filter</button>
                </div>
        </div>

        <ul>
            {filteredData.map((item, index) => (
             
            <li key={index} data-testid={`scraped-data-li ${item.number}`}>
            {console.log("item:", item)}
                <p className='item_number'>{item.number}.</p>
                <p className='item_title'>{item.title}</p>
                <div className='container_points_comments'>
                    <p className='item_points' data-testid="points">Points: {item.points}</p>
                    <p className='item_comments' data-testid="comments">Comments: {item.comments}</p>
                </div>
            </li>
            ))}
        </ul>
      </div>

    </main>
  );
}
