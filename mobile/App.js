import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Modal, Button, TextInput } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
export default function App() {
  const [selectedFrameworkId, setSelectedFrameworkId] = useState(null);
  const [selectedHobbieId, setSelectedHobbieId] = useState(null);
  const [isFrameworkEditModalVisible, setFrameworkEditModalVisible] = useState(false);
  const [isHobbieEditModalVisible, setHobbieEditModalVisible] = useState(false);
  const [isUserEditModalVisible, setUserEditModalVisible] = useState(false);
  const [editedFramework, setEditedFramework] = useState({});
  const [editedHobbie, setEditedHobbie] = useState({});
  const [editedUserInfo, setEditedUserInfo] = useState({});
  const [user, setUser] = useState({}); 
  const [userId, setUserId] = useState({});


  useEffect(() => {

    const apiUrl = 'http://localhost:5161/api/Users/profile';

    axios.get(apiUrl)
      .then(response => {
        console.log(response);
        setUser(response.data);
        setUserId(response.data.id);

      })
      .catch(error => {

        console.error('Error al obtener datos de la API', error);
      });
  }, []); 


  const FrameworkItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={() => handleEditPress(item, 'framework')} style={[styles.item, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{item.name}</Text>
      <Text>Nivel: {item.level}</Text>
      <Text>Año: {item.year}</Text>
      {/* Agrega otros campos según tus necesidades para frameworks */}
    </TouchableOpacity>
  );
  
  const HobbieItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={() => handleEditPress(item, 'hobbie')} style={[styles.item, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{item.name}</Text>
      <Text>Descripcion: {item.description}</Text>
    </TouchableOpacity>
  );

  const renderFrameworkItem = ({ item }) => {
    const backgroundColor = item.id === selectedFrameworkId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedFrameworkId ? 'white' : 'black';
  
    return (
      <FrameworkItem
        item={item}
        onPress={() => setSelectedFrameworkId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  
  const renderHobbieItem = ({ item }) => {
    const backgroundColor = item.id === selectedHobbieId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedHobbieId ? 'white' : 'black';
  
    return (
      <HobbieItem
        item={item}
        onPress={() => setSelectedHobbieId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const toggleUserEditModal = () => {
    setUserEditModalVisible(!isUserEditModalVisible);
    setEditedUserInfo({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      city: user.city,
      country: user.country,
      summary: user.summary,
    });
  };

  const toggleFrameworkEditModal = () => {
    setFrameworkEditModalVisible(!isFrameworkEditModalVisible);
  };

  const toggleHobbieEditModal = () => {
    setHobbieEditModalVisible(!isHobbieEditModalVisible);
  };

  const handleEditUser = async () => {
    if (user && user.id) {
      try {
        const response = await axios.put(`http://localhost:5161/api/users/${user.id}`, editedUserInfo);
  
        console.log('Usuario editado:', response.data);
        toggleUserEditModal();
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.error('Error: user.id es undefined');
    }
  };

  const handleEditFramework = async () => {
    try {
      const response = await axios.put(`http://localhost:5161/api/users/frameworks/${editedFramework.id}`, editedFramework);
  
      console.log('Framework editado:', response.data);
      toggleFrameworkEditModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const handleEditHobbie = async () => {
    try {
      const response = await axios.put(`http://localhost:5161/api/users/hobbies/${editedHobbie.id}`, editedHobbie);
  
      console.log('Hobbie editado:', response.data);
      toggleHobbieEditModal();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditPress = (item, type) => {
    if (type === 'framework') {
      setEditedFramework(item);
      toggleFrameworkEditModal();
    } else if (type === 'hobbie') {
      setEditedHobbie(item);
      toggleHobbieEditModal();
    } else if (type === 'user') {
      setEditedUserInfo(item);
      toggleUserEditModal();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subHeader}>{user.name + " " + user.lastname + ",\n" + user.city + ", " + user.country}</Text>
      <Text style={{textAlign: "center"}}>{user.summary} </Text>
      <Text style={styles.subHeader}>Habilidades y hobbies </Text>
        <View style={styles.listContainer}>
          <View style={styles.list}>

            <FlatList
              data={user.frameworks}
              renderItem={renderFrameworkItem}
              keyExtractor={item => item.id.toString()}
              extraData={selectedFrameworkId}
            />
          </View>
          <View style={styles.list}>
            <FlatList
              data={user.hobbies}
              renderItem={renderHobbieItem}
              keyExtractor={item => item.id.toString()}
              extraData={selectedHobbieId}
            />
          </View>
          
        </View>
        <Button title="Editar Usuario" onPress={toggleUserEditModal} />
          {/* Modal de edición de framework */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isFrameworkEditModalVisible}
            onRequestClose={toggleFrameworkEditModal}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Editar Framework</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Nombre"
                value={editedFramework.name}
                onChangeText={(text) => setEditedFramework({ ...editedFramework, name: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Nivel"
                value={editedFramework.level}
                onChangeText={(text) => setEditedFramework({ ...editedFramework, level: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Año"
                value={editedFramework.year ? editedFramework.year.toString() : ''}
                onChangeText={(text) => setEditedFramework({ ...editedFramework, year: parseInt(text) })}
              />
              <Button title="Guardar " onPress={handleEditFramework} />
              <Button title="Cancelar" onPress={toggleFrameworkEditModal} />
            </View>
          </Modal>

          {/* Modal de edición de hobbie */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isHobbieEditModalVisible}
            onRequestClose={toggleHobbieEditModal}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Editar Hobbie</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Nombre"
                value={editedHobbie.name}
                onChangeText={(text) => setEditedHobbie({ ...editedHobbie, name: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Descripción"
                value={editedHobbie.description}
                onChangeText={(text) => setEditedHobbie({ ...editedHobbie, description: text })}
              />
              <Button title="Guardar Cambios" onPress={handleEditHobbie} />
              <Button title="Cancelar" onPress={toggleHobbieEditModal} />
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isUserEditModalVisible}
            onRequestClose={toggleUserEditModal}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Editar Información del Usuario</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Name"
                value={editedUserInfo.name}
                onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, name: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Lastname"
                value={editedUserInfo.lastname}
                onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, lastname: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Email"
                value={editedUserInfo.email}
                onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, email: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="City"
                value={editedUserInfo.city}
                onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, city: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Country"
                value={editedUserInfo.country}
                onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, country: text })}
              />
              <TextInput
                style={styles.modalInput}
                placeholder="Summary"
                value={editedUserInfo.summary}
                onChangeText={(text) => setEditedUserInfo({ ...editedUserInfo, summary: text })}
                multiline
              />
              <Button title="Guardar Cambios" onPress={handleEditUser} />
              <Button title="Cancelar" onPress={toggleUserEditModal} />
            </View>
          </Modal>
  </SafeAreaView>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    flex: 1,
  },
  subHeader: {
    backgroundColor : "#2089dc",
    color : "white",
    textAlign : "center",
    paddingVertical : 5,
    marginBottom : 10,
    fontSize : 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Cambiado a blanco
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    width: '80%',
  },

});
