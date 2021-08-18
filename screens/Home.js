import {StatusBar} from 'expo-status-bar';
import React, {useContext, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import db from '../database/db';
import {LinearProgress} from 'react-native-elements';

import HeaderMenuContext from '../context/HeaderMenu/HeaderMenuContext';
import COLOR from '../constants/theme';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import SelectDropdown from 'react-native-select-dropdown';

let isOnScreenNavbar = true;

let Tasks = {
  task: '',
  taskState: '',
  timeStart: '',
  timeEnd: '',
  alartRepeat: '',
};

const getCurrentDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = String(today.getFullYear());
  return {months: mm, day: dd, year: yyyy};
};

const timeConvert = n => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = '' + Math.round(minutes);
  if (rhours !== 0) {
    return (
      rhours + ':' + (rminutes.length == 1 ? '0' + rminutes : rminutes) + ' hrs'
    );
  } else {
    return rminutes + ' min';
  }
};

const timeConvertTotalSum = n => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = '' + Math.round(minutes);
  if (rhours !== 0) {
    return (
      rhours +
      ':' +
      (rminutes.length == 1 ? '0' + rminutes : rminutes) +
      ' hours'
    );
  } else {
    return rminutes + ' minutes';
  }
};

const isCurrentTask = elem => {
  let timeToStart = parseFloat(elem.timeStart.slice(0, 5).replace(':', '.'));
  let timeToFinish = parseFloat(
    sumMinutes(elem.timeStart.slice(0, 5), elem.timeEnd).replace(':', '.'),
  );
  let d = new Date(); // for now
  let currentTime = parseFloat(d.getHours() + '.' + d.getMinutes());
  return currentTime >= timeToStart && currentTime <= timeToFinish;
};

const sumMinutes = (timeInHour, minutesToSum) => {
  var timeParts = timeInHour.split(':');
  var hoursInMinutes = Number(timeParts[0]) * 60 + Number(timeParts[1]);
  var totalTimeInMin = parseInt(hoursInMinutes) + parseInt(minutesToSum);
  var minutesConvert = (totalTimeInMin % 60) + '';
  var minutesConvertResurt =
    minutesConvert.length == 1 ? '0' + minutesConvert : minutesConvert;
  var resurt = Math.floor(totalTimeInMin / 60) + ':' + minutesConvertResurt;
  return resurt;
};

