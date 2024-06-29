import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dashboard from '../components/pages/Dashboard';
import MateriasScreen from '@/components/pages/Materias';
import TableScreen from '@/components/pages/TableScreen';
import ArmazenarAtividades from '@/components/pages/Atividades';
import VisualizadorDeArquivos from '@/components/pages/VisualizarDeArquivos';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
              <Icon name="bars" size={25} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Matérias"
        component={MateriasScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
              <Icon name="bars" size={25} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Tabela de Atividades"
        component={TableScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
              <Icon name="bars" size={25} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Armazenar Atividades"
        component={ArmazenarAtividades}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
              <Icon name="bars" size={25} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Visualizar Atividades"
        component={VisualizadorDeArquivos}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.menuButton}>
              <Icon name="bars" size={25} color="black" />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginLeft: 10,
  },
});
