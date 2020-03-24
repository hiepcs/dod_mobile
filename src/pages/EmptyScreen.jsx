import React from 'react';
import { Text, View } from 'react-native';

export default class EmptyScreen extends React.Component {
    //Detail Screen to show from any Open detail button
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Empty!</Text>
            </View>
        );
    }
}