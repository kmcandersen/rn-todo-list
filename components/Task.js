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
import Icon from './Icon';
import IconOutline from './IconOutline';
import defaultStyles from '../config/styles';
import { EditContext } from '../contexts/EditContext';
import { TasksContext } from '../contexts/TasksContext';

const BASE_URL = 'https://rn-todo-list.herokuapp.com';

export default function Task({ item }) {
  const { _id, isCompleted, task } = item;
  // console.log('item', item);

  const { editItem, setEditItem } = useContext(EditContext);
  const { taskList, setTaskList } = useContext(TasksContext);
  const [inputTask, setInputTask] = useState('');

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
    try {
      if (updatedInfo.task) {
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
      }
      setEditItem('');
    } catch (err) {
      console.log(`Error: task not changed. ${err.message}`);
    }
  };

  if (editItem !== _id) {
    return (
      <View style={styles.item}>
        <View style={[styles.contentGroup, { flexWrap: 'wrap' }]}>
          <TouchableOpacity
            onPress={() => handleUpdate(_id, { isCompleted: !isCompleted })}
            style={{ marginRight: 12 }}
          >
            {isCompleted ? (
              <Icon name='check' backgroundColor={defaultStyles.check} />
            ) : (
              <IconOutline size={30} iconColor={defaultStyles.check} />
            )}
          </TouchableOpacity>
          <Text style={styles.itemText}>{task}</Text>
        </View>
        <View style={styles.contentGroup}>
          <TouchableOpacity
            onPress={() => {
              handleDelete(_id);
              setEditItem('');
            }}
            style={styles.alignIcons}
          >
            <View style={{ position: 'absolute' }}>
              <Icon name='trash-can-outline' iconColor={defaultStyles.delete} />
            </View>
            <IconOutline iconColor={defaultStyles.delete} />
          </TouchableOpacity>

          {!isCompleted && (
            <TouchableOpacity
              onPress={() => {
                setEditItem('');
                setEditItem(_id);
              }}
              style={[styles.alignIcons, { marginLeft: 10 }]}
            >
              <View style={{ position: 'absolute' }}>
                <Icon name='pencil-outline' iconColor={defaultStyles.edit} />
              </View>
              <IconOutline iconColor={defaultStyles.edit} />
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
                setEditItem('');
              }}
              style={{ marginLeft: 15 }}
            >
              <Icon
                name='pencil-outline'
                backgroundColor={defaultStyles.edit}
              />
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
    borderColor: defaultStyles.border,
    borderRadius: 60,
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flex: 1,
  },
  item: {
    backgroundColor: defaultStyles.white,
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemText: {
    fontSize: defaultStyles.itemFontSize,
    maxWidth: '80%',
  },
});
