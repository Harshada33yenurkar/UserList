import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserListScreen from "./screen/userlist";
import UserDetailScreen from "./screen/detail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{ title: "Users" }}
        />
        <Stack.Screen
          name="detail"
          component={UserDetailScreen}
          options={{ title: "User Detail" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}