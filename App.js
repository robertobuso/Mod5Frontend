/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import { connect } from 'react-redux'

import { chooseAudio } from './js/redux/actions'


import {
  ViroARSceneNavigator
} from 'react-viro';

const sharedProps = {
  apiKey:"1A853839-79AE-41CD-9C29-B554308C3C81",
}

// Sets the default scene you want for AR and VR
const InitialARScene = require('./js/scenes/BookScene');

const UNSET = "UNSET";
const AR_NAVIGATOR_TYPE = "AR";
const defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps
    }
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._startExperience();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _startExperience = () => {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            You may cut all the
            <Text style={localStyles.flowerText}>
              flowers...
            </Text>
          </Text>

          <View style={localStyles.buttonInner}>
            <View style={localStyles.container}>
              <TouchableHighlight style={localStyles.buttons}
                onPress={() => this.props.chooseAudio('audio')
                }
                underlayColor={'#68a0ff'} >
                <Text style={localStyles.buttonText}>audio</Text>
              </TouchableHighlight>

              <TouchableHighlight style={localStyles.buttons}
                onPress={() => this.props.chooseAudio('titles')}
                underlayColor={'#68a0ff'} >
                <Text style={localStyles.buttonText}>titles</Text>
              </TouchableHighlight>

              <TouchableHighlight style={localStyles.buttons}
                onPress={(event) => this.props.chooseAudio('both')}
                underlayColor={'#68a0ff'}>
                <Text style={localStyles.buttonText}>both</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View style={localStyles.buttonInner}>
            <TouchableHighlight style={localStyles.buttons}
              onPress={(event) => this._handleStartButton(event)}
              underlayColor={'#68a0ff'} >

              <Text style={localStyles.buttonText}>start</Text>
            </TouchableHighlight>

          </View>

        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator = () => {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene}} />
    );
  }

  _handleStartButton = () => {
    //We need to check if the audio button has been selected. For that we need the Redux state.
    this.setState({
       navigatorType: AR_NAVIGATOR_TYPE
    })
  }

  _setAudio = (audioSelection) => {
    console.log('Event: ', audioSelection)
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro = () => {
    this.setState({
      navigatorType : UNSET
    })
  }
}

const localStyles = StyleSheet.create({
  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    backgroundColor: "black"
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
    marginTop: 300
  },
  buttonInner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
    marginTop: 50
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 35
  },
  flowerText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#FF0000',
    textAlign:'center',
    fontSize : 35
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports =  connect(null, { chooseAudio } )(ViroSample)
