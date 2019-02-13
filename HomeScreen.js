import React from 'react';
import { View, Text, Button, Image, ScrollView, StyleSheet, FlatList } from 'react-native';


const styles = StyleSheet.create({
    contentContainer: {
        paddingVertical: 0,
    },
    messageBox:{
        backgroundColor:'#ef553a',
        width:200,
        paddingTop:10,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20, 
        borderRadius:10,
        // height: 200
    },
    messageBoxTitleText:{
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
        fontSize:20,
        marginBottom:10
    },
    messageBoxBodyText:{
        color:'#fff',
        fontSize:16
    }
});


export default class HomeScreen extends React.Component {
    static navigationOptions = () => ({
        
        headerTitle: 'Home',
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
        },
        headerStyle: {
            backgroundColor: 'lightblue',
        },
        headerTintColor: '#fff',
    });

    // Async fetch
    constructor(props){
        super(props);
        this.state = { isLoading: true }
    }    

    componentDidMount(){
        return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                dataSource: responseJson.movies,
                dataTitle: responseJson.title,
            }, function(){

            });
        })
        .catch((error) => {
            console.error(error);
        })
    }

    render() {
      return (
          <View style={{flex:1 }}>
            <View style={{flex: 3, backgroundColor: 'gray', alignItems: 'center'}}>
                <Text> Promociones </Text>
            </View>
            <View style={{flex: 6, backgroundColor: 'brown'}}>
                <Text> Servicios: </Text>
                 
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <Text>{item.title}, released: {item.releaseYear} </Text>}
                    keyExtractor={({id}, index) => id}
                />
                <Text> Whatever</Text>
            

            </View>
            <View style={{flex: 0.5}}>
                <Button
                    title="About"
                    onPress={ () => this.props.navigation.navigate('About')}
                />
            </View>
          
          </View>
        
      );
    }  
  }