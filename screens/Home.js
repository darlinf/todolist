import {StatusBar} from 'expo-status-bar';
import React, {useContext, useEffect} from 'react';
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

let isOnScreenNavbar = true;

let Tasks = {
  task: '',
  taskState: '',
  timeStart: '',
  timeEnd: '',
  alartRepeat: '',
};

const timeConvert = n => {
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

  console.log(headerMenuContext.taskType);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      headerMenuContext.homePage();
      console.log('sddd');

      setLoading(true);
      db.getTasks(elems => {
        setTasks(elems);
        setLoading(false);
        console.log(tasks);
      });
    });
    return unsubscribe;
  }, [navigation]);

  /*
  useEffect(() => {
    db.getTasks(elems => {
      setTasks(elems);
    });
  }, []);*/

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

  const task = () => {
    return tasks.map(elem => {
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
                  10:30 - 11:00, {elem.typeTask}
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
                  10:30 - 11:00
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
                  <Text style={{color: '#C6C6C1'}}>10:30 - 11:00</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        );
    });
  };

  const filterTask = () => {
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
                    10:30 - 11:00, {elem.typeTask}
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
                    10:30 - 11:00
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
                    <Text style={{color: '#C6C6C1'}}>10:30 - 11:00</Text>
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
              {/*tasks.map(elem => {
                if (!isNaN(parseInt(elem.timeEnd))) {
                  console.log(elem.timeEnd);
                  return parseInt(elem.timeEnd);
                }
              })*/}
              {headerMenuContext.taskType} 8 hours a day
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
            style={{height: isOnScreenNavbar ? 380 : 450, width: 285}}>
            {headerMenuContext.taskType === 'Default' && task()}
            {headerMenuContext.taskType !== 'Default' && filterTask()}

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          borderRadius: 15,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLOR.primary,
          height: 55,
          width: 55,
          top: isOnScreenNavbar ? 448 : 495,
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
              {bodyContentAnotherDay()}
              {bodyContentAnotherDay()}
              {bodyContentAnotherDay()}
              {bodyContentAnotherDay()}
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
