import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from './Task';
import {action} from '@storybook/addon-actions';

const changeTaskStatusCallback = action('ChangeTaskStatus clicked')
const changeTaskTitleCallback = action('ChangeTaskTitle clicked')
const removeTaskCallback = action('RemoveTask clicked')

export default {
  title: 'TodoList/Task',
  component: Task,
  //props
  args: {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
  },
  //дополнительная инфа, optional block
  argTypes: {
    addItem: {
      description: 'callback',
    },
  },
} as ComponentMeta<typeof Task>;

const TaskTemplate: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = TaskTemplate.bind({});
TaskIsDoneStory.args = {
  task: {id: '1', isDone: true, title: 'JS'},
  todolistId: 'todo1',
};

export const TaskIsNotDoneStory = TaskTemplate.bind({});
TaskIsNotDoneStory.args = {
  task: {id: '2', isDone: false, title: 'React Native'},
  todolistId: 'todo2',
};