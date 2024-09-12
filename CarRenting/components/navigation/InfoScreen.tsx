// InfoScreen.js
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const images = {
  'gti.png': require('@/assets/images/gti.png'),
};

function InfoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { car } = route.params;

  if (!car) {
    return (
      <View style={styles.container}>
        <Text>Geen gegevens gevonden</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={images[car.image]} style={styles.image} />
      <Text style={styles.title}>{car.brand} {car.year}</Text>
      <Text>Prijs per dag: {car.price}</Text>
      <Text>Vermogen: {car.horsepower} pk</Text>
      <Text>Aantal deuren: {car.doors}</Text>
      <Text>Transmissie: {car.transmission}</Text>
      <Text>Status: {car.status}</Text>
      <Text>Aantal beschikbaar: {car.variety}</Text>
      <TouchableOpacity 
      style={styles.button} 
      onPress={() => navigation.goBack()}>
      <Text style={styles.buttonText}>Terug naar zoeken</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '60%',
    height: '70%',
    top: '10%',
    padding: 5,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    position: 'relative',
    top: 40,
    width: 800,
    height: 500,
    borderRadius: 10,
    marginRight: 15,
  },
  title: {
    paddingBottom: 40,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    paddingBottom: 40,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    position: 'absolute',
    backgroundColor: '#FF5F00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InfoScreen;
