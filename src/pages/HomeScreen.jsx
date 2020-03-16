import { View, Text, Button} from "react-native";
import React from "react";

function HomeScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Dog of The Dow</Text>
            <Button title="LoginScreen" onPress={() => navigation.navigate("Login")}/>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default HomeScreen;