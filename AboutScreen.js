import React from 'react';
import {View, Text} from 'react-native';


export default class AboutScreen extends React.Component{

    static navigationOptions = () => ({
        
        headerTitle: 'About',
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },
        headerStyle: {
            backgroundColor: 'lightblue',
        },
        headerTintColor: '#fff',
    });

    render() {
        return(
            <View>
                <Text> Holi, soy el cosito de about </Text>
            </View>

        );
    }
}