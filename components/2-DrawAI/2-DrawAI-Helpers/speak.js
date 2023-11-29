import { Audio } from 'expo-av';
import { useEffect } from 'react';

const speak = async (ttsPrompt) => {
    const { sound } = await Audio.Sound.createAsync(
        {
            uri: `http://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent("Your dream was," + ttsPrompt + "Please wait, until the image is completely loaded.")}&tl=en&client=tw-ob`,
        },
        { shouldPlay: true }
    );
    await sound.setVolumeAsync(1.0);
};

const Speak = ({ ttsPrompt }) => {
    useEffect(() => {
        if (ttsPrompt && ttsPrompt.trim() !== '') {
            speak(ttsPrompt);
        }
    }, [ttsPrompt]);

    return null;
};

export default Speak;
