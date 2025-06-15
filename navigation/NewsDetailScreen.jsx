import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, Button } from 'react-native';

const NewsDetailScreen = ({ route }) => {
  const { article } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: article.urlToImage }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.author}>
          By {article.author || 'Unknown'} - {new Date(article.publishedAt).toLocaleDateString()}
        </Text>
        <Text style={styles.source}>Fuente: {article.source.name}</Text>
        <Text style={styles.content}>{article.content || 'Content not available.'}</Text>
        <Button 
          title="Reed full news" 
          onPress={() => Linking.openURL(article.url)}
          color="#4682B4"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  contentContainer: { padding: 15 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  source: {
    fontSize: 14,
    color: 'gray',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});

export default NewsDetailScreen;