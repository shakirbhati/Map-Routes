import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    PermissionsAndroid,
    TouchableOpacity,
    StatusBar,
    Platform,
    Dimensions
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp }
    from 'react-native-responsive-screen';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import { showMessage } from 'react-native-flash-message';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const MapScreen = ({ navigation, route }) => {

   

    //GPS LOCATION ENABLER
    const LocationEnabler = () => {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 5000,
            fastInterval: 5000,
        })
            .then((data) => {

            })
            .catch((err) => {
                showMessage({
                    message: 'Permission Denied',
                    type: 'danger',
                });
            });
    }

    //ANDROID LOCATION PERMISSION SEEKER
    useEffect(() => {
        DemoTask()
        LocationEnabler()
        requestLocationPermission()
    }, [])

    function requestLocationPermission() {
        if (Platform.OS == 'ios') {
            const status = Geolocation.requestAuthorization('whenInUse')
            if (status === 'granted') {
                return true
            }
            else {
                return false
            }
        }
        else {
            try {
                const granted = PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    // console.log("You can use the location")
                } else {
                    // console.log("location permission denied")
                }
            }
            catch (err) {
                console.warn(err)
            }
        }
    }

    const mapRef = useRef();
    const AllCoordinate = (route.params?.LocationCoordinate)

    const Apikey = 'AIzaSyDB4WV90TT5-rMiWwqNLIAUidKCc2-n4dE'

    //GoogleMap Lat & Long Variables
    const screen = Dimensions.get('window')
    const Aspect_Ratio = screen.width / screen.height
    const latitudeDelta = 0.09222
    const longitudeDelta = latitudeDelta * Aspect_Ratio


    const [lat, setlat] = useState(0)
    const [lng, setlng] = useState(0)

    //GETTING USER CURRENT LOCATION IN MAP
    const CurrPosition = () => {
        Geolocation.getCurrentPosition(data => {
            setlat(data.coords.latitude)
            setlng(data.coords.longitude)
            console.log('lat', lat + "," + lng)
            console.log('get live location after 4 sec')
        },
            (error) =>
                alert('Couldnot find location'),
            {
                enableHighAccuracy: false
            })
    }
    useEffect(() => {
        CurrPosition()
    }, [lat, lng])

    //GET CURRENT LOCAION AGAIN WHILE ROUTING
    useEffect(() => {
        let Watchposition = setInterval(() => {
            CurrPosition()
        }, 4000);
        return () => clearInterval(Watchposition)
    })

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                backgroundColor={'whitesmoke'}
                barStyle='dark-content'
            />
            <MapView style={[StyleSheet.absoluteFill]}
                region={{
                    latitude: lat === 0 ? 30.7046 : lat,
                    longitude: lng === 0 ? 76.7179 : lng,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                }}
                ref={mapRef}
                showsCompass={true}
                showsTraffic={false}
                showsUserLocation={false}
                showsMyLocationButton={false}
            >
                {AllCoordinate &&
                    <MapViewDirections
                        origin={{
                            latitude: lat,
                            longitude: lng,
                        }}
                        destination={{
                            latitude: AllCoordinate.Drop_lat,
                            longitude: AllCoordinate.Drop_lng
                        }}
                        apikey={Apikey}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={true}
                    // onReady={result => {
                    //     mapRef.current.fitToCoordinates(result.coordinates, {
                    //         edgePadding: {
                    //             right: 30,
                    //             bottom: 300,
                    //             left: 30,
                    //             top: 100
                    //         }
                    //     })

                    // }}
                    />
                }
                {AllCoordinate &&
                    <Marker
                        coordinate={{
                            latitude: lat,
                            longitude: lng,
                        }}
                    />
                }
                {AllCoordinate &&
                    <Marker
                        coordinate={{
                            latitude: AllCoordinate.Drop_lat,
                            longitude: AllCoordinate.Drop_lng
                        }}
                    />
                }
            </MapView>
            <View style={{ flex: 0.95, justifyContent: 'flex-end' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('PickDrop')}
                    style={styles.Btnstyle}>
                    <Text style={styles.Btntitle}>
                        Create a Route
                    </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
};
const styles = StyleSheet.create({
    Btnstyle: {
        backgroundColor: 'green',
        height: hp(6),
        width: wp(80),
        alignSelf: 'center',
        borderRadius: wp(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    Btntitle: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default MapScreen;