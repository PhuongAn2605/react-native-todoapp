import React, {useEffect, useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {setTaskID, setTasks} from '../redux/action';
import CustomButton from '../utils/CustomButton';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Done from './Done';

const Task = ({navigation}) => {
  const {tasks, taskID} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState('white');
  const [done, setDone] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTasks();
    });
  }, []);

  const getTasks = () => {
    const Task = tasks.find(task => task.ID === taskID);
    if (Task) {
      console.log('123 getTasks');
      setTitle(Task.Title);
      setDesc(Task.Desc);
      setDone(Task.Done);
      setColor(Task.Color);
    }
  };

  const handleSetTasks = () => {
    if (title.length === 0) {
      Alert.alert('Warning!', 'Please write your task title.');
    } else {
      try {
        let taskValue = {
          ID: taskID,
          Title: title,
          Desc: desc,
          Done: done,
          Color: color,
          //   Image: image,
        };
        const index = tasks.findIndex(task => task.ID === taskID);
        let newTasks = [];
        if (index > -1) {
          newTasks = [...tasks];
          newTasks[index] = taskValue;
        } else {
          newTasks = [...tasks, taskValue];
        }
        AsyncStorage.setItem('Tasks', JSON.stringify(newTasks))
          .then(() => {
            dispatch(setTasks(newTasks));
            Alert.alert('Success!', 'Task saved successfully!');
            navigation.goBack();
          })
          .catch(err => console.log(err));
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <View style={styles.body}>
      <TextInput
        value={title}
        style={styles.input}
        placeholder="Title"
        onChangeText={value => setTitle(value)}
      />
      <TextInput
        value={desc}
        style={styles.input}
        placeholder="Description"
        onChangeText={value => setDesc(value)}
      />
      <View style={styles.color_bar}>
        <TouchableOpacity
          style={styles.color_white}
          onPress={() => {
            setColor('white');
          }}>
          {color === 'white' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_red}
          onPress={() => {
            setColor('red');
          }}>
          {color === 'red' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_blue}
          onPress={() => {
            setColor('blue');
          }}>
          {color === 'blue' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.color_green}
          onPress={() => {
            setColor('green');
          }}>
          {color === 'green' && (
            <FontAwesome5 name={'check'} size={25} color={'#000000'} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.checkbox}>
        <CheckBox value={done} onValueChange={newValue => setDone(newValue)} />
        <Text style={styles.text}>Is Done</Text>
      </View>
      <CustomButton
        title="Save Task"
        color="#1eb900"
        style={{width: '100%'}}
        onPressFunction={handleSetTasks}
      />
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    flexDirection: 'row',
    margin: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 20,
    color: '#000000',
  },
  color_bar: {
    flexDirection: 'row',
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#555555',
    marginVertical: 10,
  },
  color_white: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  color_red: {
    flex: 1,
    backgroundColor: '#f28b82',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_blue: {
    flex: 1,
    backgroundColor: '#aecbfa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  color_green: {
    flex: 1,
    backgroundColor: '#ccff90',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  extra_row: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  extra_button: {
    flex: 1,
    height: 50,
    backgroundColor: '#0080ff',
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered_view: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_modal: {
    width: 300,
    height: 200,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  bell_body: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_buttons: {
    flexDirection: 'row',
    height: 50,
  },
  bell_input: {
    width: 50,
    borderWidth: 1,
    borderColor: '#555555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  bell_cancel_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bell_ok_button: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000000',
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    margin: 20,
  },
  delete: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#ffffff80',
    margin: 10,
    borderRadius: 5,
  },
});
