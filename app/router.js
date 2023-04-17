import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';
import { BorderlessButton } from 'react-native-gesture-handler';
import {
    NavigationContainer,

} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// IMPORT SCENES
import DashBoardScreen from './scenes/dashboard/DashBoard';
import ArticlesScreen from './scenes/dashboard/Articles';
import ArticleScreen from './scenes/dashboard/Article';
import SearchScreen from './scenes/dashboard/Search';
import Drawer from './Drawer';

// ROUTES CONFIG ====================================================

let font = Platform.OS === 'ios' ? 'HelveticaNeue' : 'Roboto';
let size = Platform.OS === 'ios' ? 24 : 25;
let titleColor = '#363434';
let iconColor = '#808689';

// Nav Header Styles
let headerStyle = { backgroundColor: '#fff' };
let headerTitleStyle = {
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: font,
    color: titleColor,
};

// Nav Buttons
let SearchBtn = () => (
    <BorderlessButton style={styles.wrapper}>
        <Icon type={`ionicon`} name={'md-search'} size={size} color={iconColor} />
    </BorderlessButton>
);

// ROUTES STACK ====================================================

const Stack = createStackNavigator();

const Router = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Drawer"
            screenOptions={{
              headerShown:false,
                        }}
        >
            <Stack.Screen name="Drawer" component={Drawer} />
            <Stack.Screen name="Articles"   options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                }} component={ArticlesScreen} />
            <Stack.Screen name="Article" component={ArticleScreen}   options={{
                    headerShown: true,
                    headerBackTitleVisible: false,
                }} />
            <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

// STYLES ====================================================

const styles = StyleSheet.create({
    wrapper: {
        height: 44,
        width: 44 + 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Router;
