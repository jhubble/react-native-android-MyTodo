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
import TodoList from './src/TodoList';

class MyTodo extends Component {
        render() {
                return (
                        <View style={styles.container}>
                           <TodoList></TodoList>
                        </View>
                );
        }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    marginLeft: 5,
    paddingRight: 2,
    backgroundColor: '#F8F8F8',
  }
});

AppRegistry.registerComponent('MyTodo', () => MyTodo);
