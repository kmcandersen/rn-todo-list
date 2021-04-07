import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import defaultStyles from '../config/styles';
import Header from '../components/Header';
import Task from '../components/Task';

import { EditContext } from '../contexts/EditContext';
import { ShowContext } from '../contexts/ShowContext';
import { TasksContext } from '../contexts/TasksContext';

const BASE_URL = 'https://rn-todo-list.herokuapp.com';

export default function Main() {
  const { editItem, setEditItem } = useContext(EditContext);
  const { showAll } = useContext(ShowContext);
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
      if (inputTask) {
        const { data } = await axios.post(`${BASE_URL}/todos`, {
          task: inputTask,
        });
        // add to Context state the new task returned from route
        setTaskList([...taskList, data]);
      }
      setInputTask('');
    } catch (err) {
      console.log(`Error: task not added. ${err.message}`);
    }
  };

  const calcActiveTasks = (taskList) =>
    taskList.filter((el) => !el.isCompleted);

  // won't run until tasks fetched from db
  const activeTasks = taskList.length && calcActiveTasks(taskList);

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Header />
        <ScrollView>
          {/* LIST OF TASKS */}
          <View style={styles.tasks}>
            {taskList.length &&
              (!showAll
                ? activeTasks.map((item) => <Task item={item} key={item._id} />)
                : taskList.map((item) => <Task item={item} key={item._id} />))}
          </View>
        </ScrollView>
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
          onFocus={() => setEditItem('')}
          maxLength={2}
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
    marginLeft: 20,
  },
  input: {
    backgroundColor: defaultStyles.white,
    borderColor: defaultStyles.border,
    borderRadius: 60,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flex: 1,
    // width: '100%',
    fontSize: 18,
  },
  addTaskWrapper: {
    backgroundColor: defaultStyles.background,
    borderTopColor: defaultStyles.border,
    borderTopWidth: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 60,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  tasks: {
    marginTop: 10,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingBottom: 100,
    paddingHorizontal: 20,
    flex: 1,
  },
});
