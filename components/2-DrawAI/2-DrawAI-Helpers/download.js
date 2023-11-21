import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import * as FileSystem from 'expo-file-system'

const Download = ({ imageUrl }) => {

    const downloadImage = async () => {
        const localUri = `${FileSystem.documentDirectory}dream_image.jpg`;
        try {
            const { uri } = await FileSystem.downloadAsync(imageUrl, localUri);
            console.log('File downloaded to:', uri);
            openImageInGallery(uri);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const openImageInGallery = async (uri) => {
        try {
            if (uri) {
                await MediaLibrary.saveToLibraryAsync(uri);
                await Linking.openURL('content://media/internal/images/media');
            } else {
                console.warn('Invalid URI:', uri);
            }
        } catch (error) {
            console.error('Error opening image in gallery:', error);
        }
    };

    return (
        <TouchableOpacity onPress={downloadImage} style={styles.buttonDownload}>
            <Text style={styles.buttonDownloadText}>Download</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
});

export default Download;