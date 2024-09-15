import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, Platform, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const images = {
  'gti.png': require('@/assets/images/gti.png'),
  'maseratigh.png': require('@/assets/images/maseratigh.png'),
};

function InfoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { car } = route.params || {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setIsLoggedIn(!!token);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  if (!car) {
    return (
      <View style={styles.container}>
        <Text>Geen gegevens gevonden</Text>
      </View>
    );
  }

  const carImage = images[car.image];

  const handleRentCar = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Login Required', 'You must be logged in to rent a car.');
        return;
      }
  
      const response = await axios.post(
        'http://192.168.1.208:3000/api/rental/rentals',
        { carId: car.id },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        Alert.alert('Success', 'Car rented successfully.');
      } else {
        Alert.alert('Error', 'Failed to rent the car.');
      }
    } catch (error) {
      console.error('Error renting car:', error);
      Alert.alert('Error', 'An error occurred while renting the car.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={carImage} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {car.brand ? `${car.brand} ${car.year || ''}` : 'Onbekend merk'}
        </Text>
        <Text>Prijs per dag: {car.price ? `€${car.price}` : 'Niet beschikbaar'}</Text>
        <Text>Vermogen: {car.horsepower ? `${car.horsepower} pk` : 'Niet beschikbaar'}</Text>
        <Text>Aantal deuren: {car.doors || 'Niet gespecificeerd'}</Text>
        <Text>Transmissie: {car.transmission ? car.transmission : 'Onbekend'}</Text>
        <Text>Status: {car.status ? 'Beschikbaar' : 'Niet beschikbaar'}</Text>
        <Text>Aantal beschikbaar: {car.variety ? car.variety : 'Niet beschikbaar'}</Text>

        {isLoggedIn ? (
          <TouchableOpacity 
            style={[styles.button, styles.rentButton]} 
            onPress={handleRentCar}
          >
            <Text style={styles.buttonText}>Rent this vehicle</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.button, styles.loginButton]} 
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Log In to Rent</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Terug naar zoeken</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const { height } = Dimensions.get('window');
const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: height * 0.4,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf: 'center',
    marginTop: 20,
  },
  rentButton: {
    backgroundColor: '#4CAF50',
  },
  loginButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#FF5F00',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default InfoScreen;