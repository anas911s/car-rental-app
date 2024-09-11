// LoginScreen.js
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';

function LoginScreen({ onLogin }) {
    const [username, setUsername] = React.useState('');

    const handleLogin = () => {
        if (username) {
            onLogin(username);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        width: '80%',
    },
    button: {
        backgroundColor: '#FF5F00',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
