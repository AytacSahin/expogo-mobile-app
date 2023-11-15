import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

const Music = () => {

    const [sound, setSound] = useState(null);

    useEffect(() => {
        const loadSound = async () => {
            const { sound } = await Audio.Sound.createAsync(
                require('../../../assets/Campfire.mp3'),
                { isLooping: true } // Müziği sürekli tekrarlamak için.
            );
            setSound(sound);
            await sound.playAsync(); // Müziği otomatik olarak çal

            // Müzik çalma durumu güncellendiğinde (örneğin, tekrar başladığında) bu işlevi çağır
            sound.setOnPlaybackStatusUpdate(async (status) => {
                if (status.didJustFinish) {
                    // Müzik tamamlandıysa, tekrar oynat
                    await sound.replayAsync();
                }
            });
        };

        loadSound();

        // ComponentWillUnmount işlevi
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);
}

export default Music;