import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { mockSessions, mockTeachers } from '../../services/data';
import { Calendar, Clock, Star, BookOpen, Users, TrendingUp } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const { user } = useAuth();
    const router = useRouter();
    const upcomingSessions = mockSessions.filter(s => s.status === 'upcoming').slice(0, 2);
    const featuredTeachers = mockTeachers.slice(0, 3);

    const StudentDashboard = () => (
        <>
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <BookOpen size={24} color="#3b82f6" />
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Sessions Completed</Text>
                </View>
                <View style={styles.statCard}>
                    <Users size={24} color="#22c55e" />
                    <Text style={styles.statNumber}>3</Text>
                    <Text style={styles.statLabel}>Active Teachers</Text>
                </View>
            </View>

            {upcomingSessions.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
                    {upcomingSessions.map(session => {
                        const teacher = mockTeachers.find(t => t.id === session.teacherId);
                        return (
                            <TouchableOpacity key={session.id} style={styles.sessionCard}>
                                <Image source={{ uri: teacher?.avatar }} style={styles.teacherAvatar} />
                                <View style={styles.sessionInfo}>
                                    <Text style={styles.sessionSubject}>{session.subject}</Text>
                                    <Text style={styles.sessionTeacher}>with {teacher?.name}</Text>
                                    <View style={styles.sessionTime}>
                                        <Calendar size={14} color="#64748b" />
                                        <Text style={styles.sessionTimeText}>{session.date}</Text>
                                        <Clock size={14} color="#64748b" />
                                        <Text style={styles.sessionTimeText}>{session.time}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Featured Teachers</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.teachersList}>
                        {featuredTeachers.map(teacher => (
                            <TouchableOpacity key={teacher.id} style={styles.teacherCard}>
                                <Image source={{ uri: teacher.avatar }} style={styles.teacherImage} />
                                <Text style={styles.teacherName}>{teacher.name}</Text>
                                <Text style={styles.teacherSubject}>{teacher.subjects[0]}</Text>
                                <View style={styles.teacherRating}>
                                    <Star size={12} color="#f59e0b" />
                                    <Text style={styles.ratingText}>{teacher.rating}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </>
    );

    const TeacherDashboard = () => (
        <>
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <Users size={24} color="#3b82f6" />
                    <Text style={styles.statNumber}>89</Text>
                    <Text style={styles.statLabel}>Total Students</Text>
                </View>
                <View style={styles.statCard}>
                    <BookOpen size={24} color="#22c55e" />
                    <Text style={styles.statNumber}>234</Text>
                    <Text style={styles.statLabel}>Sessions Taught</Text>
                </View>
                <View style={styles.statCard}>
                    <TrendingUp size={24} color="#f59e0b" />
                    <Text style={styles.statNumber}>$2,340</Text>
                    <Text style={styles.statLabel}>This Month</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Today's Sessions</Text>
                <View style={styles.emptyState}>
                    <Calendar size={48} color="#cbd5e1" />
                    <Text style={styles.emptyStateText}>No sessions scheduled for today</Text>
                    <Text style={styles.emptyStateSubtext}>Enjoy your free time!</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActions}>
                    <TouchableOpacity style={styles.actionButton}>
                        <Calendar size={20} color="white" />
                        <Text style={styles.actionButtonText}>View Schedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Users size={20} color="white" />
                        <Text style={styles.actionButtonText}>Manage Students</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#3b82f6', '#1d4ed8']}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.greeting}>
                            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 18 ? 'Afternoon' : 'Evening'}!
                        </Text>
                        <Text style={styles.userName}>{user?.name}</Text>
                    </View>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                        <Image
                            source={{ uri: user?.avatar }}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {user?.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />}
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
        paddingBottom: 24,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: 'rgba(255,255,255,0.8)',
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: 'white',
        marginTop: 4,
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: 'white',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    statNumber: {
        fontSize: 24,
        fontFamily: 'Inter-Bold',
        color: '#1e293b',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
        textAlign: 'center',
        marginTop: 4,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: '#1e293b',
        marginBottom: 16,
    },
    sessionCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    teacherAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 12,
    },
    sessionInfo: {
        flex: 1,
    },
    sessionSubject: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#1e293b',
    },
    sessionTeacher: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#64748b',
        marginTop: 2,
    },
    sessionTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 8,
    },
    sessionTimeText: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
        marginRight: 12,
    },
    teachersList: {
        flexDirection: 'row',
        gap: 16,
    },
    teacherCard: {
        width: 140,
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    teacherImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 8,
    },
    teacherName: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: '#1e293b',
        textAlign: 'center',
    },
    teacherSubject: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#64748b',
        marginTop: 2,
    },
    teacherRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    ratingText: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        color: '#f59e0b',
    },
    emptyState: {
        alignItems: 'center',
        padding: 40,
        backgroundColor: 'white',
        borderRadius: 12,
    },
    emptyStateText: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
        marginTop: 16,
    },
    emptyStateSubtext: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#94a3b8',
        marginTop: 4,
    },
    quickActions: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#3b82f6',
        padding: 16,
        borderRadius: 12,
    },
    actionButtonText: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: 'white',
    },
});
