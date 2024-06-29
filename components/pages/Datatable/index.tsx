import React, { useState, useEffect } from 'react';
import { View, Modal, TextInput, Button, ScrollView, Alert, TouchableOpacity, StyleSheet, Text } from 'react-native';
import CheckBox from 'react-native-check-box';
import { DataTable } from 'react-native-paper';
import { Materia } from '../../types/Materia';
import Icon from 'react-native-vector-icons/FontAwesome';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

interface TableProps {
  data: Materia[];
  onDeleteItem: (id: string) => void;
  onEditItem: (id: string, newData: Materia) => void;
}

const Table: React.FC<TableProps> = ({ data, onDeleteItem, onEditItem }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState<Materia | null>(null);
  const [editedMateria, setEditedMateria] = useState('');
  const [editedTema, setEditedTema] = useState('');
  const [editedDataInicio, setEditedDataInicio] = useState<Date | null>(null);
  const [editedDataFim, setEditedDataFim] = useState<Date | null>(null);
  const [completed, setCompleted] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const initialCompletedState = data.reduce((acc, item) => {
      acc[item.id] = item.concluido;
      return acc;
    }, {} as { [key: string]: boolean });
    setCompleted(initialCompletedState);
  }, [data]);

  const handleEditModal = (item: Materia) => {
    setEditItem(item);
    setEditedMateria(item.materia);
    setEditedTema(item.tema);
    setEditedDataInicio(item.dataInicio);
    setEditedDataFim(item.dataFim);
    setModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (editItem) {
      const newData: Materia = {
        ...editItem,
        materia: editedMateria,
        tema: editedTema,
        dataInicio: editedDataInicio,
        dataFim: editedDataFim,
        concluido: editItem.concluido, // Certifique-se de manter o estado de concluído
      };
      onEditItem(editItem.id, newData);
      setModalVisible(false);
    }
  };

  const handleCheckboxChange = (id: string) => {
    Alert.alert(
      'Concluir Atividade',
      'Deseja concluir a atividade?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {
            setCompleted((prevState) => ({
              ...prevState,
              [id]: false,
            }));
          },
        },
        {
          text: 'OK',
          onPress: async () => {
            setCompleted((prevState) => ({
              ...prevState,
              [id]: true,
            }));
            try {
              const docRef = doc(db, 'Materias', id);
              await updateDoc(docRef, { concluido: true });
            } catch (error) {
              console.error('Erro ao atualizar o campo concluído:', error);
              Alert.alert('Erro', 'Erro ao atualizar o campo concluído. Por favor, tente novamente.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <DataTable style={styles.table}>
          <DataTable.Header>
            <DataTable.Title style={styles.header}>Materia</DataTable.Title>
            <DataTable.Title style={styles.header}>Tema</DataTable.Title>
            <DataTable.Title style={styles.header}>Data Inicio</DataTable.Title>
            <DataTable.Title style={styles.header}>Data Fim</DataTable.Title>
            <DataTable.Title style={styles.header}>Concluído</DataTable.Title>
            <DataTable.Title style={styles.header}>Ações</DataTable.Title>
          </DataTable.Header>
          {data.map((item) => (
            <DataTable.Row key={item.id} style={styles.row}>
              <DataTable.Cell style={styles.cell}>{item.materia}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.tema}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.dataInicio ? item.dataInicio.toLocaleDateString('pt-BR') : 'N/A'}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.dataFim ? item.dataFim.toLocaleDateString('pt-BR') : 'N/A'}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                <CheckBox
                  isChecked={completed[item.id]}
                  onClick={() => {
                    if (!completed[item.id]) {
                      handleCheckboxChange(item.id);
                    }
                  }}
                  checkedCheckBoxColor="#8B4513"
                  uncheckedCheckBoxColor="#8B4513"
                  disabled={completed[item.id]} // Desabilitar checkbox se concluído
                />
              </DataTable.Cell>
              <DataTable.Cell style={styles.cell}>
                <TouchableOpacity style={styles.editIcon} onPress={() => handleEditModal(item)}>
                  <Icon name="edit" size={20} color="#8B4513" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteIcon} onPress={() => onDeleteItem(item.id)}>
                  <Icon name="trash" size={20} color="#8B4513" />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Editando Materia</Text>
            <TextInput
              style={styles.input}
              placeholder="Materia"
              value={editedMateria}
              onChangeText={setEditedMateria}
            />
            <TextInput
              style={styles.input}
              placeholder="Tema"
              value={editedTema}
              onChangeText={setEditedTema}
            />
            <TextInput
              style={styles.input}
              placeholder="Data Inicio"
              value={editedDataInicio ? editedDataInicio.toISOString().split('T')[0] : ''}
              onChangeText={(text) => setEditedDataInicio(new Date(text))}
            />
            <TextInput
              style={styles.input}
              placeholder="Data Fim"
              value={editedDataFim ? editedDataFim.toISOString().split('T')[0] : ''}
              onChangeText={(text) => setEditedDataFim(new Date(text))}
            />
            <Button title="Salvar" onPress={handleSaveEdit} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#8B4513',
    borderRadius: 5,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 8,
    color: '#8B4513',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#8B4513',
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    color: '#8B4513',
  },
  editIcon: {
    marginRight: 10,
  },
  deleteIcon: {
    marginLeft: 10,
  },
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
  input: {
    borderWidth: 1,
    borderColor: '#8B4513',
    borderRadius: 5,
    padding: 8,
    marginVertical: 4,
    width: '100%',
  },
});

export default Table;
