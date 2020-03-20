import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from "react-native";
import GoogleSignInButton from "../components/GoogleSignInButton";
import * as AppAuth from 'expo-app-auth';
import {connect} from 'react-redux';
import * as GoogleSignIn from 'expo-google-sign-in';
import {LOGIN_REQUESTED, LOGOUT_REQUESTED} from "../actions/types";
import GoogleProfile from "../components/GoogleProfile";
import Spinner from "react-native-loading-spinner-overlay";


const {OAuthRedirect, URLSchemes} = AppAuth;

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
            const {type, user} = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                this.props.login(user.auth.accessToken)
            } else {
                alert("Type error: " + type);
            }
        } catch ({message}) {
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
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <>
                        <Spinner
                            visible={this.props.loading}
                            textContent={'Loading...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                        {/*{this.props.user && <GoogleProfile {...this.props.user} />}*/}
                        <GoogleSignInButton onPress={this.onPress}>
                            {this.buttonTitle}
                        </GoogleSignInButton>
                        <Text>AppAuth: {JSON.stringify(scheme, null, 2)}</Text>
                    </>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
});

const mapStateToProps = state => {
    return {
        user: state.user,
        loading: state.loading,
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