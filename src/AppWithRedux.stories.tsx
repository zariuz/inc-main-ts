import React from 'react';
import {ComponentMeta, Story} from '@storybook/react';
import {AppWithRedux} from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/ReduxStoreProviderDecorator';

export default {
  title: 'TodoList/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof AppWithRedux>;

const AppWithReduxTemplate: Story = () => <AppWithRedux/>

export const AppWithReduxStory = AppWithReduxTemplate.bind({});
