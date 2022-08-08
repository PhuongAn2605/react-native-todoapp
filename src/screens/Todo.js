import React, {useEffect, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet, FlatList, Text, Image, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import PlusIcon from '../assets/ic_blue_plus.png';
import {useDispatch, useSelector} from 'react-redux';
import {setTaskID, setTasks} from '../redux/action';
import GlobalStyle from '../utils/GlobalStyle';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Todo = ({navigation}) => {
  const [filteredTask, setFilteredTask] = useState([]);
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTasks();
    });
  }, []);

  const getTasks = () => {
    AsyncStorage.getItem('Tasks')
      .then(tasks => {
        const parsedTasks = JSON.parse(tasks);
        if (parsedTasks && typeof parsedTasks === 'object') {
          dispatch(setTasks(parsedTasks));
          setFilteredTask(parsedTasks.filter(task => task.Done === false));
        }
      })
      .catch(err => console.log(err));
  };

  const deleteTask = id => {
    const filteredTasks = tasks.filter(task => task.ID !== id);
    AsyncStorage.setItem('Tasks', JSON.stringify(filteredTasks))
      .then(() => {
        dispatch(setTasks(filteredTasks));
        setFilteredTask(filteredTasks.filter(task => task.Done === false));
        Alert.alert('Success!', 'Task removed successfully.');
      })
      .catch(err => console.log(err));
  };

  const checkTask = (id, newValue) => {
    const index = tasks.findIndex(task => task.ID === id);
    if (index > -1) {
      let newTasks = [...tasks];
      newTasks[index].Done = newValue;
      AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
        .then(() => {
          dispatch(setTasks(newTasks));
          setFilteredTask(newTasks.filter(task => task.Done === false));
          Alert.alert('Success!', 'Task state is changed');
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <View style={styles.body}>
      <FlatList
        data={filteredTask}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              dispatch(setTaskID(item.ID));
              navigation.navigate('Task');
            }}>
            <View style={styles.item_row}>
              <View
                style={[
                  {
                    backgroundColor:
                      item.Color === 'red'
                        ? '#f28b82'
                        : item.Color === 'blue'
                        ? '#aecbfa'
                        : item.Color === 'green'
                        ? '#ccff90'
                        : '#ffffff',
                  },
                  styles.color,
                ]}
              />
              <CheckBox
                value={item.Done}
                onValueChange={newValue => {
                  checkTask(item.ID, newValue);
                }}
              />
              <View style={styles.item_body}>
                <Text
                  style={[GlobalStyle.CustomFontHW, styles.title]}
                  numberOfLines={1}>
                  {item.Title}
                </Text>
                <Text
                  style={[GlobalStyle.CustomFontHW, styles.subtitle]}
                  numberOfLine={1}>
                  {item.Desc}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => {
                  deleteTask(item.ID);
                }}>
                <FontAwesome5 name={'trash'} size={25} color={'#ff3636'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(setTaskID(tasks.length + 1));
          navigation.navigate('Task');
        }}>
        <FontAwesome5 name={'plus'} size={20} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    marginLeft: 'auto',
    // top: 20,
    bottom: 10,
    right: 10,
    elevation: 5,
  },
  item_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_body: {
    flex: 1,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingRight: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#000000',
    fontSize: 30,
    margin: 5,
  },
  subtitle: {
    color: '#999999',
    fontSize: 20,
    margin: 5,
  },
  color: {
    width: 20,
    height: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
