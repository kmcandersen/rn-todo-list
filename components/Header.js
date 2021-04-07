import React, { useContext } from 'react';
import defaultStyles from '../config/styles';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TasksContext } from '../contexts/TasksContext';
import { ShowContext } from '../contexts/ShowContext';

function Header() {
  const { taskList, setTaskList } = useContext(TasksContext);
  const { showAll, sortList } = useContext(ShowContext);

  const calcActiveTasks = (taskList) =>
    taskList.filter((el) => !el.isCompleted);

  // won't run until tasks fetched from db
  const calcTaskTotals = (taskList) => {
    const taskPlural = (num) => (num === 1 ? 'task' : 'tasks');

    const activeTotal = calcActiveTasks(taskList).length;
    const completedTotal = taskList.length - activeTotal;

    const taskFormat = {
      active: `${activeTotal} active ${taskPlural(activeTotal)}`,
      completed: `${completedTotal} completed ${taskPlural(activeTotal)}`,
    };

    return taskFormat;
  };

  const taskTotals = taskList.length && calcTaskTotals(taskList);

  return (
    <>
      {taskList.length && (
        <View>
          <Text style={styles.title}>To-Done List</Text>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.subTitle}>
                {`${taskTotals.active}  |  ${taskTotals.completed}`}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                style={styles.toggleCompletedWrapper}
                onPress={() => sortList(taskList)}
              >
                <View>
                  {!showAll ? (
                    <MaterialCommunityIcons
                      name='check'
                      size={30}
                      color={defaultStyles.light}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name='check'
                      size={30}
                      color={defaultStyles.black}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  toggleCompletedWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: defaultStyles.white,
    borderRadius: 30,
    width: 40,
    height: 40,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // borderWidth: 1,
    // borderColor: 'red',
    top: -12,
    marginBottom: 10,
  },
  subTitle: {
    alignItems: 'center',
    color: defaultStyles.dark,
    marginTop: 10,
  },
  title: {
    fontSize: defaultStyles.titleFontSize,
    fontWeight: 'bold',
  },
});

export default Header;