export default function Home({navigation}) {
  let deviceHeight = Dimensions.get('screen').height;
  let windowHeight = Dimensions.get('window').height;
  let bottomNavBarHeight = deviceHeight - windowHeight;
  if (!bottomNavBarHeight > 0) {
    isOnScreenNavbar = false;
  }

  const [show, setShow] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const headerMenuContext = useContext(HeaderMenuContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      headerMenuContext.homePage();
      setLoading(true);
      db.getTasks(elems => {
        setTasks(elems);
        setLoading(false);
        headerMenuContext.filterTaskByType('Default');

        filterItemByDate(elems);
      });
    });
    return unsubscribe;
  }, [navigation]);

  const months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };

  const today = new Date();
  const currentDay = parseInt(String(today.getDate()).padStart(2, '0'));
  const currentMonths = months[
    parseInt(String(today.getMonth() + 1).padStart(2, '0'))
  ].slice(0, 3); //January is 0!

  const menu = useRef();
  const hideMenu = () => menu.current.hide();
  const showMenu = () => menu.current.show();
  const [darkMode, setDarkMode] = React.useState(true);

  const currentDate = getCurrentDate();
  const [todayTask, setTodayTask] = React.useState([]);

  const filterItemByDate = items => {
    setTodayTask(
      items.filter(item => {
        let day = item.date.slice(8, 10);
        let year = item.date.slice(11, 15);
        let month = item.date.slice(4, 7);
        return (
          currentDate.day == day &&
          months[parseInt(currentDate.months)].slice(0, 3) == month &&
          currentDate.year == year
        );
      }),
    );
    console.log(todayTask, 'ss');
  };

  const task = tasks => {
    return tasks.map(elem => {
      if (isCurrentTask(elem)) elem.taskState = 'current';

      if (elem.taskState === 'done')
        return (
          <View
            key={elem.task_id}
            style={{flexDirection: 'row', marginBottom: 20}}>
            <Text
              style={{
                transform: [{rotate: '-90deg'}],
                color: '#C6C6C1',
                left: 12,
              }}>
              {timeConvert(elem.timeEnd)}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderRadius: 13,
                padding: 15,
                width: 200,
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginRight: 10,
                  height: 40,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    db.editTask(
                      () => {
                        setLoading(true);
                        db.getTasks(elems => {
                          setLoading(false);
                          setTasks(elems);
                        });
                      },
                      {...elem, taskState: 'still'},
                      //db.deleteTask(elem.task_id);
                    );
                  }}>
                  <View
                    style={{
                      borderRadius: 5,
                      backgroundColor: COLOR.primary,
                      height: 20,
                      width: 20,
                    }}></View>
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: 'white',
                    zIndex: 2,
                    position: 'relative',
                    top: -11,
                    left: 7,
                    height: 2,
                    width: 10,
                    transform: [{rotate: '-45deg'}],
                  }}></View>
                <View
                  style={{
                    backgroundColor: 'white',
                    zIndex: 2,
                    position: 'relative',
                    top: -11,
                    left: 5,
                    height: 2,
                    width: 5,
                    transform: [{rotate: '45deg'}],
                  }}></View>
              </View>
              <View>
                <Text style={{color: 'black'}}>{elem.task}</Text>
                <Text style={{color: '#C6C6C1'}}>
                  {elem.timeStart.slice(0, 5)} -{' '}
                  {sumMinutes(elem.timeStart.slice(0, 5), elem.timeEnd)},{' '}
                  {elem.typeTask}
                </Text>
              </View>
            </View>
          </View>
        );
      if (elem.taskState === 'current')
        return (
          <View
            key={elem.task_id}
            style={{flexDirection: 'row', marginBottom: 20}}>
            <Text
              style={{
                transform: [{rotate: '-90deg'}],
                color: '#C6C6C1',
                left: 12,
              }}>
              {timeConvert(elem.timeEnd)}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderRadius: 13,
                padding: 15,
                width: 200,
                backgroundColor: COLOR.primary,
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginRight: 10,
                  height: 40,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    opacity: 0.6,
                    borderRadius: 5,
                    borderColor: 'white',
                    height: 20,
                    width: 20,
                  }}></View>
                <View
                  style={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    zIndex: -1,
                    position: 'relative',
                    top: -5,
                    left: 13,
                    height: 10,
                    width: 10,
                  }}></View>
              </View>
              <View>
                <Text style={{color: 'white'}}>{elem.task}</Text>
                <Text style={{color: '#E3E3E3', opacity: 0.8}}>
                  {elem.timeStart.slice(0, 5)} -{' '}
                  {sumMinutes(elem.timeStart.slice(0, 5), elem.timeEnd)},{' '}
                  {elem.typeTask}
                </Text>
              </View>
            </View>
          </View>
        );
      if (elem.taskState === 'still')
        return (
          <View
            key={elem.task_id}
            style={{flexDirection: 'row', marginBottom: 20}}>
            <Text
              style={{
                transform: [{rotate: '-90deg'}],
                color: '#C6C6C1',
                left: 12,
              }}>
              {timeConvert(elem.timeEnd)}
            </Text>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                borderRadius: 13,
                padding: 15,
                width: 200,
              }}>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginRight: 10,
                  height: 40,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setLoading(true);
                    db.editTask(
                      () => {
                        setLoading(false);
                        db.getTasks(elems => {
                          setTasks(elems);
                        });
                      },
                      {...elem, taskState: 'done'},
                    );
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      opacity: 0.9,
                      borderRadius: 5,
                      borderColor: '#C6C6C1',
                      height: 20,
                      width: 20,
                    }}></View>

                  <View
                    style={{
                      backgroundColor: COLOR.primary,
                      borderRadius: 5,
                      zIndex: 2,
                      position: 'relative',
                      top: -5,
                      left: 13,
                      height: 10,
                      width: 10,
                    }}></View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={{paddingRight: 70}}
                onPress={() => {
                  navigation.navigate('EditTask', elem);
                }}>
                <View>
                  <Text style={{color: 'black', fontWeight: 'bold'}}>
                    {elem.task}
                  </Text>
                  <Text style={{color: '#C6C6C1'}}>
                    {elem.timeStart.slice(0, 5)} -{' '}
                    {sumMinutes(elem.timeStart.slice(0, 5), elem.timeEnd)},{' '}
                    {elem.typeTask}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
    });
  };

  const filterTask = tasks => {
    return tasks.map(elem => {
      if (headerMenuContext.taskType === elem.typeTask) {
        if (elem.taskState === 'done')
          return (
            <View
              key={elem.task_id}
              style={{flexDirection: 'row', marginBottom: 20}}>
              <Text
                style={{
                  transform: [{rotate: '-90deg'}],
                  color: '#C6C6C1',
                  left: 12,
                }}>
                {timeConvert(elem.timeEnd)}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: 13,
                  padding: 15,
                  width: 200,
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: 10,
                    height: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      db.editTask(
                        () => {
                          setLoading(true);
                          db.getTasks(elems => {
                            setLoading(false);
                            setTasks(elems);
                          });
                        },
                        {...elem, taskState: 'still'},
                      );
                    }}>
                    <View
                      style={{
                        borderRadius: 5,
                        backgroundColor: COLOR.primary,
                        height: 20,
                        width: 20,
                      }}></View>
                  </TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: 'white',
                      zIndex: 2,
                      position: 'relative',
                      top: -11,
                      left: 7,
                      height: 2,
                      width: 10,
                      transform: [{rotate: '-45deg'}],
                    }}></View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      zIndex: 2,
                      position: 'relative',
                      top: -11,
                      left: 5,
                      height: 2,
                      width: 5,
                      transform: [{rotate: '45deg'}],
                    }}></View>
                </View>
                <View>
                  <Text style={{color: 'black'}}>{elem.task}</Text>
                  <Text style={{color: '#C6C6C1'}}>
                    {elem.timeStart.slice(0, 5)} -{' '}
                    {sumMinutes(elem.timeStart.slice(0, 5), elem.timeEnd)},{' '}
                    {elem.typeTask}
                  </Text>
                </View>
              </View>
            </View>
          );
        if (elem.taskState === 'current')
          return (
            <View
              key={elem.task_id}
              style={{flexDirection: 'row', marginBottom: 20}}>
              <Text
                style={{
                  transform: [{rotate: '-90deg'}],
                  color: '#C6C6C1',
                  left: 12,
                }}>
                {timeConvert(elem.timeEnd)}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: 13,
                  padding: 15,
                  width: 200,
                  backgroundColor: COLOR.primary,
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: 10,
                    height: 40,
                  }}>
                  <View
                    style={{
                      borderWidth: 1,
                      opacity: 0.6,
                      borderRadius: 5,
                      borderColor: 'white',
                      height: 20,
                      width: 20,
                    }}></View>
                  <View
                    style={{
                      backgroundColor: 'white',
                      borderRadius: 5,
                      zIndex: -1,
                      position: 'relative',
                      top: -5,
                      left: 13,
                      height: 10,
                      width: 10,
                    }}></View>
                </View>
                <View>
                  <Text style={{color: 'white'}}>{elem.task}</Text>
                  <Text style={{color: '#E3E3E3', opacity: 0.8}}>
                    {elem.timeStart.slice(0, 5)} -{' '}
                    {sumMinutes(elem.timeStart.slice(0, 5), elem.timeEnd)},{' '}
                    {elem.typeTask}
                  </Text>
                </View>
              </View>
            </View>
          );
        if (elem.taskState === 'still')
          return (
            <View
              key={elem.task_id}
              style={{flexDirection: 'row', marginBottom: 20}}>
              <Text
                style={{
                  transform: [{rotate: '-90deg'}],
                  color: '#C6C6C1',
                  left: 12,
                }}>
                {timeConvert(elem.timeEnd)}
              </Text>

              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: 13,
                  padding: 15,
                  width: 200,
                }}>
                <View
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginRight: 10,
                    height: 40,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setLoading(true);
                      db.editTask(
                        () => {
                          setLoading(false);
                          db.getTasks(elems => {
                            setTasks(elems);
                          });
                        },
                        {...elem, taskState: 'done'},
                      );
                    }}>
                    <View
                      style={{
                        borderWidth: 1,
                        opacity: 0.9,
                        borderRadius: 5,
                        borderColor: '#C6C6C1',
                        height: 20,
                        width: 20,
                      }}></View>

                    <View
                      style={{
                        backgroundColor: COLOR.primary,
                        borderRadius: 5,
                        zIndex: 2,
                        position: 'relative',
                        top: -5,
                        left: 13,
                        height: 10,
                        width: 10,
                      }}></View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{paddingRight: 70}}
                  onPress={() => {
                    navigation.navigate('EditTask', elem);
                  }}>
                  <View>
                    <Text style={{color: 'black', fontWeight: 'bold'}}>
                      {elem.task}
                    </Text>
                    <Text style={{color: '#C6C6C1'}}>
                      {elem.timeStart.slice(0, 5)} -{' '}
                      {sumMinutes(elem.timeStart.slice(0, 5), elem.timeEnd)},{' '}
                      {elem.typeTask}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
      }
    });
  };

  const bodyContentToday = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <View
            style={{
              backgroundColor: COLOR.primary,
              marginRight: 30,
              borderRadius: 13,
              height: 70,
              width: 70,
              justifyContent: 'center',
            }}>
            <View>
              <Text style={{color: 'white', textAlign: 'center', fontSize: 26}}>
                {currentDay}
              </Text>
              <Text style={{color: 'white', textAlign: 'center', opacity: 0.8}}>
                {currentMonths}
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', height: 70}}>
            <Text style={{color: '#535353'}}>
              {/*timeConvertTotalSum(
                tasks
                  .map(elem => {
                    if (!isNaN(parseInt(elem.timeEnd))) {
                      console.log(elem.timeEnd);
                      return parseInt(elem.timeEnd);
                    }
                  })
                  .reduce((total, sum) => total + sum),
                )*/}{' '}
              a day
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          {/*Task state done, current, still*/}
          {loading && (
            <LinearProgress
              style={{position: 'absolute', width: 280, left: 5}}
              color="primary"
            />
          )}
          <ScrollView
            style={{height: isOnScreenNavbar ? 400 : 600, width: 285}}>
            {headerMenuContext.taskType === 'Default' && task(todayTask)}
            {headerMenuContext.taskType !== 'Default' && filterTask(todayTask)}

            {/*{task('current')}
                {task('still')}
                {task('still')}
                {task('still')}
                {task('still')}
                {task('still')}
                {task('still')}
                {task('still')}
              {task('still')}*/}
          </ScrollView>

          <View
            style={{
              marginLeft: 50,
              height: '100%',
              width: 1,
              backgroundColor: '#E3E3E3',
              left: -50,
            }}></View>
        </View>
      </View>
    );
  };

  const bodyContentAnotherDay = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', marginBottom: 30}}>
          <View
            style={{
              backgroundColor: '#E3E3E3',
              marginRight: 30,
              borderRadius: 13,
              height: 70,
              width: 70,
              justifyContent: 'center',
            }}>
            <View>
              <Text
                style={{fontWeight: '900', textAlign: 'center', fontSize: 26}}>
                5
              </Text>
              <Text
                style={{
                  color: '#535353',
                  textAlign: 'center',
                  opacity: 0.8,
                }}>
                Man
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center', height: 70}}>
            <Text style={{color: '#535353'}}>8 hours a day</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          {/*Task state done, current, still*/}

          <ScrollView style={{height: 330, width: 285}}>
            {task('done')}
            {task('current')}
            {task('still')}
            {task('still')}
            {task('still')}
            {task('still')}
            {task('still')}
            {task('still')}
            {task('still')}
            {task('still')}
          </ScrollView>

          <View
            style={{
              marginLeft: 50,
              height: '100%',
              width: 1,
              backgroundColor: '#E3E3E3',
              left: -50,
            }}></View>
        </View>
      </View>
    );
  };

  const headerMenu = () => {
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
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Menu
                  ref={menu}
                  button={
                    <TouchableOpacity
                      onPress={() => {
                        showMenu();
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
                  }>
                  <MenuItem onPress={hideMenu}>Themes</MenuItem>
                  <MenuItem onPress={hideMenu}>Remove Ads</MenuItem>
                  <MenuItem onPress={hideMenu} disabled>
                    Menu item 3
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onPress={() => {
                      hideMenu();
                      navigation.navigate('Contact');
                    }}>
                    Menu item 4
                  </MenuItem>
                </Menu>
              </View>

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
                  dropdownStyle={{height: 250, borderRadius: 5}}
                  data={['Default', 'Personal', 'Shopping', 'Wishlist', 'Word']}
                  onSelect={(selectedItem, index) => {
                    //console.log(selectedItem, index);
                    headerMenuContext.filterTaskByType(selectedItem);
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
  };

  return (
    <View style={styles.container}>
      {headerMenu()}
      <TouchableOpacity
        style={{
          borderRadius: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLOR.primary,
          height: 55,
          width: 55,
          top: isOnScreenNavbar ? 598 : 645,
          left: 350,
          position: 'absolute',
          zIndex: 1,
        }}
        onPress={() => console.log(navigation.navigate('CreateTask'))}>
        <Image
          source={require('../assets/add.png')}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
            tintColor: 'white',
          }}
        />
      </TouchableOpacity>

      <View style={styles.body}>
        <View style={{height: '100%', marginLeft: 30, marginRight: 0}}>
          <View style={{flexDirection: 'row'}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}>
              {bodyContentToday()}
              {/*{bodyContentAnotherDay()}
              {bodyContentAnotherDay()}
              {bodyContentAnotherDay()}
              {bodyContentAnotherDay()}*/}
            </ScrollView>
          </View>
        </View>
      </View>
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
    marginLeft: 30,
    marginRight: 30,
    paddingTop: 50,
  },
  body: {
    height: '100%',
    backgroundColor: 'white',
  },
  newTask: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50%',
  },
});

/*flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
    
    */
/**{/*touch*
<View
style={{
  flexDirection: 'row',
  position: 'absolute',
  left: 46,
  zIndex: 2,
  height: 70,
  width: 200,
}}>
<TouchableOpacity
  style={{height: '100%', width: '22%'}}
  onPress={() => {
    console.log('dddd2');
  }}></TouchableOpacity>

<TouchableOpacity
  style={{
    height: '100%',
    width: '78%',
  }}
  onPress={() => {
    navigation.navigate('CreateTask');
  }}></TouchableOpacity>
</View> */
/*react-native run-android
npx react-native run-android

*/
