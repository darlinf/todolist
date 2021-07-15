/*import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Button, Menu, Divider, Provider} from 'react-native-paper';

export default function Contact() {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider style={{with: 10}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={{top: 0}}
          anchor={<Button onPress={openMenu}>Show menu</Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </View>
    </Provider>
  );
}
*/

import React, {useRef} from 'react';

import {View, Text, StyleSheet} from 'react-native';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

/**
 * Note:
 * This demo uses latest version of expo with react hooks support.
 * You can read about hooks at https://reactjs.org/docs/hooks-intro.html
 */

function Contact() {
  const menu = useRef();
  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();

  return (
    <View>
      <Menu ref={menu} button={<Text onPress={showMenu}>Show menu</Text>}>
        <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
        <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
        <MenuItem onPress={hideMenu} disabled>
          Menu item 3
        </MenuItem>
        <MenuDivider />
        <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Contact;
