import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
    });

    if (!result.canceled) {
        const selectedUri = result.assets[0].uri;
        return selectedUri;
    } else {
        console.log("Image picking cancelled");
        return null;
    }
};

export default pickImage;