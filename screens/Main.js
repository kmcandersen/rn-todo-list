import React, { useContext, useEffect, useState } from 'react';
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
import defaultStyles from '../config/styles';
import Task from '../components/Task';

import { TasksContext } from '../contexts/TasksContext';

const BASE_URL = 'https://rn-todo-list.herokuapp.com';

export default function Main() {
  const { taskList, setTaskList } = useContext(TasksContext);
  const [inputTask, setInputTask] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/todos`);
        // console.log(data);
        setTaskList(data);
      } catch (err) {
        console.log(`Error: tasks not fetched. ${err.message}`);
      }
    };
    fetchTasks();
  }, [setTaskList]);

  const handleAddTask = async () => {
    Keyboard.dismiss();
    try {
      const { data } = await axios.post(`${BASE_URL}/todos`, {
        task: inputTask,
      });
      // add to Context state the new task returned from route
      setTaskList([...taskList, data]);
      setInputTask('');
    } catch (err) {
      console.log(`Error: task not added. ${err.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>To-Done List</Text>
        {/* LIST OF TASKS */}
        {taskList.length && (
          <View style={styles.tasks}>
            {taskList.map((item) => (
              <Task item={item} key={item._id} />
            ))}
          </View>
        )}
      </View>
      {/* ADD TASK */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.addTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder='Write a task'
          // value must be a string, not obj
          value={inputTask}
          onChangeText={(text) => setInputTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addButtonWrapper}>
            <MaterialCommunityIcons
              name='plus'
              size={40}
              color={defaultStyles.add}
            />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.background,
  },
  addButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: defaultStyles.white,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  input: {
    backgroundColor: defaultStyles.white,
    borderColor: defaultStyles.border,
    borderRadius: 60,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: 250,
    fontSize: 18,
  },
  addTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: defaultStyles.titleFontSize,
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
