import {View, Text, Button, StyleSheet} from "react-native";
import React from "react";
import {LOGOUT_REQUESTED} from "../actions/types";
import { connect } from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';
import ProfitChart from "../components/ProfitChart";

function HomeScreen({navigation, logout, profit}) {

    async function signOutAsync() {
        await GoogleSignIn.signOutAsync();
        logout();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Investing</Text>
            <Text style={[styles.profit, profit >=0 ? styles.positiveProfit : styles.negativeProfit]}>{profit}</Text>
            <ProfitChart/>
            <Button title="Logout" onPress={() => signOutAsync()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf: 'flex-start',
    },
    profit: {
        fontSize: 20,
        alignSelf: 'flex-start',
    },
    positiveProfit: {
        color: "green",
    },
    negativeProfit: {
        color: "red",
    }
});

const mapStateToProps = state => {
    return {
        profit: state.stat.profit,
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        logout: () => dispatch({type: LOGOUT_REQUESTED}),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);