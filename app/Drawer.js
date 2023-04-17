import * as React from 'react';
import { Button, View , StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Favorite from './scenes/dashboard/Favorite';
import DashBoard from './scenes/dashboard/DashBoard';
import { Icon } from 'react-native-elements';
import { BorderlessButton } from 'react-native-gesture-handler';
const Drawer = createDrawerNavigator();
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

export default function DrawerNav() {
    return (

        <Drawer.Navigator initialRouteName="DashBoard" screenOptions={{
            headerStyle,
            headerTitleStyle,
            // headerRight: () => <SearchBtn />,
                    }}>
            <Drawer.Screen name="DashBoard" component={DashBoard} />
            <Drawer.Screen name="Favorite" component={Favorite} />
        </Drawer.Navigator>

    );
}
const styles = StyleSheet.create({
    wrapper: {
        height: 44,
        width: 44 + 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
