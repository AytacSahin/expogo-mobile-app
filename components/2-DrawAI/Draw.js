import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Image, Button } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { getImageUrl } from './2-DrawAI-Helpers/openai';
import TextInputExample from './2-DrawAI-Helpers/input';

const Draw = () => {

    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [promptText, setPromptText] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = await getImageUrl(promptText);
                if (url) {
                    setImageUrl(url);
                } else {
                    setError(true);
                }
            } catch (error) {
                console.error('Bir hata oluştu:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [promptText]);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size='large' color='white' />
            ) : error ? (
                <Text style={styles.errorMessage}>Resim yüklenirken bir hata oluştu.</Text>
            ) : imageUrl ? (
                <>
                    <Text style={styles.header}>Hayalindeki Resim</Text>
                    <Image style={styles.image} source={{ uri: imageUrl }} />
                    <View style={styles.buttonContainer}>
                        <Text>İndir</Text>
                    </View>
                </>
            ) : (
                <Text style={styles.loadingMessage}>Resim Yükleniyor...</Text>
            )}
            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
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
    buttonContainer: {
        backgroundColor: 'lightblue',
        padding: 10,
        marginTop: 10,
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