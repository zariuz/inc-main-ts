import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';

export default {
  title: 'TodoList/AddItemForm',
  component: AddItemForm,
  //дополнительная инфа, optional block
  argTypes: {
    callback: {
      description: 'callback',
    },
  },
} as ComponentMeta<typeof AddItemForm>;

const AddItemFormTemplate: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = AddItemFormTemplate.bind({});
AddItemFormStory.args = {
  callback: action('Button clicked'),
};