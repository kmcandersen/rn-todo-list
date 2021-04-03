import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Task from './components/Task';

const BASE_URL = 'https://rn-todo-list.herokuapp.com';

export default function App() {
  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/todos`);
        setTaskList(data);
      } catch (err) {
        console.log(`Error: tasks not fetched. ${err.message}`);
      }
    };
    fetchTasks();
  }, [setTaskList]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskList([...taskList, task]);
    setTask('');
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/todos/${taskId}`);
      setTaskList(taskList.filter((el) => el._id !== taskId));
    } catch (err) {
      console.log(`Error: task not deleted. ${err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>To-Done List</Text>
        {/* LIST OF TASKS */}
        <View style={styles.tasks}>
          {taskList.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => handleRemoveTask(item._id)}
            >
              <Task text={item.task} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* ADD TASK */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.rightTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder='Write a task'
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <MaterialCommunityIcons name='plus' size={40} color='#683BB7' />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAED',
  },
  addWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#C0C0C0',
    borderRadius: 60,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: 250,
  },
  rightTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tasks: {
    marginTop: 30,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
});
