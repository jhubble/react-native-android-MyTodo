import React, {Component} from 'react';
import {Text, View, ListView, StyleSheet, AsyncStorage} from 'react-native';
import TodoModel from './TodoModel';
import OmniBox from './OmniBox';
import ListViewItem from './ListViewItem';

let dataList = [
];
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

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.updateDataList = this.updateDataList.bind(this);
        this.markDone = this.markDone.bind(this);
        this.dumpData = this.dumpData.bind(this);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1.title !== r2.title
            }
        });

        this.state = {
            dataList: dataList,
            dataSource: ds.cloneWithRows(dataList)
        }
    }

    markDone(item) {
        this.dumpData();
    }

    dumpData() {
        var dataObj = JSON.stringify(this.state.dataList);
        console.log("SAVING dataObj:",dataObj);
        AsyncStorage.setItem('@MyTodo:todoitems', dataObj);
    }

    updateDataList(dataItem) {
        this.setState((prevState, props) => {
            let dataList = prevState.dataList.concat([new TodoModel(dataItem, false)]);
            return {
                dataList: dataList,
                dataSource: prevState.dataSource.cloneWithRows(dataList)
            }
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
                    renderRow={(data) => <ListViewItem dumpData={this.dumpData} markDone={this.markDone} data={data}/>}
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
