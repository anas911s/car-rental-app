import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Dimensions, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get('window');
const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

function HomeScreen() {
  const [location, setLocation] = React.useState('');
  const [brand, setBrand] = React.useState('');
  const [transmission, setTransmission] = React.useState('');
  const navigation = useNavigation();

  const fetchCars = async () => {
    try {
      const response = await fetch('http://192.168.1.208:3000/cars');
      const cars = await response.json();
      console.log(cars)
      console.log('Filters:', { brand, transmission, location });

      const filteredCars = cars.filter((car) => {
        console.log('Auto details:', car);
        return (
          (brand ? car.brand === brand : true) &&
          (transmission ? car.transmission === transmission : true) &&
          (location ? car.location === location : true)
        );
      });

      if (filteredCars.length === 0) {
        alert('Geen resultaten');
      } else {
        console.log(cars);
        navigation.navigate('Info', { filteredCars });
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      Alert.alert('Error', 'error');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/x5m.png')} 
        style={styles.backgroundImage} 
        resizeMode="cover"
      />
      <View style={styles.filterContainer}>
        <Text style={styles.title}>Zoek naar een Auto</Text>
        <Text>Brand</Text>
        <TextInput
          style={styles.input}
          placeholder="Merk (bv. BMW)"
          value={brand}
          onChangeText={setBrand}
        />
        <Text>Transmission</Text>
        <Picker
          selectedValue={transmission}
          style={styles.input}
          onValueChange={(itemValue) => setTransmission(itemValue)}
        >
          <Picker.Item label="Manual" value="schakel" />
          <Picker.Item label="Automatic" value="automatisch" />
        </Picker>

        <Picker
          selectedValue={location}
          style={styles.input}
          onValueChange={(itemValue) => setLocation(itemValue)}
        >
          <Picker.Item label="Rotterdam" value="Rotterdam" />
          <Picker.Item label="Amsterdam" value="Amsterdam" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={fetchCars}>
          <Text style={styles.buttonText}>Zoeken</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'flex-end', 
  },
  backgroundImage: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'space-evenly',
    top: 0,
    left: 0,
    right: 0,
    width: isMobile? '127%': '100%',
    height: isMobile? 345 : 450,
  },

  filterContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'space-evenly',
    top: 280,
    left: 2,
    marginBottom: 600,
    right: 2,
    minHeight: 250,
    backgroundColor: '#fff',
    padding: isMobile ? 20 : 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -2 },
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#FF5F00',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
