import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';

const Autocomplete = (props) => {
    const Apikey = 'AIzaSyDB4WV90TT5-rMiWwqNLIAUidKCc2-n4dE'

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                isRowScrollable={true}
                predefinedPlacesAlwaysVisible={true}
                fetchDetails={true}
                placeholder={props.placeholder}
                onPress={props.onPress}
                query={{
                    key: Apikey,
                    language: 'en',
                }}
                styles={{
                    container: {
                        backgroundColor: 'white'
                    },
                    textInput: {
                        borderRadius: 10, height: hp(7), marginTop: hp(2),
                        color: 'black', backgroundColor: 'white',
                        shadowColor: 'green', shadowOffset: 10, shadowOpacity: 1,
                        borderWidth: 0.5
                    },
                    description: { color: 'black' }
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: wp(4)
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginTop: hp(2)
    }
});

//make this component available to the app
export default Autocomplete;
