import { TouchableOpacity, StyleSheet, Text, View, ToastAndroid } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Mainbutton() {

    const navigation = useNavigation();
    const [showButton, setShowButton] = React.useState(false);

    React.useEffect(() => {
        // belirli bir süre sonra butonu gösterdim:
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 2000);

        // Timer temizleme
        return () => clearTimeout(timer);
    }, []);

    const handleButtonPress = () => {
        ToastAndroid.show('Welcome!', ToastAndroid.LONG);
        navigation.navigate('ai');
    };

    return (
        <View style={styles.container}>
            {showButton && (
                <TouchableOpacity onPress={handleButtonPress} style={styles.button}>
                    <Text style={styles.buttonText}>Draw a Dream</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end', // Sayfanın altına doğru yerleştir
        alignItems: 'center', // Yatayda ortala
    },
    button: {
        backgroundColor: 'black',
        width: 120,
        height: 120,
        justifyContent: 'center',
        padding: 15,
        marginBottom: 70,
        borderRadius: 60,
        borderWidth: 6,
        borderColor: '#f0f0f0'
    },
    buttonText: {
        color: '#f0f0f0',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});