import { Text, View, StyleSheet, Image, Dimensions, Platform, TouchableOpacity, TextInput, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const window = Dimensions.get('window');
const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

const images = {
    'gti.png': require('@/assets/images/gti.png'),
    'maseratigh.png': require('@/assets/images/maseratigh.png'),
  };

function ProfileScreen() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rentals, setRentals] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userDetails, setUserDetails] = useState(null); 

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const storedUsername = await AsyncStorage.getItem('username');
                const storedUserId = await AsyncStorage.getItem('userId');

                if (token) {
                    setIsLoggedIn(true);
                    if (storedUsername && storedUserId) {
                        setUsername(storedUsername);
                        setUserId(storedUserId);
                        fetchUserRentals(storedUserId);
                    }
                }
            } catch (e) {
                console.error('Failed to fetch token:', e);
            }
        };

        checkLoginStatus();
    }, []);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.get(`http://192.168.1.208:3000/api/users/users/${userId}`);
            setUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setError('Failed to fetch user details');
        }
    };

    const fetchUserRentals = async (userId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://192.168.1.208:3000/api/rental/user/${userId}`);
            if (response.data && response.data.message) {
                setRentals([]);
            } else {
                setRentals(response.data);
            }
        } catch (error) {
            console.error('Error fetching rentals:', error);
            setError('Failed to fetch rentals');
        } finally {
            setLoading(false);
        }
    };

const handleLogin = async () => {
    setLoading(true);
        try {
            const response = await axios.post('http://192.168.1.208:3000/api/users/login', {
                username,
                password,
            });
            const { token, user } = response.data;
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('username', user.username);
            await AsyncStorage.setItem('userId', user.id.toString());
            console.log('Login successful:', token);
            setIsLoggedIn(true);
            setError(null);
            setUserId(user.id);
            fetchUserRentals(user.id);
            fetchUserDetails(user.id);
        } catch (error) {
            console.error('Login failed:', error.response?.data?.error || error.message);
            setError(error.response?.data?.error || 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    };


    const handleRegisterSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://192.168.1.208:3000/api/users/register', {
                username,
                password,
            });
            console.log('Registration successful:', response.data);
            setIsRegistering(false);
            setError(null);
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.error || error.message);
            setError(error.response?.data?.error || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        setIsRegistering(true);
        setError(null);
    };

    const handleBackToLogin = () => {
        setIsRegistering(false);
        setError(null);
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('username');
            await AsyncStorage.removeItem('userId');
            setIsLoggedIn(false);
        } catch (e) {
            console.error('Failed to logout:', e);
        } finally {
            setLoading(false);
        }
    };

    const renderRentalItem = ({ item }) => (
        <View style={styles.rentalCard}>
            <Image source={images[item.Car.image]}  style={styles.rentalImage} />
            <Text style={styles.rentalText}>{item.Car.brand} ({item.Car.year})</Text>
            <Text style={styles.rentalText}>Price: {item.Car.price} €</Text>
            <Text style={styles.rentalText}>Location: {item.Car.location}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
            <Image 
                source={require('@/assets/images/maserati.png')} 
                style={styles.backgroundImage} 
                resizeMode="cover"
            />
            {loading ? (
                <ActivityIndicator size="large" color="#FF5F00" style={styles.loadingIndicator} />
            ) : (
                !isLoggedIn ? (
                    isRegistering ? (
                        <View style={styles.authContainer}>
                            <Text style={styles.title}>Register</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter username"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                            {error && <Text style={styles.errorText}>{error}</Text>}
                            <TouchableOpacity style={styles.button} onPress={handleRegisterSubmit}>
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleBackToLogin} style={styles.registerLink}>
                                <Text style={styles.registerText}>Already have an account? Log in here</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.authContainer}>
                            <Text style={styles.title}>Log In</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter username"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter email"
                                value={email}
                                onChangeText={setEmail}
                                secureTextEntry
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                            {error && <Text style={styles.errorText}>{error}</Text>}
                            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                                <Text style={styles.buttonText}>Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleRegister} style={styles.registerLink}>
                                <Text style={styles.registerText}>Not registered yet? Click here</Text>
                            </TouchableOpacity>
                        </View>
                    )
                ) : (
                    <View style={styles.profileSection}>
                    <Text style={styles.greeting}>Hallo,{'\n'}{username}</Text>
                    <View style={styles.profileContainer}>
                        <Text style={styles.title}>Profile Informatie</Text>
                        {userDetails ? (
                            <>
                                <Text style={styles.profileText}>Naam: {userDetails.username}</Text>
                                <Text style={styles.profileText}>Email: {userDetails.email}</Text>
                            </>
                        ) : (
                            <Text style={styles.noRentalsText}>Kon info niet ophalen</Text>
                        )}
                    </View>

                        <View style={styles.rentalsContainer}>
                            <Text style={styles.title}>Jouw Huur auto</Text>
                            {rentals.length > 0 ? (
                                <FlatList
                                    data={rentals}
                                    renderItem={renderRentalItem}
                                    keyExtractor={(item) => item.id.toString()}
                                    contentContainerStyle={styles.rentalList}
                                />
                            ) : (
                                <Text style={styles.noRentalsText}>Nog geen gehuurde auto's</Text>
                            )}
                            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                                <Text style={styles.buttonText}>Uitloggen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 300,
        width: '100%',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        padding: 20,
    },
    authContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        marginVertical: 200,
    },
    profileSection: {
        marginVertical: 20,
    },
    profileContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    rentalsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
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
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 10,
    },
    registerText: {
        color: '#FF5F00',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    rentalCard: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    rentalImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    rentalText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    noRentalsText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#777',
    },
    profileText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    
});

export default ProfileScreen;
