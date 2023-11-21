import React, { useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Keyboard } from 'react-native'
import { StatusBar } from 'expo-status-bar';

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
                            <Image style={styles.image} source={{ uri: imageUrl }} onLoad={() => setImageDownload(false)} />
                            <Download imageUrl={imageUrl} />
                        </>
                    )}

                    <StatusBar style="auto" />
                </>
            )
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'f0f0f0',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        marginBottom: 10,
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