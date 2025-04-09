// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../screens/HomeScreen';
// import MyTripScreen from '../screens/MyTripScreen';
// import Where2GoScreen from '../screens/Where2GoScreen';
// import ProfileScreen from '../screens/Profile/ProfileScreen';
// import TalkToUsScreen from '../screens/TalkToUsScreen';
// import Icon from 'react-native-vector-icons/Ionicons';


// const Tab = createBottomTabNavigator();

// export default function BottomTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           switch (route.name) {
//             case 'Home':
//               iconName = focused ? 'home' : 'home-outline';
//               break;
//               case 'My Trip':
//                 iconName = focused ? 'bag-handle' : 'bag-handle-outline';
//                 break;
//             case 'Where2Go':
//               iconName = focused ? 'compass' : 'compass-outline';
//               break;
//             case 'Profile':
//               iconName = focused ? 'person' : 'person-outline';
//               break;
//             case 'Talk To Us':
//               iconName = focused ? 'chatbubble' : 'chatbubble-outline';
//               break;
//           }

//           return <Icon name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#F97316',
//         tabBarInactiveTintColor: 'gray',
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//       <Tab.Screen name="My Trip" component={MyTripScreen} />
//       <Tab.Screen name="Where2Go" component={Where2GoScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//       <Tab.Screen name="Talk To Us" component={TalkToUsScreen} />
//     </Tab.Navigator>
//   );
// }
