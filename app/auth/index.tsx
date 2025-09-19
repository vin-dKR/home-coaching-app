import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { GraduationCap, Users, BookOpen } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#3b82f6', '#1d4ed8']}
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <GraduationCap size={60} color="white" />
                    <Text style={styles.title}>EduConnect</Text>
                    <Text style={styles.subtitle}>
                        Bridge the gap between passionate learners and expert educators
                    </Text>
                </View>

                <View style={styles.features}>
                    <View style={styles.feature}>
                        <Users size={32} color="white" />
                        <Text style={styles.featureText}>Connect with verified teachers</Text>
                    </View>
                    <View style={styles.feature}>
                        <BookOpen size={32} color="white" />
                        <Text style={styles.featureText}>Learn at your own pace</Text>
                    </View>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => router.push('/auth/login')}
                    >
                        <Text style={styles.primaryButtonText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => router.push('/auth/register')}
                    >
                        <Text style={styles.secondaryButtonText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 24,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
        marginTop: 80,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Inter-Bold',
        color: 'white',
        marginTop: 16,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        lineHeight: 24,
    },
    features: {
        gap: 24,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: 20,
        borderRadius: 16,
    },
    featureText: {
        fontSize: 16,
        fontFamily: 'Inter-Medium',
        color: 'white',
        flex: 1,
    },
    actions: {
        gap: 16,
        marginBottom: 40,
    },
    primaryButton: {
        backgroundColor: 'white',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#1d4ed8',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: 'white',
    },
});
