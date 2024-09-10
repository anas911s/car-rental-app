import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as React from 'react';

function HomeScreen() {
  const [pickupDate, setPickupDate] = React.useState('');
  const [returnDate, setReturnDate] = React.useState('');
  const [category, setCategory] = React.useState('standard');
  const [location, setLocation] = React.useState('Rotterdam');

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/x5m.png')} 
        style={styles.backgroundImage} 
        resizeMode="cover"
      />
      <View style={styles.filterContainer}>
        <Text style={styles.title}>Zoek naar een Auto</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Ophaaldatum (bv. 2024-09-10)"
          value={pickupDate}
          onChangeText={setPickupDate}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Retourdatum (bv. 2024-09-15)"
          value={returnDate}
          onChangeText={setReturnDate}
        />
        
        <Picker
          selectedValue={category}
          style={styles.input}
          onValueChange={(itemValue) => setCategory(itemValue)}
        >
          <Picker.Item label="Standard" value="standard" />
          <Picker.Item label="Gold" value="gold" />
          <Picker.Item label="Premium" value="premium" />
        </Picker>
        
        <Picker
          selectedValue={location}
          style={styles.input}
          onValueChange={(itemValue) => setLocation(itemValue)}
        >
          <Picker.Item label="Rotterdam" value="Rotterdam" />
          <Picker.Item label="Amsterdam" value="Amsterdam" />
        </Picker>

        <TouchableOpacity style={styles.button}>
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
    top: 0,
    left: 0,
    right: 0,
    bottom: '50%',
    width: '100%',
    height: '50%',
  },
  filterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: -2 },
    elevation: 3,
    height: 400,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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
