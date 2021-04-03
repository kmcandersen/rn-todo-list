import React, { useState } from 'react';
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

export default function App() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState(['Walk cat', 'Pet pig']);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskList([...taskList, task]);
    setTask('');
  };

  const completeTask = (taskIdx) => {
    let taskListCopy = [...taskList];
    taskListCopy.splice(taskIdx, 1);
    setTaskList(taskListCopy);
  };

  return (
    <View style={styles.container}>
      {/* today's tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.title}>Today's Tasks</Text>

        <View style={styles.tasks}>
          {taskList.map((task, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={task} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* add task */}
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
