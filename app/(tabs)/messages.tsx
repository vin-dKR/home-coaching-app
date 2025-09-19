import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockTeachers } from '../../services/data';
import { Message } from '../../types';
import { Search, MoveVertical as MoreVertical } from 'lucide-react-native';

const mockMessages: Message[] = [
    {
        id: '1',
        senderId: '1',
        receiverId: '2',
        content: 'Hi Dr. Watson! I have a question about the calculus homework.',
        timestamp: '2024-01-19T15:30:00Z',
        read: false,
    },
    {
        id: '2',
        senderId: '2',
        receiverId: '1',
        content: 'Of course! I\'d be happy to help. What specific topic are you struggling with?',
        timestamp: '2024-01-19T15:45:00Z',
        read: true,
    },
];

interface ChatPreview {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    unread: number;
}

export default function MessagesScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const chatPreviews: ChatPreview[] = mockTeachers.map(teacher => ({
        id: teacher.id,
        name: teacher.name,
        avatar: teacher.avatar || '',
        lastMessage: teacher.id === '1'
            ? 'Of course! I\'d be happy to help. What specific topic are you struggling with?'
            : 'Great session today! Don\'t forget to practice those problems.',
        timestamp: teacher.id === '1' ? '2 min ago' : '1 hour ago',
        unread: teacher.id === '1' ? 1 : 0,
    }));

    const filteredChats = chatPreviews.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatTime = (timestamp: string) => {
        // Simple time formatting - in real app would use proper date library
        return timestamp;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Messages</Text>
                <Text style={styles.subtitle}>Connect with your teachers</Text>

                <View style={styles.searchContainer}>
                    <Search size={20} color="#64748b" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {filteredChats.map(chat => (
                    <TouchableOpacity key={chat.id} style={styles.chatPreview}>
                        <View style={styles.avatarContainer}>
                            <Image source={{ uri: chat.avatar }} style={styles.avatar} />
                            {chat.unread > 0 && <View style={styles.unreadDot} />}
                        </View>

                        <View style={styles.chatInfo}>
                            <View style={styles.chatHeader}>
                                <Text style={styles.chatName}>{chat.name}</Text>
                                <Text style={styles.timestamp}>{chat.timestamp}</Text>
                            </View>
                            <View style={styles.messageRow}>
                                <Text
                                    style={[styles.lastMessage, chat.unread > 0 && styles.unreadMessage]}
                                    numberOfLines={2}
                                >
                                    {chat.lastMessage}
                                </Text>
                                {chat.unread > 0 && (
                                    <View style={styles.unreadBadge}>
                                        <Text style={styles.unreadCount}>{chat.unread}</Text>
                                    </View>
                                )}
                            </View>
                        </View>

                        <TouchableOpacity style={styles.moreButton}>
                            <MoreVertical size={20} color="#94a3b8" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))}

                {filteredChats.length === 0 && (
                    <View style={styles.emptyState}>
                        <Search size={48} color="#cbd5e1" />
                        <Text style={styles.emptyStateText}>No conversations found</Text>
                        <Text style={styles.emptyStateSubtext}>
                            {searchQuery
                                ? 'Try adjusting your search terms'
                                : 'Start a conversation with your teachers'
                            }
                        </Text>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 12,
        paddingHorizontal: 16,
    },
    searchIcon: {
        marginRight: 12,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#1e293b',
    },
    content: {
        flex: 1,
    },
    chatPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    unreadDot: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 12,
        height: 12,
        backgroundColor: '#ef4444',
        borderRadius: 6,
        borderWidth: 2,
        borderColor: 'white',
    },
    chatInfo: {
        flex: 1,
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#1e293b',
    },
    timestamp: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#94a3b8',
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastMessage: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#64748b',
        lineHeight: 18,
    },
    unreadMessage: {
        fontFamily: 'Inter-SemiBold',
        color: '#1e293b',
    },
    unreadBadge: {
        backgroundColor: '#3b82f6',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    unreadCount: {
        fontSize: 12,
        fontFamily: 'Inter-Bold',
        color: 'white',
    },
    moreButton: {
        padding: 8,
        marginLeft: 8,
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
});
