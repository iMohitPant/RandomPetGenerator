import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, ActivityIndicator, RefreshControl } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState();

  const loadPet = async () => {
    setLoading(true);
    const res = await fetch('http://pet-library.moonhighway.com/api/randomPet');
    const data = await res.json();
    await Image.prefetch(data.photo.full);
    setPet(data);
    setLoading(false);
  };
  useEffect(() => {
    loadPet();
  }, []);

  if(!pet) return <ActivityIndicator size="large" /> ;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      refreshControl={<RefreshControl refreshing={loading} onRefresh={loadPet} /> }
      >
        <Image style={styles.pic} source={{ uri: pet.photo.full }} />
        <Text style={styles.paragraph}>{pet.name} - {pet.category}</Text>
        <Text style={styles.foottext} >Made with 💖 by Mohit Pant</Text>
      </ScrollView>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center',
    color:"green"
  },
  foottext: {
    justifyContent:"flex-end",
    textAlign:"center",
    paddingTop: Constants.statusBarHeight + 10
  },
  pic: {
    height:500,
    width: 500
  }
});
