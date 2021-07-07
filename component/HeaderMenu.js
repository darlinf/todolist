import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';

import HeaderMenuContext from '../context/HeaderMenu/HeaderMenuContext';

import COLOR from '../constants/theme';

const routeShow = elem => {
  if (elem === 'home')
    return (
      <View style={{width: 150, top: -15}}>
        <SelectDropdown
          renderDropdownIcon={() => {
            return (
              <Image
                source={require('../assets/down-arrow.png')}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                  tintColor: COLOR.primary,
                  position: 'absolute',
                  left: 10,
                }}
              />
            );
          }}
          defaultButtonText="Default"
          dropdownStyle={{height: 250}}
          data={['Default', 'Personal', 'Shopping', 'Wishlist', 'Word']}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
      </View>
    );
  if (elem === 'create note')
    return (
      <Text style={{color: 'white', fontSize: 24, top: -7}}>Create task</Text>
    );
};

export default function HeaderMenu({navigation}) {
  const [darkMode, setDarkMode] = React.useState(true);
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  const headerMenuContext = useContext(HeaderMenuContext);
  return (
    <View style={{height: 150, backgroundColor: COLOR.primary}}>
      <View
        style={{
          backgroundColor: COLOR.primary,
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 50,
          height: '65%',
        }}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <View
                style={{
                  width: 16,
                  height: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/menu.png')}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                  }}
                />
              </View>
            </TouchableOpacity>
            {/*<Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>

            <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
              5 May
            </Text>*/}
            {routeShow(headerMenuContext.HeaderMenuShow)}
            <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
              <View
                style={{
                  width: 16,
                  height: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {!darkMode && (
                  <Image
                    source={require('../assets/dark-mode.png')}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: 'white',
                    }}
                  />
                )}
                {darkMode && (
                  <Image
                    source={require('../assets/day-mode.png')}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: 'white',
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderTopStartRadius: 50,
          height: '35%',
        }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.primary,
  },
  header: {
    height: '15%',
    backgroundColor: COLOR.primary,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50,
  },
  body: {
    height: '85%',
    backgroundColor: 'white',
    borderTopStartRadius: 50,
  },
  newTask: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50%',
  },
});

const headerMenu = navigation => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}>
        <View
          style={{
            width: 16,
            height: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/menu.png')}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: 'white',
            }}
          />
        </View>
      </TouchableOpacity>
      {/*<Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>*/}

      <Text style={{color: 'white', textAlign: 'center', fontSize: 16}}>
        5 May
      </Text>
      <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
        <View
          style={{
            width: 16,
            height: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {!darkMode && (
            <Image
              source={require('../assets/dark-mode.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: 'white',
              }}
            />
          )}
          {darkMode && (
            <Image
              source={require('../assets/day-mode.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor: 'white',
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

{
  /*
        <View style={styles.newTask}>
          <View>
            <Text style={{fontSize: 26, color: 'white'}}>Today</Text>
            <Text style={{color: 'white', opacity: 0.8}}>8 task</Text>
          </View>
          <View>
            <TouchableOpacity
              style={{
                borderRadius: 13,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                height: 50,
                width: 120,
              }}
              onPress={() => console.log(navigation.navigate('CreateTask'))}>
              <Text
                style={{color: COLOR.primary, fontWeight: 'bold', fontSize: 16}}>
                Add New
              </Text>
            </TouchableOpacity>
          </View>
        </View>*/
}
