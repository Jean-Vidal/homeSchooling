import React from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import Button from '../../components/Button';

function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Clique Me" onPress={() => Alert.alert('Botão Pressionado!')} />
    </SafeAreaView>
  );
}

export default HomeScreen;
