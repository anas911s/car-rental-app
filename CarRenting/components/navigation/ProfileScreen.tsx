import { Text, View, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import * as React from 'react';

const window = Dimensions.get('window');
const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Image 
                source={require('@/assets/images/maserati.png')} 
                style={styles.backgroundImage} 
                resizeMode="cover"
            />
            <Text style={styles.greeting}>Hallo,{'\n'}username</Text>

            <View style={styles.contentContainer}>
                <Text style={styles.title}>Profile</Text>
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
        justifyContent: 'flex-start',
        top: -10,
        left: 0,
        right: 0,
        bottom: '10%',
        width: isMobile ? '127%' : '100%',
        height: isMobile ? 345 : 450,
    },
    greeting: {
        position: 'absolute',
        top: 160,
        left: 20,
        color: '#FFF',
        fontSize: isMobile? 40:60,
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
});

export default ProfileScreen;
