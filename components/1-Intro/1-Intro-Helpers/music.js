import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Music = () => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        const loadSound = async () => {
            try {
                const { sound } = await Audio.Sound.createAsync(
                    require('../../../assets/Campfire.mp3'),
                    { isLooping: true }
                );
                setSound(sound);
                await sound.playAsync();

                sound.setOnPlaybackStatusUpdate(async (status) => {
                    if (status.didJustFinish) {
                        await sound.replayAsync();
                    }
                });
            } catch (error) {
                console.error("Music play error:", error);
            }
        };

        loadSound();

        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const toggleMusic = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            {/* Müzik kontrol düğmesi */}
            <TouchableOpacity style={styles.musicButton} onPress={toggleMusic}>
                <MaterialIcons name={isPlaying ? 'volume-up' : 'volume-off'} size={24} color="white" />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    musicButton: {
        borderWidth: 5,
        backgroundColor: 'black',
        borderRadius: 50,
        position: 'absolute',
        top: 30,
        right: 30,
        padding: 10, 
    },
});

export default Music;
