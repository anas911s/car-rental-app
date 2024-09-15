import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.208:3000/cars';

const images = {
  'gti.png': require('@/assets/images/gti.png'),
  'maseratigh.png': require('@/assets/images/maseratigh.png'),
  'mercedesGT.png': require('@/assets/images/mercedesGT.png'),
  'porsche.png': require('@/assets/images/porsche.png'),
};

function CarsScreen() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCars(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const renderCar = (item, index) => (
    <TouchableOpacity 
      key={item.id}
      style={[styles.carContainer, hoveredIndex === index && styles.carContainerHovered]}
      onPress={() => navigation.navigate('Info', { car: item })}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <Image source={images[item.image]} style={styles.carImage} />
      <View style={styles.carDetails}>
        <Text style={styles.carName}>{item.brand} {item.year}</Text>
        <Text>Prijs per dag: {item.price}</Text>
        <Text>Vermogen: {item.horsepower} pk</Text>
        <Text>Aantal deuren: {item.doors}</Text>
        <Text>Transmissie: {item.transmission}</Text>
        <Text>Aantal beschikbaar: {item.variety}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {cars.map((car, index) => renderCar(car, index))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  carContainer: {
    minWidth: 250,
    minHeight: 50,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  carContainerHovered: {
    backgroundColor: '#f0f0f0',
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#ccc',
  },
  carDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CarsScreen;
