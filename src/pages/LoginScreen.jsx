import React from 'react';
import {Text, View, Button} from "react-native";
import GoogleSignInButton from "../components/GoogleSignInButton";
import * as AppAuth from 'expo-app-auth';
import { connect } from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';
import {isRunningExpo, testToken} from "../constants/config";
import {LOGIN_REQUESTED, LOGOUT_REQUESTED} from "../actions/types";
import GoogleProfile from "../components/GoogleProfile";


const { OAuthRedirect, URLSchemes } = AppAuth;

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    // state = { user: null };

    componentDidMount() {
    }

    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.props.logout();
    };

    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                console.log("DISPATCH")
                this.props.login(user.auth.accessToken)
            } else {
                alert("Type error: " + type);
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    onPress = () => {
        if (this.props.user.accessToken) {
            this.signOutAsync();
        } else {
            this.signInAsync();
        }
    };

    onPressLocal = () => {
        this.props.login(testToken)
    }

    get buttonTitle() {
        return this.props.user.accessToken ? 'Sign-Out of Google' : 'Sign-In with Google';
    }

    render() {
        const scheme = {
            OAuthRedirect,
            URLSchemes,
        };
        // const { user } = this.state;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/*{this.props.user && <GoogleProfile {...this.props.user} />}*/}
                {isRunningExpo ? (
                    <Button onPress={this.onPressLocal}
                            title="Login"
                    />
                ) : (
                    <GoogleSignInButton onPress={this.onPress}>
                        {this.buttonTitle}
                    </GoogleSignInButton>
                )}
                <Text>AppAuth: {JSON.stringify(scheme, null, 2)}</Text>
            </View>
        )
    }


}

const mapStateToProps = state => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = dispatch => {
    return ({
        login: (accessCode) => {
            return dispatch({type: LOGIN_REQUESTED, payload: accessCode})
        },
        logout: () => dispatch({type: LOGOUT_REQUESTED}),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);