import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
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

  return (
    <View style={styles.item}>
      <View style={[styles.contentGroup, { flexWrap: 'wrap' }]}>
        <View style={styles.circular}></View>
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
  circular: {
    width: 30,
    height: 30,
    borderColor: '#683BB7',
    borderWidth: 5,
    borderRadius: 15,
    marginRight: 10,
  },
  container: {},
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
