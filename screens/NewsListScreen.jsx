import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native';
import { fetchNews } from '../api/News';
import { format, parseISO } from 'date-fns';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons'; 


const FILTERS = [
  {key:'today', label:'Today'},
  {key:'week', label:'This Week'},
  {key:'month', label:'This month'},
  {key:'anytime', label:'Anytime'}
];

const NewsListScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Programming');
  const [tempQuery, setTempQuery] = useState('Programming');
  const [activeFilter, setActiveFilter] = useState('anytime');
  const [previousState, setPreviousState] = useState(null);

  
  useEffect(() => {
    const getNews = async () => {

      console.log(`Fetching news for query: '${tempQuery}' and filter: '${activeFilter}'`);
      try {
        setLoading(true);
        setError(null);

        const newsArticles = await fetchNews(tempQuery, activeFilter);

        console.log(`API returned ${newsArticles.length} articles.`);
        setArticles(newsArticles);
      } catch (err) {
        console.error("Error fetching news in component:", err);
        setError(err.message || "Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
        getNews();
    }
    
  }, [tempQuery, activeFilter]);


  // useEffect(() => {
  //   const getNews = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const newsArticles = await fetchNews(tempQuery, activeFilter);
  //       setArticles(newsArticles);
  //     } catch (e) {
  //       setError('Unable to load news.');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getNews();
  // },  [tempQuery, activeFilter]);

  const handleGoBack = useCallback(() => {
    if (previousState) {
      setTempQuery(previousState.query);
      setSearchQuery(previousState.query);
      setActiveFilter(previousState.filter);
      setPreviousState(null);
    }
  }, [previousState]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        previousState ? (
          <TouchableOpacity onPress={handleGoBack} style={{ marginLeft: 15 }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        ) : null
      ),
    });
  }, [navigation, previousState, handleGoBack]);


  const handleSearch = () => {
    if (searchQuery.trim() === tempQuery.trim()) return;
    setPreviousState({ query: tempQuery, filter: activeFilter });
    setTempQuery(searchQuery);
  };

  const handleFilterPress = (filterKey) => {
    if (filterKey === activeFilter) return;
    setPreviousState({ query: tempQuery, filter: activeFilter });
    setActiveFilter(filterKey);
  };

  const handleArticlePress = async (url) => {
    await WebBrowser.openBrowserAsync(url);
  };


  return (
    <View style={styles.container}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="search for news..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[styles.filterButton, activeFilter === filter.key && styles.activeFilterButton]}
            onPress={() => handleFilterPress(filter.key)}
          >
            <Text style={[styles.filterButtonText, activeFilter === filter.key && styles.activeFilterButtonText,]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : (

        <FlatList
          data={articles}
          keyExtractor={(item, index) => item.url + index}
          renderItem={({ item }) => {
            const formattedDate = item.publishedAt 
              ? format(parseISO(item.publishedAt), 'dd/MM/yyyy') 
              : '';

            return(
              <TouchableOpacity onPress={() => handleArticlePress(item.url)}>
              <View style={styles.articleContainer}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <View style={styles.detailsContainer}>
                  <Text style={styles.sourceText}>{item.source.name}</Text>
                  <Text style={styles.dateText}>{formattedDate}</Text>
                </View>
              </View>
            </TouchableOpacity>
            )}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10,
    marginTop: 10 
  },
  searchContainer: { 
    flexDirection: 'row', 
    marginBottom: 10,
    marginLeft: 8,
    marginRight: 8 
  },
  searchInput: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 8, 
    marginRight: 8,
    borderRadius: 13 
  },
  searchButton: {
    backgroundColor: '#535b5d',
    paddingVertical: 12,       
    paddingHorizontal: 15,     
    borderRadius: 13,          
    alignItems: 'center',      
    justifyContent: 'center',  
  },
  searchButtonText: {
    color: '#ffffff',      
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    marginLeft: 5,
    marginRight: 5 
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 13,
    backgroundColor: '#e0e0e0',
  },
  activeFilterButton: {
    backgroundColor: '#a2d18b',
  },
  filterButtonText: {
    color: '#333',
  },
  activeFilterButtonText: {
    color: '#FFFFFF', 
  },
  articleContainer: { 
    borderColor: '#676f71',
    padding: 10, 
    borderWidth: 1, 
    borderRadius: 13,
    marginBottom: 10
  },
  articleTitle: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 4
  },
  sourceText: {
    fontSize: 12,
    color: '#555',
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#555', 
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center' },
});

export default NewsListScreen;