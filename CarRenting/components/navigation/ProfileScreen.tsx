import { Text, View, StyleSheet, Image, Dimensions, Platform, TouchableOpacity, TextInput } from 'react-native';
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';

const window = Dimensions.get('window');
const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

function ProfileScreen() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', {
                username,
                password
            });

            const { token } = response.data;
            console.log('Login successful:', token);
            setIsLoggedIn(true);
            setError(null);
        } catch (error) {
            console.error('Login failed:', error.response?.data?.error || error.message);
            setError(error.response?.data?.error || 'An error occurred during login');
        }
    };

    const handleRegister = () => {
        console.log('Navigating to register');
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('@/assets/images/maserati.png')} 
                style={styles.backgroundImage} 
                resizeMode="cover"
            />
            
            {!isLoggedIn ? (
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
            ) : (
                <View style={styles.profileContainer}>
                    <Text style={styles.greeting}>Hallo,{'\n'}{username}</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Profiel</Text>
                        <TouchableOpacity style={styles.button} onPress={() => setIsLoggedIn(false)}>
                            <Text style={styles.buttonText}>Uitloggen</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        top: 390,
        bottom: 300,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        padding: isMobile ? 75 : 20,
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
        bottom: 100,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        padding: isMobile ? 75 : 20,
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
});

export default ProfileScreen;
