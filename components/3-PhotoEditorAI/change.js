// import React, { useEffect, useState } from 'react';
// import { View, ImageBackground, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { PanResponder, Svg, Circle } from 'react-native-svg';

// const Change = () => {
//     const [selectedImage, setSelectedImage] = useState(null);

//     const pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [3, 3],
//             quality: 1,
//         });

//         if (!result.canceled) {
//             const selectedUri = result.assets[0].uri;
//             setSelectedImage(selectedUri);
//         } else {
//             console.log("Image picking cancelled");
//         }
//     };


//     return (
//         <ImageBackground
//             source={require('../../assets/bg-image-createdwith-chatgpt.png')}
//             style={styles.backgroundImage}
//         >
//             <View style={styles.container}>
//                 <TouchableOpacity style={styles.buttonSend} onPress={pickImage}>
//                     <Text style={styles.buttonSelectImageText}>Pick an image from gallery</Text>
//                 </TouchableOpacity>

//                 <Image
//                     style={styles.image}
//                     source={selectedImage ? { uri: selectedImage } : require('../../assets/container-image-createdwith-chatgpt.png')}
//                 />

//                 <TouchableOpacity style={styles.buttonSend} onPress={() => { }}>
//                     {/* "Send" butonuna basıldığında yapılacak işlemler buraya eklenir. */}
//                     <Text style={styles.buttonSendText}>Send</Text>
//                 </TouchableOpacity>
//             </View>
//         </ImageBackground>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     },
//     buttonSelectImageText: {
//         color: '#f0f0f0',
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     backgroundImage: {
//         flex: 1,
//         resizeMode: 'cover',
//         justifyContent: 'center',
//     },
//     image: {
//         width: 300,
//         height: 300,
//         resizeMode: 'cover',
//         marginBottom: 10,
//         borderWidth: 8,
//         borderColor: 'black',
//         borderRadius: 20,
//     },
//     buttonSend: {
//         backgroundColor: 'black',
//         width: 120,
//         height: 120,
//         justifyContent: 'center',
//         marginTop: 10,
//         marginBottom: 20,
//         borderRadius: 60,
//     },
//     buttonSendText: {
//         color: '#f0f0f0',
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
// });

// export default Change;
