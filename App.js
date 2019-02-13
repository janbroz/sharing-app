// import React from 'react';
// import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
// import HomeScreen from './HomeScreen'

// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen,
//   },

// }, {
//   initialRouteName: 'Home',
// });

// const AppContainer = createAppContainer(AppNavigator);
// export default class App extends React.Component{
//   render(){
//     return <AppContainer/>
//   }
// }


// Login test

import React from 'react';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthSession, SecureStore } from 'expo';
import HomeScreen from './HomeScreen'
import LoginScreen from './LoginScreen'
import AboutScreen from './AboutScreen'

const auth0ClientId = '5Z4NCz0oQg9ZxU9onBVJUQfXXm1H0KVi';
const auth0Domain = 'https://share-app.auth0.com';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Login: {
    screen: LoginScreen,
  },
  About: {
    screen: AboutScreen,
  }
}, {
  initialRouteName: 'Home',
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  state = {
    result: null,
    hasInitialized: false,
    loggedIn: "false",
    logInfo: '',
  };

  componentDidMount(){
    let result = this._get();
  }

  _get = async () => {
    let res = await SecureStore.getItemAsync("loggedIn");
    this.setState({loggedIn: res});
    let res2 = await SecureStore.getItemAsync("logInfo");
    this.setState({logInfo: res2});
  }

  _logOut = () => {
    this.setState({logInfo: ''});
    this.setState({loggedIn: "false"});
    AuthSession.dismiss();
    
  }

  render() {
    if(this.state.loggedIn == "true"){
      return (
        <AppContainer/>
        // <View style={{flex: 1}}>
        //   <View style={{flex: 1}}></View>
        //   <View style={{flex: 9}}>
        //     <Text> Loged in as someone </Text>
        //     <Text> Am i logged? : {this.state.loggedIn}</Text>
        //     <Text> Log info: {this.state.logInfo }</Text>
        //     <Text> Session info: {JSON.stringify(this.state.result)} </Text>
        //     <View style={styles.container}>
        //       <Button title="Log out" onPress={this._logOut} /> 
        //     </View>
        //   </View>
        // </View>
      )
    }else{
      return (
        <View style={styles.container}>
        <Button title="Open Auth0 Auth" onPress={this._handlePressAsync} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>,
          <Text> Am i logged? : {this.state.loggedIn}</Text>
        ) : <Text> Am i logged? : {this.state.loggedIn}</Text>}
      </View>
      )
    }
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let authUrl =
      `${auth0Domain}/authorize` +
      toQueryString({
        client_id: auth0ClientId,
        response_type: 'token',
        scope: 'openid name',
        redirect_uri: redirectUrl,
      });

    let result = await AuthSession.startAsync({ authUrl });
    
    

    this.setState({ result: result });
    if(result.type == 'success'){
      let JSONresponse = JSON.stringify(result.params.access_token);
      SecureStore.setItemAsync("loggedIn", "true");
      SecureStore.setItemAsync("logInfo", JSONresponse);
      this.setState({loggedIn: "true"});
      this.setState({logInfo: JSONresponse});
    }else{
      this.setState({loggedIn : "what"});
    }
  };
}

function toQueryString(params) {
  return (
    '?' +
    Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


