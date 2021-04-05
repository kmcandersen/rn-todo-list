import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Icon from './Icon';
import { TasksContext } from '../contexts/TasksContext';

const BASE_URL = 'https://rn-todo-list.herokuapp.com';

export default function Task({ item }) {
  const { _id, isCompleted, task } = item;

  const { taskList, setTaskList } = useContext(TasksContext);
  const [inputTask, setInputTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/todos/${taskId}`);
      setTaskList(taskList.filter((el) => el._id !== taskId));
    } catch (err) {
      console.log(`Error: task not deleted. ${err.message}`);
    }
  };

  // toggle isCompleted, change task
  // change task incl addl funcs inline (below)
  const handleUpdate = async (taskId, updatedInfo) => {
    console.log(taskId, updatedInfo);
    try {
      const { data } = await axios.patch(
        `${BASE_URL}/todos/${_id}`,
        updatedInfo
      );
      // map thru state; if id matches updated task, return it. Else return unchanged task. Replace existing task list with updated list.
      const updatedTodos = taskList.map((el) => {
        if (el._id === _id) {
          return data;
        } else {
          return el;
        }
      });
      setTaskList(updatedTodos);
    } catch (err) {
      console.log(`Error: task not changed. ${err.message}`);
    }
  };

  if (!isEditing) {
    return (
      <View style={styles.item}>
        <View style={[styles.contentGroup, { flexWrap: 'wrap' }]}>
          <TouchableOpacity
            onPress={() => handleUpdate(_id, { isCompleted: !isCompleted })}
            style={{ marginRight: 12 }}
          >
            {isCompleted ? (
              <Icon name='check' backgroundColor='#683BB7' />
            ) : (
              <FontAwesome name='circle-thin' size={34} color='#683BB7' />
            )}
          </TouchableOpacity>
          <Text style={styles.itemText}>{task}</Text>
        </View>
        <View style={styles.contentGroup}>
          <TouchableOpacity
            onPress={() => {
              handleDelete(_id);
            }}
            style={styles.alignIcons}
          >
            <View style={{ position: 'absolute' }}>
              <Icon name='trash-can-outline' iconColor='red' />
            </View>

            <FontAwesome name='circle-thin' size={36} color='red' />
          </TouchableOpacity>

          {!isCompleted && (
            <TouchableOpacity
              onPress={() => {
                setIsEditing(true);
              }}
              style={[styles.alignIcons, { marginLeft: 10 }]}
            >
              <View style={{ position: 'absolute' }}>
                <Icon name='pencil-outline' iconColor='blue' />
              </View>
              <FontAwesome name='circle-thin' size={36} color='blue' />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.item}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.contentGroup}
        >
          <TextInput
            style={styles.editInput}
            placeholder={task}
            // value must be a string, not obj
            value={inputTask}
            onChangeText={(text) => setInputTask(text)}
          />

          <View>
            <TouchableOpacity
              onPress={() => {
                handleUpdate(_id, { task: inputTask });
                setInputTask('');
                setIsEditing(false);
              }}
              style={{ marginLeft: 10 }}
            >
              <Icon name='pencil-outline' backgroundColor='blue' />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  alignIcons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editInput: {
    borderColor: '#C0C0C0',
    borderRadius: 60,
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flex: 1,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemText: {
    fontSize: 18,
    maxWidth: '80%',
  },
});
