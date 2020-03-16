import React from 'react';
import {Image, Platform, StyleSheet, Text, View} from "react-native";
import GoogleSignInButton from "../components/GoogleSignInButton";
import * as AppAuth from 'expo-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';


const { OAuthRedirect, URLSchemes } = AppAuth;

// const isInClient = Constants.appOwnership === 'expo';
const isInClient = false;
if (isInClient) {
    GoogleSignIn.allowInClient();
}

const clientIdForUseInTheExpoClient =
    '603386649315-vp4revvrcgrcjme51ebuhbkbspl048l9.apps.googleusercontent.com';

/*
 * Redefine this one with your client ID
 *
 * The iOS value is the one that really matters,
 * on Android this does nothing because the client ID
 * is read from the google-services.json.
 */
const yourClientIdForUseInStandalone = Platform.select({
    android:
        '152090196286-pkjcq0hb22e0s6c89skktrvqscjo1ok5.apps.googleusercontent.com',
    ios:
        '152090196286-b08vh6q33df5s2qtjo93ufgdf77thgj8.apps.googleusercontent.com',
});

const clientId = isInClient
    ? clientIdForUseInTheExpoClient
    : yourClientIdForUseInStandalone;

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    state = { user: null };

    componentDidMount() {
        this.initAsync();
    }

    initAsync = async () => {
        await GoogleSignIn.initAsync({
            // You may ommit the clientId when the firebase `googleServicesFile` is configured
            // clientId: '152090196286-pkjcq0hb22e0s6c89skktrvqscjo1ok5.apps.googleusercontent.com'
            clientId: clientId
        });
        this._syncUserWithStateAsync();
    };

    _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        this.setState({ user });
    };

    signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        this.setState({ user: null });
    };

    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, accessToken, user } = await Google.logInAsync(config);
            if (type === 'success') {
                alert(accessToken);
                this._syncUserWithStateAsync();
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    onPress = () => {
        if (this.state.user) {
            this.signOutAsync();
        } else {
            this.signInAsync();
        }
    };

    get buttonTitle() {
        return this.state.user ? 'Sign-Out of Google' : 'Sign-In with Google';
    }

    render() {
        const scheme = {
            OAuthRedirect,
            URLSchemes,
        };
        const { user } = this.state;

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {user && <GoogleProfile {...user} />}
                <GoogleSignInButton onPress={this.onPress}>
                    {this.buttonTitle}
                </GoogleSignInButton>
                <Text>AppAuth: {JSON.stringify(scheme, null, 2)}</Text>
            </View>
        )
    }


}

class GoogleProfile extends React.PureComponent {
    render() {
        const { photoURL, displayName, email } = this.props;
        return (
            <View style={styles.container}>
                {photoURL && (
                    <Image
                        source={{
                            uri: photoURL,
                        }}
                        style={styles.image}
                    />
                )}
                <View style={{ marginLeft: 12 }}>
                    <Text style={styles.text}>{displayName}</Text>
                    <Text style={styles.text}>{email}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    image: { width: 128, borderRadius: 64, aspectRatio: 1 },
    text: { color: 'black', fontSize: 16, fontWeight: '600' },
});

export default LoginScreen;