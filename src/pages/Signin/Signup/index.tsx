import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleSignUp = async () => {
        try {
            const response = await auth().createUserWithEmailAndPassword(email, password);
            if (response.user) {
                await response.user.updateProfile({
                    displayName: displayName
                });
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                }, 3000);
            }
        } catch (error: any) {
            console.error('Erro ao tentar criar conta:', error);
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../../../assets/logo.png')}
            />

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome de usuário"
                    value={displayName}
                    onChangeText={setDisplayName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Digite seu email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Criar Conta</Text>
            </TouchableOpacity>

            {showSuccess && (
                <View style={styles.iconContainer}>
                    <Icon name="check" size={30} color="green" />
                    <Text>Conta criada com sucesso!</Text>
                </View>
            )}

            {showError && (
                <View style={styles.iconContainer}>
                    <Icon name="times" size={30} color="red" />
                    <Text>Erro ao criar conta. Por favor, tente novamente.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    logo: {
        marginBottom: 18
    },
    inputArea: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    input: {
        width: '95%',
        fontSize: 12,
        height: 40,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        marginBottom: 12,
        borderRadius: 5,
        borderColor: 'brown',
        borderWidth: 2,
        color: 'black',
        fontWeight: 'bold'
    },
    button: {
        width: '65%',
        height: 40,
        backgroundColor: 'brown',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    }
});
