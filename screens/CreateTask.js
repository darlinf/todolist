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

export default function CreateTask({navigation}) {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [showPopUp, setShowPopUp] = useState(false);

  const [dateT, setDateT] = useState(null);
  const [time, setTime] = useState(null);

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
            width: '90%',
            height: 70,
            backgroundColor: '#bebebe',
            top: 350,
            left: 50,
            position: 'absolute',
          }}>
          <Text style={{textAlign: 'center', fontSize: 20}}>Task created</Text>
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
          top: 448,
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
      <Text style={{textAlign: 'center', fontSize: 20}}>Create Task</Text>
      <View style={{marginTop: 20}}>
        <Text>What is to be done?</Text>
        <TextInput
          style={{
            borderRadius: 13,
            backgroundColor: '#bebebe',
            color: 'black',
            fontSize: 20,
            height: 50,
          }}
        />
      </View>
      <View>
        <View
          style={{
            marginTop: 20,
            marginBottom: 20,
            flexDirection: 'row-reverse',
          }}>
          {/*date picker*/}
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
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row-reverse',
          }}>
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
    </View>
  );
}
