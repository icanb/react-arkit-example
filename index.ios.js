/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import ARScene, { ARBoxNode, ARTextNode, ARNode } from 'react-arkit';

export default class ReactArkitExample extends Component {

  constructor (props) {
    super(props);
    this.state = { planes: {} };
    this.newPlaneDetected = this.newPlaneDetected.bind(this);
    this.planedUpdated = this.planedUpdated.bind(this);
  }

  newPlaneDetected ({id, alignment, node, center, extent}) {
    let { planes } = this.state;
    planes[id] = { id, node, center };
    this.setState({ planes });
  }

  planedUpdated ({id, alignment, node, center, extent}) {
    let { planes } = this.state;
    planes[id] = { id, node, center };
    this.setState({ planes });
  }

  renderBoxes () {
    return Object.values(this.state.planes).map((plane) => {

        return plane.node.y < -0.5
          ? <ARNode
              key={plane.id}
              size={{ scale: 0.01 }}
              modelAssetPath={'CustomModels.scnassets/flower.dae:vijverplant'}
              geoposition={{x: plane.node.x,
                            y: plane.node.y + 0.05,
                            z: plane.node.z}}/>
          : <ARNode
              key={plane.id}
              size={{ scale: 0.02 }}
              modelAssetPath={'CustomModels.scnassets/BarsikCat.dae:cat'}
              geoposition={{x: plane.node.x,
                            y: plane.node.y + 0.07,
                            z: plane.node.z}}/>
              });
  }


  render () {
    return (
      <View style={styles.container}>
        <ARScene style={styles.scene}
            debugEnabled
            onPlaneDetected={this.newPlaneDetected}
            onPlaneUpdated={this.planedUpdated}>
          
          <ARTextNode
              text={'Look at the floor'}
              color='#FF0'
              size={{ fontSize: 0.15, depth: 0.1 }}
              geoposition={{x: 0, y: 0.01, z:-1.5}}/>

          { this.renderBoxes() }

        </ARScene>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  scene: {
    flex: 1,
    backgroundColor: '#00FF00'
  }
});

AppRegistry.registerComponent('ReactArkitExample', () => ReactArkitExample);
