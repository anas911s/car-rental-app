import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

const cars = [
  {
    id: '1',
    name: 'Volkswagen Golf 8 GTI',
    pricePerDay: '€150',
    power: '245 pk',
    doors: '5 deuren',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'Mercedes-Benz A-Class',
    pricePerDay: '€100',
    power: '190 pk',
    doors: '4 deuren',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '3',
    name: 'BMW 3 Series',
    pricePerDay: '€190',
    power: '280 pk',
    doors: '4 deuren',
    image: 'https://via.placeholder.com/100',
  },
  {
    id: '4',
    name: 'Mercedes-Benz GT63S',
    pricePerDay: '€500',
    power: '639 pk',
    doors: '4 deuren',
    image: 'https://via.placeholder.com/100',
  },
];

function CarsScreen() {
  const navigation = useNavigation();

  const renderCar = ({ item }) => (
    <TouchableOpacity 
      style={styles.carContainer}
      onPress={() => navigation.navigate('Info', { carId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.carImage} />
      <View style={styles.carDetails}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text>Prijs per dag: {item.pricePerDay}</Text>
        <Text>Vermogen: {item.power}</Text>
        <Text>Aantal deuren: {item.doors}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        renderItem={renderCar}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  carContainer: {
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
