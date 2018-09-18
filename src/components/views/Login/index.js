import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';

import { 
  getOrientation,
  setOrientationListener,
  removeOrientationListener,
  getPlatform
} from '../../utils/misc';

import LoadTabs from '../Tabs';
import Logo from './logo';
import LoginPanel from './loginPanel'

class Login extends Component {


  constructor(props){
    super(props);

    this.state = {
      platform:getPlatform(),
      orientation: getOrientation(500),
      logoAnimation: false
    }

    setOrientationListener(this.changeOrientation);
  }

  changeOrientation = () => {
    this.setState({
      orientation: getOrientation(500)
    })
  }

  componentWillReceiveProps(props){
    console.log(props);
  }

  componentWillUnmount(){
    removeOrientationListener();
  }

  showLogin = () => {
    this.setState({
      logoAnimation:true
    })
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Logo
            showLogin={this.showLogin}
            orientation={this.state.orientation}
          />
          <LoginPanel
            platform={this.state.platform}
            show={this.state.logoAnimation}
            orientation={this.state.orientation}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems: 'center',
  }
});


export default Login;