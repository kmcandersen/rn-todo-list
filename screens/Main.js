import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import defaultStyles from '../config/styles';
import Header from '../components/Header';
import AddTask from '../components/AddTask';
import Task from '../components/Task';

import { ShowTaskContext } from '../contexts/ShowTaskContext';
import { ShowAddContext } from '../contexts/ShowAddContext';
import { TasksContext } from '../contexts/TasksContext';

const BASE_URL = 'https://rn-todo-list.herokuapp.com';

export default function Main() {
  const { showAll } = useContext(ShowTaskContext);
  const { showAddItem } = useContext(ShowAddContext);
  const { taskList, setTaskList } = useContext(TasksContext);

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

  const calcActiveTasks = (taskList) =>
    taskList.filter((el) => !el.isCompleted);

  // won't run until tasks fetched from db
  const activeTasks = taskList.length && calcActiveTasks(taskList);

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Header />
        {/* LIST OF TASKS */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView style={styles.tasks}>
            {taskList.length &&
              (!showAll
                ? activeTasks.map((item) => <Task item={item} key={item._id} />)
                : taskList.map((item) => <Task item={item} key={item._id} />))}
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      {showAddItem && <AddTask />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.background,
  },

  tasks: {
    marginTop: 10,
  },
  tasksWrapper: {
    height: '75%',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
});
