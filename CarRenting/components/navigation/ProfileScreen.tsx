import { Text, View, StyleSheet, Image, Dimensions, Platform, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';

const window = Dimensions.get('window');
const isMobile = Platform.OS === 'ios' || 'android';

function ProfileScreen() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [inputUsername, setInputUsername] = React.useState('');

    const handleLogin = () => {
        if (inputUsername) {
            setUsername(inputUsername);
            setIsLoggedIn(true);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setInputUsername('');
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
                    <Text style={styles.title}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        value={inputUsername}
                        onChangeText={setInputUsername}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.profileContainer}>
                    <Text style={styles.greeting}>Hallo,{'\n'}{username}</Text>
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Profile</Text>
                        <TouchableOpacity style={styles.button} onPress={handleLogout}>
                            <Text style={styles.buttonText}>Logout</Text>
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
        top: '40%',
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
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
        justifyContent: 'flex-end',
        bottom: 100,
        left: 20,
        right: 20,
        backgroundColor: '#fff',
        padding: isMobile ? 75 : 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: -2 },
        elevation: 3,
        height: isMobile ? 320 : 550,
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
        marginBottom: 20,
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
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
