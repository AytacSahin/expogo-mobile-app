import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';

import AnimatedText from './1-Intro-Helpers/animatedtext';
import Mainbutton from './1-Intro-Helpers/mainbutton';

export default function Intro() {

    return (
        <View style={styles.container}>

            <Video
                source={require('../../assets/outer.mp4')}
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
                <AnimatedText text='Think,  Write   And   Wait' />
                <Mainbutton />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    }
});
