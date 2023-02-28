// In App.js in a new project

import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  SectionList,
  SafeAreaView,
  Button,
  ScrollView,
} from 'react-native';
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
// import RNBootSplash from 'react-native-bootsplash';

import {useState} from 'react';
import {DATA, sectionData} from './data';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useHeaderHeight} from '@react-navigation/elements';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function HomeScreen() {
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);
  const headerHeight = useHeaderHeight();

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setRender(true);
  //   }, 1000);
  // }, []);
  const navigation = useNavigation();

  React.useEffect(() => {
    // @ts-ignore
    const unsubscribe = navigation.addListener('transitionEnd', e => {
      setRender(true);
    });

    return unsubscribe;
  }, [navigation]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setTimeout(() => {
  //       setRender(true);
  //     });
  //   }, []),
  // );

  const insets = useSafeAreaInsets();

  console.log('headerHeight', headerHeight);

  return (
    <View
      style={{
        marginTop: headerHeight,
        flexGrow: 1,
        marginBottom: insets.bottom,
      }}>
      <>
        {/* <ScrollView
        contentInsetAdjustmentBehavior="always"
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor="red"
            progressViewOffset={40}
            onRefresh={async () => {
              // setIsRefreshing(true);
              // // await new Promise(res => {
              // //   setTimeout(() => res(undefined), 10000);
              // // });
              // setIsRefreshing(false);
            }}
          />
        }>
        <Text />
      </ScrollView> */}
        {/* <FlatList
        data={DATA}
        renderItem={({item}) => <Text>{item.title}</Text>}
        // contentInset={{
        //   top: headerHeight,
        // }}
        contentInsetAdjustmentBehavior="always"
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor="red"
            progressViewOffset={40}
            onRefresh={async () => {
              // setIsRefreshing(true);
              // // await new Promise(res => {
              // //   setTimeout(() => res(undefined), 10000);
              // // });
              // setIsRefreshing(false);
            }}
          />
        }
      /> */}

        {render && (
          <SectionList
            sections={sectionData}
            contentInsetAdjustmentBehavior="automatic"
            keyExtractor={(item, index) => item + index}
            initialNumToRender={60}
            maxToRenderPerBatch={60}
            refreshControl={
              <RefreshControl
                tintColor={'black'}
                progressViewOffset={40}
                refreshing={isRefreshing}
                onRefresh={async () => {
                  setIsRefreshing(true);
                  await new Promise(res => {
                    setTimeout(() => res(undefined), 1000);
                  });
                  setIsRefreshing(false);
                }}
                size={100}
              />
            }
            renderItem={({item}) => (
              <View>
                <Text>{item}</Text>
              </View>
            )}
            renderSectionHeader={({section: {title}}) => <Text>{title}</Text>}
          />
        )}

        {/* <FlatList
        data={DATA}
        renderItem={({item}) => <Text>{item.title}</Text>}
        // contentInset={{
        //   top: headerHeight,
        // }}
        contentInsetAdjustmentBehavior="always"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            tintColor="red"
            onRefresh={async () => {
              // setIsRefreshing(true);
              // await new Promise(res => {
              //   setTimeout(() => res(undefined), 10000);
              // });
              // setIsRefreshing(false);
            }}
          />
        }
      /> */}
      </>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function HomeScreen1() {
  const navigation = useNavigation();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{flexGrow: 1, backgroundColor: 'gray'}}>
      <Text>Hello</Text>
      <Button
        onPress={() => {
          // @ts-ignore
          navigation.navigate('Home');
        }}
        title="Home"
      />
    </ScrollView>
  );
}

// const Stack = createStackNavigator();
function App() {
  // React.useEffect(() => {
  //   RNBootSplash.hide({ fade: true, duration: 200 }).catch(e => {
  //     console.error(`Splash error: ${(e as Error).message}`);
  //   });
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{contentStyle: {backgroundColor: 'white'}}}>
        <Stack.Screen
          name="Home1"
          component={HomeScreen1}
          options={{
            headerLargeTitle: true,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLargeTitle: true,
            headerTransparent: true,
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
