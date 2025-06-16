// api/news.js
import axios from 'axios';
// No need for 'format' from date-fns anymore if we use toISOString()
import { startOfToday, startOfWeek, startOfMonth } from 'date-fns';

const API_KEY = '763f3ba018184f49a77f4635a9b9907c';
const API_URL = 'https://newsapi.org/v2/everything';

export const fetchNews = async (query = 'tech', filter = 'anytime') => {
  const now = new Date();
  let fromDate = '';
  // We will also set a 'to' date to be precise
  let toDate = now.toISOString();

  switch (filter) {
    case 'today':
      // Get the start of today and convert to an ISO string
      fromDate = startOfToday().toISOString();
      break;
    case 'week':
      // Get the start of the week and convert to an ISO string
      fromDate = startOfWeek(now, { weekStartsOn: 1 }).toISOString();
      break;
    case 'month':
      // Get the start of the month and convert to an ISO string
      fromDate = startOfMonth(now).toISOString();
      break;
    case 'anytime':
    default:
      // For 'anytime', we don't set from or to dates
      fromDate = '';
      toDate = '';
      break;
  }

  try {
    const params = {
      q: query,
      apiKey: API_KEY,
      language: 'en',
      sortBy: 'publishedAt',
    };

    // Add date parameters to the request if they exist
    if (fromDate) {
      params.from = fromDate;
    }
    if (toDate) {
      params.to = toDate;
    }

    const response = await axios.get(API_URL, { params });
    return response.data.articles;
  } catch (error) {
    // Improved error logging to see the actual message from the API
    console.error("Error fetching news:", error.response?.data || error.message);
    throw error;
  }
};