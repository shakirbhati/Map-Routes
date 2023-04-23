import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';
import ImagePath from '../assets/ImagePath';
import Autocomplete from '../component/autocomplete';

const PickDrop = ({ navigation }) => {

    // const [pickuplat, setpickuplat] = useState(0)
    // const [Pickuplng, setPickuplng] = useState(0)

    const [droplat, setdroplat] = useState(0)
    const [droplng, setdroplng] = useState(0)


    const OnContinue = () => {
        if (droplat === 0 && droplng === 0) {
            showMessage({
                message: 'Please Fill Drop Location',
                type: 'danger',
                icon: 'danger'
            })
        }
        else {
            navigation.navigate('MapScreen',
                {
                    'LocationCoordinate': {
                        'Drop_lat': droplat,
                        'Drop_lng': droplng,
                    }
                })
        }
    }
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={'white'}
                barStyle='dark-content'
            />
            <Image
                source={ImagePath.MainLogo}
                style={styles.MainLogo}
            />
            <ScrollView
                style={{ flex: 1, backgroundColor: 'white' }}
                keyboardShouldPersistTaps='handled'
            >
                <View style={{ marginTop: hp(2) }}>
                    <Text style={styles.title}>
                        Search Your Destination
                    </Text>
                    <Autocomplete
                        onPress={(e, details) => {
                            setdroplat(details.geometry.location.lat)
                            setdroplng(details.geometry.location.lng)
                        }}
                        placeholder={'Search Your Destination Location'}
                    />
                </View>
                <View style={{ marginTop: hp(10) }}>
                    <TouchableOpacity
                        onPress={() => OnContinue()}
                        style={styles.Btnstyle}>
                        <Text style={styles.Btntitle}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: hp(3),
        paddingHorizontal: wp(3)
    },
    title: {
        fontSize: 17,
        color: 'green',
        fontWeight: 'bold',
        marginTop: hp(2),
        paddingHorizontal: wp(4)
    },
    Btnstyle: {
        backgroundColor: 'green',
        height: hp(6),
        width: wp(88),
        alignSelf: 'center',
        borderRadius: wp(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    Btntitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 0.7
    },
    MainLogo: {
        height: hp(10),
        width: wp(60),
        resizeMode: 'contain',
        alignSelf: 'center'
    }
});
export default PickDrop;
