import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { View, Text } from "react-native";
import Weather from "./components/Weather";

export default function Position () {

    const [latitude, setLatitude]= useState(0)
    const [longitude, setLongitude] = useState(0)
    const [message, setMessage] = useState("loading position")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        (async() => {
            let {status} = await Location.requestForegroundPermissionsAsync()
            console.log(status)
            try {
                
                if (status !== 'granted') {
                    setMessage("Location not permitted")
                } else {
                    const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
                    setLatitude(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                    setMessage("Location retrieved")
                }

            } catch (error){
                setMessage("Error loading location")
                console.log(error)
            }

            setIsLoading(false)
        })()
    }, [])

    return (
        <View>
            <Text> {latitude}, {longitude}</Text>
            <Text> {message} </Text>
            {isLoading === false &&
            <Weather latitude={latitude} longitude={longitude}/>
        }
        </View>
    )
}
