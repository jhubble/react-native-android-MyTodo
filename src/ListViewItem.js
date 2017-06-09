import React, {Component} from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
import CheckBox from './CheckBox';

class ListViewItem extends Component {
    constructor(props) {
        super(props);
        this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
        this.state = {
            data: this.props.data
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        })
    }

    _onCheckBoxPressed() {
        var data = this.state.data;
        data.completed = !data.completed;
        data.results = data.results.concat([{completed: data.completed, time: Date.now()}]);
        this.setState({
            data: data
        });
        console.log(data);
        this.props.dumpData();
    }

    render() {
        let data = this.state.data;
        let color = data.completed ? '#C5C8C9' : '#000';
        let textDecorationLine = data.completed ? 'line-through' : 'none';
        return (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CheckBox data={data} color={color} onCheckBoxPressed={this._onCheckBoxPressed}></CheckBox><Text
                        style={{fontSize: 12, color: color, textDecorationLine: textDecorationLine}}>{data.title}</Text>
                </View>
        )
    }
}

module.exports = ListViewItem;
