import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

export default function Mainbutton() {

    const navigation = useNavigation();
    const [showButton, setShowButton] = React.useState(false);

    useEffect(() => {
        // belirli bir süre sonra butonu gösterdim:
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 2000);

        // Timer temizleme
        return () => clearTimeout(timer);
    }, []);

    const handleDrawPress = () => {
        Toast.show('Welcome!', {
            duration: Toast.durations.LONG,
        });
        navigation.navigate('drawAI');
    };
    const handleChangePress = () => {
        Toast.show('Welcome!', {
            duration: Toast.durations.LONG,
        });
        navigation.navigate('speakAI');
    };

    return (
        <View style={styles.container}>
            {showButton && (
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleDrawPress} style={styles.button}>
                        <Text style={styles.buttonText}>Draw a Dream</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleChangePress} style={styles.button}>
                        <Text style={styles.buttonText}>Change to Dream</Text>
                    </TouchableOpacity>
                </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    button: {
        backgroundColor: 'black',
        width: 120,
        height: 120,
        justifyContent: 'center',
        padding: 15,
        margin: 40,
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