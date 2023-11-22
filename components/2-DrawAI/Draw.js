import React, { useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Keyboard, ImageBackground } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-root-toast';

import { getImageUrl } from './2-DrawAI-Helpers/openai';
import Input from './2-DrawAI-Helpers/input';
import Download from './2-DrawAI-Helpers/download';

const Draw = () => {

    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [promptText, setPromptText] = useState('');
    const [imageDownload, setImageDownload] = useState(false);

    const fetchData = async () => {
        if (promptText == '' || promptText.trim() == '' || promptText.length == 0) {
            let toast = Toast.show('You forgot to write your dream ?', {
                duration: Toast.durations.LONG,
            });
            return;
        }
        if (promptText.length >= 1 && promptText.length <= 5) {
            let toast = Toast.show('Please enter more than 6 characters.', {
                duration: Toast.durations.LONG,
            });
            return;
        }
        if (promptText.length > 30) {
            let toast = Toast.show('Please do not enter more than 30 characters.', {
                duration: Toast.durations.LONG,
            });
            return;
        }
        if (promptText !== '' || promptText.trim() !== '' || promptText.length > 5) {
            try {
                setLoading(true);
                const url = await getImageUrl(promptText);
                if (url) {
                    setImageUrl(url);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error('Error:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <ImageBackground source={require('../../assets/bg-image-createdwith-chatgpt.png')} style={styles.backgroundImage}>
            <View style={styles.container} >

                {error ? (<Text style={styles.errorMessage}>Error! Please Try Again Later...</Text>) : (
                    <>
                        {(!imageUrl && !loading && !error) && (
                            <View style={styles.inputContainer}>
                                <Input onChangeText={setPromptText} />
                                <TouchableOpacity style={styles.buttonSend} onPress={() => { fetchData(); Keyboard.dismiss(); }}>
                                    <Text style={styles.buttonSendText}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {(loading && !error && !imageUrl) && (
                            <ActivityIndicator size='large' color='black' />
                        )}

                        {(imageUrl && !loading && !error && imageDownload) && (
                            <Text style={styles.loadingMessage}>Image Loading...</Text>
                        )}

                        {(imageUrl && !imageDownload) && (
                            <>
                                <Text style={styles.header}>Your Dream Image</Text>
                                <Text style={styles.headerDescp}>(Please wait until the image is completely loaded.)</Text>
                                <Image style={styles.image} source={{ uri: imageUrl }} onLoad={() => setImageDownload(false)} />
                                <Text >Your dream was, {promptText}</Text>
                                <Download imageUrl={imageUrl} />
                            </>
                        )}
                        <StatusBar style="auto" />
                    </>
                )
                }

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'f0f0f0',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    headerDescp: {
        color: 'black',
        fontStyle: 'italic',
        marginBottom: 50,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 20,
        borderWidth: 8,
        borderColor: 'black',
        borderRadius: 20,
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonSend: {
        backgroundColor: 'black',
        width: 120,
        height: 120,
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 70,
        borderRadius: 60,
    },
    buttonSendText: {
        color: '#f0f0f0',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonDownload: {
        backgroundColor: 'black',
        width: 120,
        height: 120,
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 70,
        borderRadius: 60,
    },
    buttonDownloadText: {
        color: '#f0f0f0',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loadingMessage: {
        fontSize: 16,
        fontStyle: 'italic',
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        fontStyle: 'italic',
    },
});

export default Draw;