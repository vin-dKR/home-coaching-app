import React, { useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockTeachers } from '../../services/data';
import { Teacher } from '../../types';
import { Search, Filter, Star, MapPin, Clock, DollarSign } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature', 'Writing'];

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [teachers] = useState<Teacher[]>(mockTeachers);
    const router = useRouter();

    const filteredTeachers = teachers.filter(teacher => {
        const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            teacher.subjects.some(subject =>
                subject.toLowerCase().includes(searchQuery.toLowerCase())
            );
        const matchesSubject = selectedSubject === 'All' ||
            teacher.subjects.includes(selectedSubject);
        return matchesSearch && matchesSubject;
    });

    const handleBookSession = (teacher: Teacher) => {
        // Navigate to booking screen (would be implemented)
        console.log('Book session with', teacher.name);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Find Teachers</Text>
                <Text style={styles.subtitle}>Discover expert educators for your learning journey</Text>

                <View style={styles.searchContainer}>
                    <Search size={20} color="#64748b" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search teachers or subjects..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.subjectsContainer}>
                    {subjects.map(subject => (
                        <TouchableOpacity
                            key={subject}
                            style={[
                                styles.subjectChip,
                                selectedSubject === subject && styles.selectedSubjectChip
                            ]}
                            onPress={() => setSelectedSubject(subject)}
                        >
                            <Text style={[
                                styles.subjectText,
                                selectedSubject === subject && styles.selectedSubjectText
                            ]}>
                                {subject}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.resultsText}>
                    {filteredTeachers.length} teacher{filteredTeachers.length !== 1 ? 's' : ''} found
                </Text>

                {filteredTeachers.map(teacher => (
                    <View key={teacher.id} style={styles.teacherCard}>
                        <View style={styles.teacherHeader}>
                            <Image source={{ uri: teacher.avatar }} style={styles.teacherAvatar} />
                            <View style={styles.teacherInfo}>
                                <Text style={styles.teacherName}>{teacher.name}</Text>
                                <View style={styles.ratingContainer}>
                                    <Star size={16} color="#f59e0b" />
                                    <Text style={styles.rating}>{teacher.rating}</Text>
                                    <Text style={styles.reviewCount}>({teacher.totalSessions} sessions)</Text>
                                </View>
                                <View style={styles.locationContainer}>
                                    <MapPin size={14} color="#64748b" />
                                    <Text style={styles.location}>{teacher.location}</Text>
                                </View>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>${teacher.hourlyRate}</Text>
                                <Text style={styles.priceUnit}>per hour</Text>
                            </View>
                        </View>

                        <Text style={styles.bio} numberOfLines={3}>{teacher.bio}</Text>

                        <View style={styles.subjectsRow}>
                            {teacher.subjects.slice(0, 3).map(subject => (
                                <View key={subject} style={styles.subjectTag}>
                                    <Text style={styles.subjectTagText}>{subject}</Text>
                                </View>
                            ))}
                            {teacher.subjects.length > 3 && (
                                <Text style={styles.moreSubjects}>+{teacher.subjects.length - 3} more</Text>
                            )}
                        </View>

                        <View style={styles.statsRow}>
                            <View style={styles.stat}>
                                <Clock size={16} color="#64748b" />
                                <Text style={styles.statText}>{teacher.experience} years exp.</Text>
                            </View>
                            <View style={styles.stat}>
                                <Text style={styles.statText}>{teacher.totalStudents} students</Text>
                            </View>
                        </View>

                        <View style={styles.cardActions}>
                            <TouchableOpacity style={styles.viewProfileButton}>
                                <Text style={styles.viewProfileText}>View Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.bookButton}
                                onPress={() => handleBookSession(teacher)}
                            >
                                <Text style={styles.bookButtonText}>Book Session</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {filteredTeachers.length === 0 && (
                    <View style={styles.noResults}>
                        <Search size={48} color="#cbd5e1" />
                        <Text style={styles.noResultsText}>No teachers found</Text>
                        <Text style={styles.noResultsSubtext}>Try adjusting your search criteria</Text>
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
        marginBottom: 16,
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
    subjectsContainer: {
        marginHorizontal: -24,
        paddingHorizontal: 24,
    },
    subjectChip: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
    },
    selectedSubjectChip: {
        backgroundColor: '#3b82f6',
    },
    subjectText: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
    },
    selectedSubjectText: {
        color: 'white',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    resultsText: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
        marginVertical: 16,
    },
    teacherCard: {
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
    teacherHeader: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    teacherAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 12,
    },
    teacherInfo: {
        flex: 1,
    },
    teacherName: {
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        color: '#1e293b',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    rating: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: '#f59e0b',
    },
    reviewCount: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#64748b',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    location: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#64748b',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 20,
        fontFamily: 'Inter-Bold',
        color: '#22c55e',
    },
    priceUnit: {
        fontSize: 12,
        fontFamily: 'Inter-Regular',
        color: '#64748b',
    },
    bio: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#64748b',
        lineHeight: 20,
        marginBottom: 16,
    },
    subjectsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 16,
    },
    subjectTag: {
        backgroundColor: '#dbeafe',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    subjectTagText: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        color: '#3b82f6',
    },
    moreSubjects: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
        alignSelf: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 20,
    },
    stat: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: '#64748b',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 12,
    },
    viewProfileButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3b82f6',
        alignItems: 'center',
    },
    viewProfileText: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: '#3b82f6',
    },
    bookButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#3b82f6',
        alignItems: 'center',
    },
    bookButtonText: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: 'white',
    },
    noResults: {
        alignItems: 'center',
        padding: 40,
        marginTop: 40,
    },
    noResultsText: {
        fontSize: 18,
        fontFamily: 'Inter-SemiBold',
        color: '#64748b',
        marginTop: 16,
    },
    noResultsSubtext: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: '#94a3b8',
        marginTop: 8,
    },
});
