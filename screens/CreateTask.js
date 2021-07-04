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
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';

let isOnScreenNavbar = true;

export default function CreateTask({navigation}) {
  let deviceHeight = Dimensions.get('screen').height;
  let windowHeight = Dimensions.get('window').height;
  let bottomNavBarHeight = deviceHeight - windowHeight;
  if (!bottomNavBarHeight > 0) {
    isOnScreenNavbar = false;
  }

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [showPopUp, setShowPopUp] = useState(false);

  const [dateT, setDateT] = useState(null);
  const [time, setTime] = useState(null);

  const countries = ['Default', 'Personal', 'Shopping', 'Wishlist', 'Word'];

  const popUpEnable = () => {
    setShowPopUp(true);
    setDateT(null);
    setTime(null);
    setTimeout(() => {
      setShowPopUp(false);
    }, 2000);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(mode);
    if (mode === 'time') setTime(date.toString().slice(16, 24));
    if (mode === 'date') setDateT(date.toString().slice(0, 16));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View
      style={{
        paddingLeft: 30,
        paddingRight: 30,
        backgroundColor: '#FFFFFF',
        height: '100%',
        width: '100%',
      }}>
      {showPopUp && (
        <View
          style={{
            width: '80%',
            height: 50,
            backgroundColor: '#EBF7EE',
            position: 'absolute',
            top: isOnScreenNavbar ? 450 : 497,
            left: 49,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#c0ebcb',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              lineHeight: 50,
              fontSize: 20,
            }}>
            Task created
          </Text>
          <View
            style={{
              height: 20,
              width: 20,
              backgroundColor: '#EBF7EE',
              position: 'absolute',
              top: 14,
              left: 267,
              transform: [{rotate: '45deg'}],
              borderTopRightRadius: 2,
              borderWidth: 1,
              borderColor: '#c0ebcb',
              borderBottomWidth: 0,
              borderLeftWidth: 0,
            }}></View>
        </View>
      )}

      <TouchableOpacity
        style={{
          borderRadius: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#4044C9',
          height: 55,
          width: 55,
          top: isOnScreenNavbar ? 448 : 495,
          left: 350,
          position: 'absolute',
          zIndex: 1,
        }}
        onPress={popUpEnable}>
        <Image
          source={require('../assets/floppy-disk.png')}
          resizeMode="contain"
          style={{
            width: 30,
            height: 30,
            tintColor: 'white',
          }}
        />
      </TouchableOpacity>
      {/*<Text style={{textAlign: 'center', fontSize: 20}}>Create Task</Text> */}
      <View>
        <Text>What is to be done?</Text>
        <TextInput
          style={{
            borderRadius: 13,
            backgroundColor: '#bebebe',
            color: 'black',
            fontSize: 20,
            height: 50,
            marginBottom: 20,
          }}
        />
      </View>
      {/*date picker*/}
      <View>
        <Text>Date picker</Text>
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row-reverse',
          }}>
          <TouchableOpacity style={{flex: 1}} onPress={showDatepicker}>
            <View
              style={{
                height: 50,
                backgroundColor: '#bebebe',
                borderRadius: 13,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
              }}>
              <Text style={{fontSize: 20}}> {dateT}</Text>
              <Image
                source={require('../assets/calendar.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'white',
                }}
              />
            </View>
          </TouchableOpacity>
          {dateT && (
            <TouchableOpacity
              style={{marginRight: 5}}
              onPress={() => {
                setDateT(null);
              }}>
              <View
                style={{
                  height: 50,
                  backgroundColor: '#bebebe',
                  borderRadius: 13,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../assets/close.png')}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: 'white',
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
        {/*Time picker*/}
        {dateT && (
          <View>
            <Text>Time picker</Text>
            <View
              style={{
                marginBottom: 20,
                flexDirection: 'row-reverse',
              }}>
              {time && (
                <TextInput
                  style={{
                    borderRadius: 13,
                    backgroundColor: '#bebebe',
                    color: 'black',
                    fontSize: 20,
                    height: 50,
                    width: 50,
                    marginLeft: 5,
                    textAlign: 'center',
                  }}
                  value="45"
                />
              )}
              <TouchableOpacity style={{flex: 1}} onPress={showTimepicker}>
                <View
                  style={{
                    height: 50,
                    backgroundColor: '#bebebe',
                    borderRadius: 13,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Text style={{fontSize: 20}}>{time}</Text>
                  <Image
                    source={require('../assets/wall-clock.png')}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: 'white',
                    }}
                  />
                </View>
              </TouchableOpacity>
              {time && (
                <TouchableOpacity
                  style={{marginRight: 5}}
                  onPress={() => {
                    setTime(null);
                  }}>
                  <View
                    style={{
                      height: 50,
                      backgroundColor: '#bebebe',
                      borderRadius: 13,
                      width: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={require('../assets/close.png')}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: 'white',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      {/**/}
      {time && (
        <View style={{marginBottom: 20}}>
          <Text>Repaet</Text>
          <SelectDropdown
            renderDropdownIcon={() => {
              return (
                <Image
                  source={require('../assets/up-arrow.png')}
                  resizeMode="contain"
                  style={{
                    width: 15,
                    height: 15,
                    tintColor: 'white',
                    position: 'absolute',
                    left: 10,
                  }}
                />
              );
            }}
            defaultButtonText="No repeat"
            dropdownStyle={{height: 350}}
            data={[
              'No repeat',
              'Once a day',
              'Once a day (Mon-Fri)',
              'Once a week',
              'Once a month',
              'Once a year',
              'Other...',
            ]}
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
      )}
      <View>
        <Text>Add to list</Text>
        <SelectDropdown
          renderDropdownIcon={() => {
            return (
              <Image
                source={require('../assets/up-arrow.png')}
                resizeMode="contain"
                style={{
                  width: 15,
                  height: 15,
                  tintColor: 'white',
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
    </View>
  );
}
