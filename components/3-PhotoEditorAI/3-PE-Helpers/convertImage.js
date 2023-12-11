import * as FileSystem from 'expo-file-system';
import { manipulateAsync } from 'expo-image-manipulator';

const convertJpegToPng = async (jpegImagePath, maxSizeInBytes = 4 * 1024 * 1024) => {
    try {
        // Dosyanın varlığını kontrol et:
        const fileExists = await FileSystem.getInfoAsync(jpegImagePath);
        if (!fileExists.exists) {
            console.error('File not found:', jpegImagePath);
            return null;
        }

        // Resmi yüksek kalitede yeniden boyutlandırma:
        const resizeResult = await manipulateAsync(
            jpegImagePath,
            [{ resize: { format: 'png', width: 256, height: 256 } }],
            { format: 'png', base64: false }
        );

        // Dosya boyutunu kontrol ettim:
        if (resizeResult.size <= maxSizeInBytes) {
            console.log('No need to compress. Conversion successful:', resizeResult.uri);
            return resizeResult.uri;
        }

        // Dosya boyutu sınıra ulaştı, kaliteyi düşürerek tekrar boyutlandırıyorum:
        const compressResult = await manipulateAsync(
            jpegImagePath,
            [{ resize: { format: 'png', width: 256, height: 256 } }],
            { compress: 0.5, format: 'png', base64: false }
        );

        console.log('Compression successful. Conversion successful:', compressResult.uri);
        return compressResult.uri;

    } catch (error) {
        console.error('Conversion error:', error);
        return null;
    }
};

export default convertJpegToPng;
