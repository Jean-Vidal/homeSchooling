import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView, Modal, StyleSheet } from 'react-native';
import Input from '../../components/Input/Index';
import DateInput from '../../components/DatePicker';
import tw from 'twrnc';

function MateriasScreen() {
  const [materia, setMateria] = useState('');
  const [tema, setTema] = useState('');
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    materia: '',
    tema: '',
    dataInicial: new Date(),
    dataFinal: new Date(),
  });

  const handleAdicionar = () => {
    setModalContent({
      materia,
      tema,
      dataInicial,
      dataFinal,
    });
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={tw`text-2xl mb-4`}>Matérias</Text>
      <View style={tw`w-full px-4`}>
        <Input label="Matéria" value={materia} onChangeText={setMateria} />
        <Input label="Tema" value={tema} onChangeText={setTema} />

        <View>
          <DateInput label="Escolher Data Inicial" date={dataInicial} setDate={setDataInicial} />
        </View>

        <View>
          <DateInput label="Escolher Data Final" date={dataFinal} setDate={setDataFinal} />
        </View>

        <View style={tw`mt-4`}>
          <Button title="Adicionar" onPress={handleAdicionar} color="#8B4513"/>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
      <Text style={styles.modalText}>Matéria: {modalContent.materia}</Text>
      <Text style={styles.modalText}>Tema: {modalContent.tema}</Text>
      <Text style={styles.modalText}>Data Inicial: {modalContent.dataInicial.toLocaleDateString('pt-BR')}</Text>
      <Text style={styles.modalText}>Data Final: {modalContent.dataFinal.toLocaleDateString('pt-BR')}</Text>
      <View style={styles.modalButtons}>
      <Button title="OK" onPress={() => setModalVisible(false)} color="#8B4513" />
      <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
      </View>
    </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginHorizontal: 20, 
  },
});

export default MateriasScreen;
