import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    Image,
    StatusBar
} from 'react-native';
import ImagePath from '../assets/ImagePath';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';

const Splash = ({ navigation }) => {

    // SPLASH COUNTER
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('MapScreen')
        }, 1500);
    });

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={'white'}
                barStyle="dark-content"
            />
            <Image
                source={ImagePath.MainLogo}
                style={styles.MainLogo}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    MainLogo: {
        height: hp(45),
        width: wp(90),
        resizeMode: 'contain'
    }
});

//make this component available to the app
export default Splash;
