import React from 'react';
import { Tabs } from 'expo-router';
import { Chrome as Home, Search, Calendar, MessageCircle, User } from 'lucide-react-native';
import { useAuth } from '../../context/AuthContext';

export default function TabLayout() {
    const { user } = useAuth();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: '#64748b',
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderTopColor: '#e2e8f0',
                    paddingTop: 8,
                    height: 88,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontFamily: 'Inter-Medium',
                    marginTop: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ size, color }) => <Home size={size} color={color} />,
                }}
            />

            {user?.role === 'student' && (
                <Tabs.Screen
                    name="search"
                    options={{
                        title: 'Find Teachers',
                        tabBarIcon: ({ size, color }) => <Search size={size} color={color} />,
                    }}
                />
            )}

            <Tabs.Screen
                name="sessions"
                options={{
                    title: 'Sessions',
                    tabBarIcon: ({ size, color }) => <Calendar size={size} color={color} />,
                }}
            />

            <Tabs.Screen
                name="messages"
                options={{
                    title: 'Messages',
                    tabBarIcon: ({ size, color }) => <MessageCircle size={size} color={color} />,
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ size, color }) => <User size={size} color={color} />,
                }}
            />
        </Tabs>
    );
}
