import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';


const onChangeCallback = action('onChangeCallback clicked')

export default {
  title: 'TodoList/EditableSpan',
  component: EditableSpan,
  //props
  args: {
    onChange: onChangeCallback,
  },
  //дополнительная инфа, optional block
  argTypes: {
    callback: {
      description: 'callback',
    },
    value: {
      defaultValue: 'I wait for doubleClick',
      description: 'Start value',
    },
  },
} as ComponentMeta<typeof EditableSpan>;

const EditableSpanTemplate: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = EditableSpanTemplate.bind({});
EditableSpanStory.args = {
  callback: action('onChangeCallback is clicked'),
};

