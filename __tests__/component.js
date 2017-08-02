import React, { Component } from 'react';
import {
  Text,
  Button,
  View
} from 'react-native';


export class TestScreen extends Component {
  static staticProperty = {
    property: "static"
  };

  static otherStaticProperty = {
    hello: "World"
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.props.mount("Registered mount");
  }

  buttonClick() {
    return this.props.click("Registered click");
  }

  render() {
    return (
      <View>
        <Text>
          Hello world
        </Text>
        <Button
          title="Click!"
          onPress={() => this.buttonClick()}
        />
      </View>
    );
  }
}