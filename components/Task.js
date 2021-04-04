import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from './Icon';
import { TasksContext } from '../contexts/TasksContext';

const BASE_URL = 'https://rn-todo-list.herokuapp.com';

export default function Task({ item }) {
  const { _id, isCompleted, task } = item;
  const { taskList, setTaskList } = useContext(TasksContext);

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
        `${BASE_URL}/todos/${taskId}`,
        updatedInfo
      );
      // map thru state; if id matches updated task, return it. Else return unchanged task. Replace existing task list with updated list.
      const updatedTodos = taskList.map((el) => {
        if (el._id === taskId) {
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

  return (
    <View style={styles.item}>
      <View style={[styles.contentGroup, { flexWrap: 'wrap' }]}>
        <TouchableOpacity
          onPress={() => handleUpdate(_id, { isCompleted: !isCompleted })}
          style={{ marginRight: 10 }}
        >
          {isCompleted ? (
            <Icon name='check' backgroundColor='#683BB7' />
          ) : (
            <MaterialCommunityIcons
              name='circle-outline'
              color='#683BB7'
              size={30}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.itemText}>{task}</Text>
      </View>

      <View style={styles.contentGroup}>
        <TouchableOpacity
          onPress={() => {
            handleDelete(_id);
          }}
        >
          <Icon name='trash-can-outline' backgroundColor='red' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsEditing(true);
          }}
          style={{ marginLeft: 10 }}
        >
          <Icon name='pencil-outline' backgroundColor='blue' />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexWrap: 'wrap',
  },
  itemText: {
    maxWidth: '80%',
  },
});
