import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icon';
import { TasksContext } from '../contexts/TasksContext';

function Task({ text }) {
  //const [task, setTask] = useContext(TasksContext);

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`${BASE_URL}/todos/${taskId}`);
      setTaskList(taskList.filter((el) => el._id !== taskId));
    } catch (err) {
      console.log(`Error: task not deleted. ${err.message}`);
    }
  };

  // toggle isCompleted, change task
  // preventDefault not needed to toggle isCompleted; change task incl addl funcs inline (below)
  const handleUpdate = async (e, taskId, updatedInfo) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(`/todos/${taskId}`, updatedInfo);
      // map thru state; if id matches updated task, return it. Else return unchanged task. Replace existing task list with updated list.
      const updatedTodos = tasks.map((el) => {
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
    // <View style={styles.item}>
    //   <View style={styles.itemLeft}>
    //     <TouchableOpacity style={styles.square}></TouchableOpacity>
    //     <Text style={styles.itemText}>{text}</Text>
    //   </View>

    //   <View style={styles.circular}></View>
    // </View>

    <View style={styles.item}>
      <View style={[styles.contentGroup, { flexWrap: 'wrap' }]}>
        <View style={styles.circular}></View>
        <Text style={styles.itemText}>{text}</Text>
      </View>

      <View style={styles.contentGroup}>
        <TouchableOpacity
          onPress={() => {
            handleDelete(task._id);
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

export default Task;
