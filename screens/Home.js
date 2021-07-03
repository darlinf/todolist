import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const task = taskState => {
  if (taskState === 'done')
    return (
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <Text
          style={{
            transform: [{rotate: '-90deg'}],
            color: '#C6C6C1',
            left: 12,
          }}>
          2 hours
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
            <View
              style={{
                borderRadius: 5,
                backgroundColor: '#4044C9',
                height: 20,
                width: 20,
              }}></View>
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
            <Text style={{color: 'black'}}>Buy a pack of coffee</Text>
            <Text style={{color: '#C6C6C1'}}>10:30 - 11:00</Text>
          </View>
        </View>
      </View>
    );
  if (taskState === 'current')
    return (
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <Text
          style={{
            transform: [{rotate: '-90deg'}],
            color: '#C6C6C1',
            left: 12,
          }}>
          2 hours
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 13,
            padding: 15,
            width: 200,
            backgroundColor: '#4044C9',
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
            <Text style={{color: 'white'}}>Buy a pack of coffee</Text>
            <Text style={{color: '#E3E3E3', opacity: 0.8}}>10:30 - 11:00</Text>
          </View>
        </View>
      </View>
    );
  if (taskState === 'still')
    return (
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <Text
          style={{
            transform: [{rotate: '-90deg'}],
            color: '#C6C6C1',
            left: 12,
          }}>
          2 hours
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
                backgroundColor: '#4044C9',
                borderRadius: 5,
                zIndex: 2,
                position: 'relative',
                top: -5,
                left: 13,
                height: 10,
                width: 10,
              }}></View>
          </View>
          <View>
            <Text style={{color: 'black', fontWeight: 'bold'}}>
              Buy a pack of coffee
            </Text>
            <Text style={{color: '#C6C6C1'}}>10:30 - 11:00</Text>
          </View>
        </View>
      </View>
    );
};

const headerMenu = navigation => {
  const [darkMode, setDarkMode] = React.useState(true);
  const [selectedLanguage, setSelectedLanguage] = React.useState();
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

const bodyContentToday = () => {
  return (
    <View>
      <View style={{flexDirection: 'row', marginBottom: 30}}>
        <View
          style={{
            backgroundColor: '#4044C9',
            marginRight: 30,
            borderRadius: 13,
            height: 70,
            width: 70,
            justifyContent: 'center',
          }}>
          <View>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 26}}>
              5
            </Text>
            <Text style={{color: 'white', textAlign: 'center', opacity: 0.8}}>
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

        <ScrollView style={{height: 380, width: 285}}>
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

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
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
    backgroundColor: '#4044C9',
  },
  header: {
    height: '15%',
    backgroundColor: '#4044C9',
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
    justifyContent: 'center',*/

/*react-native run-android*/
