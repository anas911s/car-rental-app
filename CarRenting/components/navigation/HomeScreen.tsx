import { Text, View, StyleSheet, TextInput, TouchableOpacity  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as React from 'react';

function HomeScreen() {
  const [pickupDate, setPickupDate] = React.useState('');
  const [returnDate, setReturnDate] = React.useState('');
  const [category, setCategory] = React.useState('standard');
  const [location, setLocation] = React.useState('Rotterdam');

  return (
    <View style={styles.container}>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 70,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: 'FF5F00',
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
    backgroundColor: '#fff',
  },
  filterContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginBottom: 10,
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
});

export default HomeScreen;
