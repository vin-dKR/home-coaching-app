import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function IndexScreen() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (user) {
                router.replace('/(tabs)');
            } else {
                router.replace('/auth');
            }
        }
    }, [user, loading]);

    return (
        <LinearGradient
            colors={['#3b82f6', '#1d4ed8']}
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title}>EduConnect</Text>
                <Text style={styles.subtitle}>Connecting Students & Teachers</Text>
                <ActivityIndicator size="large" color="white" style={styles.loader} />
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontFamily: 'Inter-Bold',
        color: 'white',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 40,
    },
    loader: {
        marginTop: 20,
    },
});
