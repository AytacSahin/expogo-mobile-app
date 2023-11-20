import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';

import AnimatedText from './1-Intro-Helpers/animatedtext';
import Music from './1-Intro-Helpers/music';
import Mainbutton from './1-Intro-Helpers/mainbutton';

export default function Intro() {

    Music(); // müzik componenti çalıştırıldı.

    return (
        <View style={styles.container}>
            <Video
                source={require('../../assets/Ocean.mp4')}
                rate={1.0}
                volume={1.0}
                isMuted={true}
                resizeMode="cover"
                shouldPlay={true}
                isLooping={true}
                useNativeControls={false}
                style={StyleSheet.absoluteFillObject} // Videoyu ekranı kaplayacak şekilde ayarladım.
            />
            <View style={styles.overlay}>
                <AnimatedText text='“Hayattaki sıradan şeyleri sıra dışı bir şekilde yaptığınızda, dünyanın dikkatini çekeceksiniz.” George Washington Carver' style={styles.text}/>
                <Mainbutton />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },
    text: {
        fontSize: 28,
        marginTop: 80,
        marginLeft: 20,
        marginRight: 40,
    },

});
