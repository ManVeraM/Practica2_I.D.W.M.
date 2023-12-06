import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
export default function App() {
  
  const user = {
    "name": "Manuel",
    "lastname": "Vera",
    "email": "Manuel.vera@alumnos.ucn.cl",
    "city": "Antofagasta",
    "country": "Chile",
    "summary": "Descripción del usuario",
    "frameworks": [
      {
        "id": 1,
        "name": "pyspark",
        "level": "Alto",
        "year": 2022
      },
      {
        "id": 2,
        "name": "sql",
        "level": "Alto",
        "year": 2019
      }
    ],
    "hobbies": [
      {
        "id": 1,
        "name": "wrestling",
        "description": "aguante las luchitas"
      },
      {
        "id": 2,
        "name": "Futbol",
        "description": "aguante el pumita"
      }
    ]
  }

  const FrameworkItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{item.name}</Text>
      <Text>Level: {item.level}</Text>
      <Text>Year: {item.year}</Text>
      {/* Agrega otros campos según tus necesidades para frameworks */}
    </TouchableOpacity>
  );
  
  const HobbieItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{item.name}</Text>
      <Text>Description: {item.description}</Text>
      {/* Agrega otros campos según tus necesidades para hobbies */}
    </TouchableOpacity>
  );

  /*useEffect(() => {
    axios.get('http://localhost:5161/api/Users/profile')
      .then(response => {
        try {
          console.log(response);
          setData(response);
        } catch (error) {
          console.log(error);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);*/


  const [selectedFrameworkId, setSelectedFrameworkId] = useState(null);
  const [selectedHobbieId, setSelectedHobbieId] = useState(null);
  
  

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
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.subHeader}>{user.name + " " + user.lastname + ",\n" + user.city + ", " + user.country}</Text>
      <Text style={{textAlign: "center"}}>{user.summary} </Text>
      <Text style={styles.subHeader}>Habilidades y hobbies</Text>
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

});
