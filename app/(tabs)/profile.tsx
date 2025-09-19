import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import { Settings, CreditCard as Edit, Star, BookOpen, Users, Award, LogOut, Bell, CircleHelp as HelpCircle, Shield, ChevronRight } from 'lucide-react-native';

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                        router.replace('/auth');
                    },
                },
            ]
        );
    };

    const menuItems = [
        { icon: Edit, label: 'Edit Profile', onPress: () => { } },
        { icon: Bell, label: 'Notifications', onPress: () => { } },
        { icon: Shield, label: 'Privacy & Security', onPress: () => { } },
        { icon: HelpCircle, label: 'Help & Support', onPress: () => { } },
        { icon: Settings, label: 'Settings', onPress: () => { } },
    ];

    const StudentStats = () => (
        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <BookOpen size={24} color="#3b82f6" />
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statItem}>
                <Users size={24} color="#22c55e" />
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Teachers</Text>
            </View>
            <View style={styles.statItem}>
                <Award size={24} color="#f59e0b" />
                <Text style={styles.statNumber}>4.8</Text>
                <Text style={styles.statLabel}>Rating</Text>
            </View>
        </View>
    );

    const TeacherStats = () => (
        <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <Users size={24} color="#3b82f6" />
                <Text style={styles.statNumber}>89</Text>
                <Text style={styles.statLabel}>Students</Text>
            </View>
            <View style={styles.statItem}>
                <BookOpen size={24} color="#22c55e" />
                <Text style={styles.statNumber}>234</Text>
                <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statItem}>
                <Star size={24} color="#f59e0b" />
                <Text style={styles.statNumber}>4.9</Text>
                <Text style={styles.statLabel}>Rating</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={['#3b82f6', '#1d4ed8']}
                    style={styles.header}
                >
                    <View style={styles.profileSection}>
                        <Image
                            source={{ uri: user?.avatar }}
                            style={styles.profileImage}
                        />
                        <Text style={styles.userName}>{user?.name}</Text>
                        <Text style={styles.userRole}>
                            {user?.role === 'student' ? 'Student' : 'Teacher'}
                        </Text>
                        <Text style={styles.userEmail}>{user?.email}</Text>
                    </View>
                </LinearGradient>

                <View style={styles.content}>
                    {user?.role === 'student' ? <StudentStats /> : <TeacherStats />}

                    <View style={styles.menuSection}>
                        <Text style={styles.sectionTitle}>Account</Text>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                onPress={item.onPress}
                            >
                                <View style={styles.menuItemLeft}>
                                    <item.icon size={20} color="#64748b" />
                                    <Text style={styles.menuItemText}>{item.label}</Text>
                                </View>
                                <ChevronRight size={16} color="#cbd5e1" />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {user?.role === 'teacher' && (
                        <View style={styles.menuSection}>
                            <Text style={styles.sectionTitle}>Teaching</Text>
                            <TouchableOpacity style={styles.menuItem}>
                                <View style={styles.menuItemLeft}>
                                    <BookOpen size={20} color="#64748b" />
                                    <Text style={styles.menuItemText}>My Subjects</Text>
                                </View>
                                <ChevronRight size={16} color="#cbd5e1" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.menuItem}>
                                <View style={styles.menuItemLeft}>
                                    <Users size={20} color="#64748b" />
                                    <Text style={styles.menuItemText}>My Students</Text>
                                </View>
                                <ChevronRight size={16} color="#cbd5e1" />
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                    >
                        <LogOut size={20} color="#ef4444" />
                        <Text style={styles.logoutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    profileSection: {
        alignItems: 'center',
        paddingTop: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 16,
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: 'white',
        marginBottom: 4,
    },
    userRole: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: 'rgba(255,255,255,0.9)',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    userEmail: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: 'rgba(255,255,255,0.8)',
    },
    content: {
        padding: 24,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: '#1e293b',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
        marginTop: 4,
    },
    menuSection: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#1e293b',
        marginBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    menuItemText: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#1e293b',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        backgroundColor: 'white',
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#fee2e2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    logoutText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#ef4444',
    },
});
