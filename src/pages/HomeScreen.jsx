import { View, Text, Button} from "react-native";
import React from "react";
import {LOGOUT_REQUESTED} from "../actions/types";
import { connect } from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';

function HomeScreen({navigation, logout}) {

    async function signOutAsync() {
        await GoogleSignIn.signOutAsync();
        logout();
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Dog of The Dow</Text>
            {/*<Button title="LoginScreen" onPress={() => navigation.navigate("Login")}/>*/}
            <Button title="Logout" onPress={() => signOutAsync()} />
        </View>
    );
}

const mapDispatchToProps = dispatch => {
    return ({
        logout: () => dispatch({type: LOGOUT_REQUESTED}),
    })
}

export default connect(null, mapDispatchToProps)(HomeScreen);