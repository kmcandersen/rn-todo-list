import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import defaultStyles from '../config/styles';
import { EditContext } from '../contexts/EditContext';
import { TasksContext } from '../contexts/TasksContext';

const BASE_URL = 'https://rn-todo-list.herokuapp.com';

function AddTask() {
  const { setEditItem } = useContext(EditContext);
  const { taskList, setTaskList } = useContext(TasksContext);
  const [inputTask, setInputTask] = useState('');

  const handleAddTask = async () => {
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
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={() => {
          inputTask && handleAddTask();
        }}
      >
        <View style={styles.addButtonWrapper}>
          <MaterialCommunityIcons
            name='plus'
            size={40}
            color={defaultStyles.add}
          />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // so AddTask input rises with keyboard:
    position: 'absolute',
    bottom: 60,
  },
});

export default AddTask;
