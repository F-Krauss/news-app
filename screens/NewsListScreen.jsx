import React, { useState, useEffect, use } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import { fetchNews } from '../api/News';
import { format, parseISO } from 'date-fns'; 

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
  const [tempQuery, setTempQuery] = useState('React Native');
  const [dateFilter, setDateFilter] = useState('anytime');

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const newsArticles = await fetchNews(searchQuery);
        setArticles(newsArticles);
      } catch (e) {
        setError('Unable to load news.');
      } finally {
        setLoading(false);
      }
    };

    getNews();
  },  [tempQuery, dateFilter]);

  const handleSearch = () => {
    setTempQuery(searchQuery);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    return <Text style={styles.centered}>{error}</Text>;
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('NewsDetail', { article: item })}
    >
      <Text style={styles.title}>{item.date}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.source}>{item.source.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="search by topic (ex. sports, tech)"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} color="#4682B4" />
      </View>

      <View style={styles.filterContainer}>
        {FILTERS.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              dateFilter === filter.key && styles.dateFilterButton, // Apply active style
            ]}
            onPress={() => setDateFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterButtonText,
                dateFilter === filter.key && styles.dateFilterButtonText,
              ]}
            >
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
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => {
            const formattedDate = item.publishedAt 
              ? format(parseISO(item.publishedAt), 'dd/MM/yyyy') 
              : '';

            return(
            <TouchableOpacity onPress={() => navigation.navigate('NewsDetail', { article: item })}>
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
  container: { flex: 1, padding: 10 },
  searchContainer: { flexDirection: 'row', marginBottom: 10 },
  searchInput: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 8, marginRight: 8, borderRadius: 5 },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  dateFilterButton: {
    backgroundColor: '#007BFF',
  },
  filterButtonText: {
    color: '#333',
  },
  dateFilterButtonText: {
    color: '#FFFFFF', 
  },
  articleContainer: { 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee'
  },
  articleTitle: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  sourceText: {
    fontSize: 12,
    color: '#555',
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#888', 
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center' },
});

export default NewsListScreen;