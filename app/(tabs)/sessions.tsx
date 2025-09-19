import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockSessions, mockTeachers } from '../../services/data';
import { Session } from '../../types';
import { Calendar, Clock, Video, CircleCheck as CheckCircle, Circle as XCircle, MapPin } from 'lucide-react-native';

const tabs = ['Upcoming', 'Completed', 'Cancelled'];

export default function SessionsScreen() {
    const [activeTab, setActiveTab] = useState('Upcoming');
    const [sessions] = useState<Session[]>(mockSessions);

    const getFilteredSessions = () => {
        switch (activeTab) {
            case 'Upcoming':
                return sessions.filter(s => s.status === 'upcoming');
            case 'Completed':
                return sessions.filter(s => s.status === 'completed');
            case 'Cancelled':
                return sessions.filter(s => s.status === 'cancelled');
            default:
                return sessions;
        }
    };

    const filteredSessions = getFilteredSessions();

    const getStatusIcon = (status: Session['status']) => {
        switch (status) {
            case 'upcoming':
                return <Clock size={16} color="#3b82f6" />;
            case 'completed':
                return <CheckCircle size={16} color="#22c55e" />;
            case 'cancelled':
                return <XCircle size={16} color="#ef4444" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status: Session['status']) => {
        switch (status) {
            case 'upcoming':
                return '#3b82f6';
            case 'completed':
                return '#22c55e';
            case 'cancelled':
                return '#ef4444';
            default:
                return '#64748b';
        }
    };

    const renderSessionCard = (session: Session) => {
        const teacher = mockTeachers.find(t => t.id === session.teacherId);

        return (
            <View key={session.id} style={styles.sessionCard}>
                <View style={styles.sessionHeader}>
                    <Image source={{ uri: teacher?.avatar }} style={styles.teacherAvatar} />
                    <View style={styles.sessionInfo}>
                        <Text style={styles.sessionSubject}>{session.subject}</Text>
                        <Text style={styles.sessionTeacher}>with {teacher?.name}</Text>
                        <View style={styles.sessionMeta}>
                            <Calendar size={14} color="#64748b" />
                            <Text style={styles.metaText}>{session.date}</Text>
                            <Clock size={14} color="#64748b" />
                            <Text style={styles.metaText}>{session.time}</Text>
                        </View>
                    </View>
                    <View style={styles.sessionActions}>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(session.status) + '20' }]}>
                            {getStatusIcon(session.status)}
                            <Text style={[styles.statusText, { color: getStatusColor(session.status) }]}>
                                {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                            </Text>
                        </View>
                        <Text style={styles.sessionPrice}>${session.amount}</Text>
                    </View>
                </View>

                <View style={styles.sessionDetails}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Duration:</Text>
                        <Text style={styles.detailValue}>{session.duration} minutes</Text>
                    </View>
                    {session.meetingLink && (
                        <View style={styles.detailItem}>
                            <Video size={14} color="#64748b" />
                            <Text style={styles.detailValue}>Online Session</Text>
                        </View>
                    )}
                </View>

                {session.status === 'upcoming' && (
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.secondaryButton}>
                            <Text style={styles.secondaryButtonText}>Reschedule</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.primaryButton}>
                            <Video size={16} color="white" />
                            <Text style={styles.primaryButtonText}>Join Session</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {session.status === 'completed' && session.notes && (
                    <View style={styles.notesSection}>
                        <Text style={styles.notesLabel}>Session Notes:</Text>
                        <Text style={styles.notesText}>{session.notes}</Text>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Sessions</Text>
                <Text style={styles.subtitle}>Manage your learning schedule</Text>

                <View style={styles.tabsContainer}>
                    {tabs.map(tab => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.activeTab]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {filteredSessions.length > 0 ? (
                    filteredSessions.map(renderSessionCard)
                ) : (
                    <View style={styles.emptyState}>
                        <Calendar size={48} color="#cbd5e1" />
                        <Text style={styles.emptyStateText}>
                            No {activeTab.toLowerCase()} sessions
                        </Text>
                        <Text style={styles.emptyStateSubtext}>
                            {activeTab === 'Upcoming'
                                ? 'Book a session to get started with learning!'
                                : `You have no ${activeTab.toLowerCase()} sessions yet.`
                            }
                        </Text>
                        {activeTab === 'Upcoming' && (
                            <TouchableOpacity style={styles.bookButton}>
                                <Text style={styles.bookButtonText}>Find Teachers</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
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
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    title: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        color: '#1e293b',
        marginTop: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#64748b',
        marginTop: 4,
        marginBottom: 20,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
    },
    activeTabText: {
        color: '#3b82f6',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    sessionCard: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    sessionHeader: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    teacherAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    sessionInfo: {
        flex: 1,
    },
    sessionSubject: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#1e293b',
    },
    sessionTeacher: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
        marginTop: 2,
    },
    sessionMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 8,
    },
    metaText: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
        marginRight: 12,
    },
    sessionActions: {
        alignItems: 'flex-end',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    statusText: {
        fontSize: 12,
        fontFamily: 'Inter-SemiBold',
    },
    sessionPrice: {
        fontSize: 16,
        fontFamily: 'Inter-Bold',
        color: '#22c55e',
    },
    sessionDetails: {
        flexDirection: 'row',
        gap: 20,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    detailLabel: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
    },
    detailValue: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: '#1e293b',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    secondaryButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d1d5db',
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: '#64748b',
    },
    primaryButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#3b82f6',
    },
    primaryButtonText: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: 'white',
    },
    notesSection: {
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
    },
    notesLabel: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: '#1e293b',
        marginBottom: 8,
    },
    notesText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#64748b',
        lineHeight: 20,
    },
    emptyState: {
        alignItems: 'center',
        padding: 40,
        marginTop: 40,
    },
    emptyStateText: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: '#64748b',
        marginTop: 16,
    },
    emptyStateSubtext: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#94a3b8',
        textAlign: 'center',
        marginTop: 8,
        lineHeight: 20,
    },
    bookButton: {
        backgroundColor: '#3b82f6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    bookButtonText: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: 'white',
    },
});
