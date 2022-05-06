import { Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { View } from 'src/components/common';
import { Callback } from 'src/redux/types';

const TabsBar: React.VFC<Props> = ({ value, onChange, tabsList, buttons }) => {
  return (
    <View isRow justify="space-between" className={`react-mui-tabs`}>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={onChange}
        classes={{
          indicator: `react-mui-tabs-indicator`,
        }}>
        {tabsList.map((tab, index) => {
          return (
            <Tab
              label={tab.label}
              value={tab.value}
              classes={{ root: `react-mui-tabs-tab`, selected: `react-mui-tabs-tab-selected` }}
              key={tab.value}
            />
          );
        })}
      </Tabs>

      {buttons}
    </View>
  );
};

type Props = {
  value: string;
  onChange: Callback;
  tabsList: {
    label: string;
    value: string;
  }[];
  buttons?: React.ReactNode;
};

export default TabsBar;
