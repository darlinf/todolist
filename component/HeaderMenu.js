import React, {useState} from 'react';
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

export default function HeaderMenu({navigation}) {
  const [darkMode, setDarkMode] = React.useState(true);
  const [selectedLanguage, setSelectedLanguage] = React.useState();
  return (
    <View style={{height: 150, backgroundColor: '#4044C9'}}>
      <View
        style={{
          backgroundColor: '#4044C9',
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
    backgroundColor: '#4044C9',
  },
  header: {
    height: '15%',
    backgroundColor: '#4044C9',
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
                style={{color: '#4044C9', fontWeight: 'bold', fontSize: 16}}>
                Add New
              </Text>
            </TouchableOpacity>
          </View>
        </View>*/
}
