import React, {Component} from 'react';
import {AppState, Text, View, ListView, StyleSheet, AsyncStorage} from 'react-native';
import TodoModel from './TodoModel';
import OmniBox from './OmniBox';
import ListViewItem from './ListViewItem';

let dataList = [];
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 2,
        flexDirection: 'row',
        padding: 2
    },
    text: {
        marginLeft: 12,
        fontSize: 12
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#ff0000'
    }
});
const oneDay = 1000*60*60*24;
const resetTime = 3;


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.updateDataList = this.updateDataList.bind(this);
        this.markDone = this.markDone.bind(this);
        this.dumpData = this.dumpData.bind(this);
        this.loadData = this.loadData.bind(this);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1.title !== r2.title
            }
        });

        this.state = {
            dataList: dataList,
            dataSource: ds.cloneWithRows(dataList)
        };

        this.loadData();

        // This is not the way to do it!
        setInterval(() => {
            this.timeToReset();
        },10*60*1000);
    }

    markDone(item) {
        this.dumpData();
    }

    resetTasks() {
        this.setState((prevState, props) => {
            if (prevState.dataList) {
                prevState.dataList.map((item) => {
                    item.completed = false;
                    return item;
                });
                prevState.lastResetTime = Date.now();
                AsyncStorage.setItem('@myTodo:lastReset',prevState.lastResetTime)
            }
            return prevState;
        })
    }

    timeToReset() {
        // Reset is past 3am or 24 hours past last reset
        // Date.time
        var now = new Date();
        var then = this.state.lastResetTime;
        var milidiff = now-then;
        if ((now.getHours() >resetTime && now.getDate() != then.getDate()) ||(milidiff > oneDay)) {
            this.resetTasks();
        }
    }


    loadData() {
        AsyncStorage.getItem('@MyTodo:lastReset', (err, result) => {
            if (result) {
                this.setState((prevState, props) => {
                    prevState.lastResetTime = result - 0;
                    setImmediate(() => {
                        this.timeToReset();
                    });
                    return prevState;
                })
            }
        });

        AsyncStorage.getItem('@MyTodo:todoitems', (err, result) => {
            console.log("Loaded data:", result);
            if (result) {
                let dataList = JSON.parse(result);
                this.setState((prevState, props) => {
                    prevState.dataList = dataList;
                    prevState.dataSource = prevState.dataSource.cloneWithRows(dataList);
                    return prevState;
                });
            }
        })
    }

    dumpData() {
        var dataObj = JSON.stringify(this.state.dataList);
        console.log("SAVING dataObj:", dataObj);
        AsyncStorage.setItem('@MyTodo:todoitems', dataObj);
    }

    updateDataList(dataItem) {
        this.setState((prevState, props) => {
            let dataList = prevState.dataList.concat([new TodoModel(dataItem, false)]);
            prevState.dataList = dataList;
            prevState.dataSource = prevState.dataSource.cloneWithRows(dataList)
            return prevState;
        });
        this.dumpData();
    }

    render() {
        let listView = (<View></View>);
        if (this.state.dataList.length) {
            listView = (
                <ListView
                    ref='listView'
                    dataSource={this.state.dataSource}
                    style={styles.container}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/> }
                    renderRow={(data) => <ListViewItem dumpData={this.dumpData} markDone={this.markDone}
                                                       data={data}/>}
                />
            );
        }

        return (
            <View style={{flex: 1, marginLeft: 5, marginRight: 5, paddingLeft: 4}}>
                <OmniBox
                    data={dataList}
                    updateDataList={this.updateDataList}/>
                {listView}
            </View>
        )
    }
}

module
    .exports = TodoList;
