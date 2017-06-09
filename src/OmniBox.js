import React, {Component} from 'react';
import {TextInput, Text, View} from 'react-native';
import TodoModel from './TodoModel';

class OmniBox extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmitEditing = this.onSubmitEditing.bind(this);
    }

    componentWillMount() {
        this.setState({
            newValue: '',
            keyPress: ''
        });
    }

    onChange(event) {
        var title = event.nativeEvent.text;
        this.setState((prevState, props) => {
            prevState.newValue = title;
            return prevState;
        });
    }

    onSubmitEditing() {
        if (this.state.newValue) {
            this.props.updateDataList(this.state.newValue);
            this.refs.input.clear();
        }
    }


    render() {
        return (
            <TextInput style={{
                height: 20,
                padding: 2,
                marginBottom: 0,
                fontSize: 12,
                borderWidth: 1,
                borderColor: '#eee',
                borderRadius: 8,
                backgroundColor: '#fff'
            }}
                                                                 placeholder='Add a todo'
                                                                 blurOnSubmit={false}
                                                                 value={this.state.newValue}
                                                                 onChange={this.onChange}
                                                                 onSubmitEditing={this.onSubmitEditing}
                                                                 ref="input"
            >
            </TextInput>
        ) ;
    }
}

module
    .exports = OmniBox;
