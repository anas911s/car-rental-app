import { Text, View, StyleSheet, Image, Dimensions, Platform, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const window = Dimensions.get('window');
const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

function ProfileScreen() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const storedUsername = await AsyncStorage.getItem('username');
                if (token) {
                    setIsLoggedIn(true);
                    if (storedUsername) {
                        setUsername(storedUsername);
                    }
                }
            } catch (e) {
                console.error('Failed to fetch token:', e);
            }
        };

        checkLoginStatus();
    }, []);

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
            console.log('Login successful:', token);
            setIsLoggedIn(true);
            setError(null);
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
            setIsLoggedIn(false);
        } catch (e) {
            console.error('Failed to logout:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
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
                        <View style={styles.loginContainer}>
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
                        <View style={styles.loginContainer}>
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
                    <View style={styles.profileContainer}>
                        <Text style={styles.greeting}>Hallo,{'\n'}{username}</Text>
                        <View style={styles.contentContainer}>
                            <Text style={styles.title}>Profiel</Text>
                            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                                <Text style={styles.buttonText}>Uitloggen</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            )}
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
        justifyContent: 'flex-start',
        top: -10,
        left: 0,
        right: 0,
        bottom: '10%',
        width: isMobile ? '127%' : '100%',
        height: isMobile ? 345 : 450,
    },
    loginContainer: {
        position: 'absolute',
        minHeight: 250,
        flex: 1,
        justifyContent: 'space-evenly',
        top: 200,
        left: 2,
        marginBottom: 600,
        right: 2,
        backgroundColor: '#fff',
        padding: isMobile ? 20 : 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: -2 },
        elevation: 3,
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    greeting: {
        position: 'absolute',
        top: 160,
        left: 20,
        color: '#FFF',
        fontSize: isMobile ? 40 : 60,
        fontWeight: 'bold',
        zIndex: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    contentContainer: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'space-evenly',
        top: 300,
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
});

export default ProfileScreen;
