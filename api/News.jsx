// api/news.js
import axios from 'axios';
import { format, startOfToday, startOfWeek, startOfMonth } from 'date-fns';

const API_KEY = '763f3ba018184f49a77f4635a9b9907c';
const API_URL = 'https://newsapi.org/v2/everything';

export const fetchNews = async (query = 'tech', filter = 'anytime') => {
  let fromDate = '';
  switch (filter) {
    case 'today':
      fromDate = format(startOfToday(), 'yyyy-MM-dd');
      break;
    case 'week':
      fromDate = format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd');
      break;
    case 'month':
      fromDate = format(startOfMonth(new Date()), 'yyyy-MM-dd');
      break;
    case 'anytime':
    default:
      
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

    const response = await axios.get(API_URL, { params });
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};

