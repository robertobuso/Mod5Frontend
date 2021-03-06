'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARPlane,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterials
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  render() {
    return (
      <ViroARScene>
        <ViroARPlane>
          <ViroAmbientLight color="#ffffff"/>
          <Viro3DObject source={require('../objects/book_obj/objBook.obj')}
            resources={[require('../objects/book_obj/objBook.mtl')]}
            position={[0, 0, -1]}
            scale={[0.05,0.05,0.05]}
            materials={["book"]}
            dragType="FixedDistance"
            onDrag={()=>{}}
          type="OBJ"/>
        </ViroARPlane>
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  book: {
     diffuseTexture: require('../objects/book_obj/libro.jpg'),
     specularTexture: require('../objects/book_obj/libroEspecular.jpg')
   },
});

module.exports = HelloWorldSceneAR;
