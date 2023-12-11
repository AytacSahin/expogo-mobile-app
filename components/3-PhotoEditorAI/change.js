import React, { useState } from 'react';
import { View, ImageBackground, Image, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Toast from 'react-native-root-toast';
import convertJpegToPng from './3-PE-Helpers/convertImage';
import pickImage from './3-PE-Helpers/imagePicker';
import sendImageData from './3-PE-Helpers/openai-variation';

const Change = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [convertedImageUri, setConvertedImageUri] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const pickImageButton = async () => {
        const imgUri = await pickImage();
        setSelectedImage(imgUri);
        Toast.show('The image selection is successful.', { duration: Toast.durations.LONG });
    }

    const fetchData = async () => {
        if (selectedImage == null) {
            Toast.show('Forgot to choose your image ?', { duration: Toast.durations.LONG });
            return;
        } else {
            try {
                const convertedImageUri = await convertJpegToPng(selectedImage);
                if (convertedImageUri !== null) {
                    setLoading(true);
                    const responseUri = await sendImageData(convertedImageUri);
                    if (responseUri) {
                        setConvertedImageUri(responseUri);
                    };
                } else {
                    console.log("Image conversion failed.");
                    Toast.show('Inappropriate format. Please choose another image.', { duration: Toast.durations.LONG });
                }
            } catch (error) {
                console.error('Error:', error);
                Toast.show('Something went wrong.', { duration: Toast.durations.LONG });
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/bg-image-createdwith-chatgpt.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                {/* <TouchableOpacity style={styles.buttonSend} onPress={pickImageButton}>
                    <Text style={styles.buttonSelectImageText}>Pick an image from gallery</Text>
                </TouchableOpacity>

                {error ? (<Text style={styles.errorMessage}>Error! Please Try Again Later...</Text>) : (
                    <>
                        {(!selectedImage && !loading) && (
                            <Image style={styles.image} source={require('../../assets/container-image-createdwith-chatgpt.png')} />
                        )}
                        {(loading && !selectedImage && !convertedImageUri) && (
                            <ActivityIndicator size='large' color='black' />
                        )}
                        {(selectedImage && !convertedImageUri && !loading) && (
                            <Image style={styles.image} source={selectedImage.uri} />
                        )}
                        {(convertedImageUri && !loading) && (
                            <Image style={styles.image} source={convertedImageUri} />
                        )}
                    </>
                )}

                <TouchableOpacity style={styles.buttonSend} onPress={() => fetchData()}>
                    <Text style={styles.buttonSendText}>Send</Text>
                </TouchableOpacity> */}

            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    buttonSelectImageText: {
        color: '#f0f0f0',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'cover',
        marginBottom: 10,
        borderWidth: 8,
        borderColor: 'black',
        borderRadius: 20,
    },
    buttonSend: {
        backgroundColor: 'black',
        width: 120,
        height: 120,
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 60,
    },
    buttonSendText: {
        color: '#f0f0f0',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    errorMessage: {
        fontSize: 16,
        color: 'red',
        fontStyle: 'italic',
    },
});

export default Change;