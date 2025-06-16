import axios from 'axios';
import { startOfToday, startOfWeek, startOfMonth } from 'date-fns';

const API_KEY = '763f3ba018184f49a77f4635a9b9907c';
const API_URL = 'https://newsapi.org/v2/everything';

export const fetchNews = async (query = 'tech', filter = 'anytime') => {
  const now = new Date();
  let fromDate = '';
  
  let toDate = now.toISOString();

  switch (filter) {
    case 'today':
      fromDate = startOfToday().toISOString();
      break;
    case 'week':
      fromDate = startOfWeek(now, { weekStartsOn: 1 }).toISOString();
      break;
    case 'month':
      fromDate = startOfMonth(now).toISOString();
      break;
    case 'anytime':
    default:
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

    if (fromDate) {
      params.from = fromDate;
    }
    if (toDate) {
      params.to = toDate;
    }

    const response = await axios.get(API_URL, { params });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error.response?.data || error.message);
    throw error;
  }
};