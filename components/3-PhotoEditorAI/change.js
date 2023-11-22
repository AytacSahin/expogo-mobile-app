import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Svg, Circle } from 'react-native-svg';

const Change = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [transparentAreas, setTransparentAreas] = useState([]);
    const [drawing, setDrawing] = useState(false);
    const lastLocation = useRef(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedUri = result.assets[0].uri;
            setSelectedImage(selectedUri);
            setTransparentAreas([]);
        } else {
            console.log("Image picking cancelled");
        }
    };

    const applyTransparentAreas = () => {
        return (
            <View style={[StyleSheet.absoluteFill, styles.transparentAreaView]}>
                {transparentAreas.map((area, index) => (
                    <View
                        key={index}
                        style={{
                            position: 'absolute',
                            left: area.start.x,
                            top: area.start.y,
                            width: area.end.x - area.start.x,
                            height: area.end.y - area.start.y,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            borderWidth: 1,
                            borderColor: 'white',
                        }}
                    />
                ))}
            </View>
        );
    };


    const handleTouchStart = (event) => {
        console.log('tıkladın');
        setDrawing(true);
        const { locationX, locationY } = event.nativeEvent;
        setTransparentAreas((prevAreas) => [...prevAreas, { start: { x: locationX, y: locationY }, end: { x: locationX, y: locationY } }]);
        lastLocation.current = { x: locationX, y: locationY };
    };


    const handleTouchMove = (event) => {
        console.log('hareket ettin');
        if (!drawing) return;
        const { locationX, locationY } = event.nativeEvent;
        setTransparentAreas((prevAreas) => {
            const updatedAreas = [...prevAreas];
            const lastIndex = updatedAreas.length - 1;
            updatedAreas[lastIndex].end = { x: locationX, y: locationY };
            return updatedAreas;
        });
        lastLocation.current = { x: locationX, y: locationY };
    };


    const handleTouchEnd = () => {
        console.log('tıklama bitti');
        setDrawing(false);
    };

    const fetchData = async () => {
        // TODO: Gelen uri'yi api'ya gönder.
        console.log('send butonuna tıklandı.');
    };

    return (
        <ImageBackground
            source={require('../../assets/bg-image-createdwith-chatgpt.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonSend} onPress={pickImage}>
                    <Text style={styles.buttonSelectImageText}>Pick an image from gallery</Text>
                </TouchableOpacity>

                {selectedImage && (
                    <View>
                        {applyTransparentAreas(selectedImage)}
                        <Image
                            style={styles.image}
                            source={{ uri: selectedImage }}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        />
                    </View>
                )}

                <TouchableOpacity style={styles.buttonSend} onPress={fetchData}>
                    <Text style={styles.buttonSendText}>Send</Text>
                </TouchableOpacity>
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
        marginBottom: 20,
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
        marginBottom: 70,
        borderRadius: 60,
    },
    buttonSendText: {
        color: '#f0f0f0',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Change;
