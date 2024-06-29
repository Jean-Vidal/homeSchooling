import React from 'react';
import { TextInput, View, Text } from 'react-native';
import tw from 'twrnc';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const Input: React.FC<InputProps> = ({ label, value, onChangeText }) => {
  return (
    <View style={tw`mb-4`}>
      <Text style={tw`text-lg mb-2`}>{label}</Text>
      <TextInput
        style={tw`border p-2 rounded`}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default Input;
