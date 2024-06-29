import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import tw from 'twrnc';

interface DateInputProps {
  label: string;
  date: Date;
  setDate: (date: Date) => void;
}

const DateInput: React.FC<DateInputProps> = ({ label, date, setDate }) => {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <View style={[tw`mb-4`, styles.container]}>
    <Text style={tw`text-lg mb-2 text-center`}>{label}</Text>
    <TouchableOpacity
      style={[styles.button, { backgroundColor: '#8B4513' }]}
      onPress={() => setShow(true)}
    >
      <Text style={styles.buttonText} >{date.toLocaleDateString('pt-BR')}</Text>
    </TouchableOpacity>
    {show && (
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode="date"
        display="default"
        onChange={onChange}
      />
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DateInput;
