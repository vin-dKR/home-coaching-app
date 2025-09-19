import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, User, GraduationCap } from 'lucide-react-native';

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'student' | 'teacher'>('student');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const router = useRouter();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await register({ name, email, role });
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert('Error', 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient colors={['#3b82f6', '#1d4ed8']} style={styles.container}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join our learning community</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="Enter your full name"
                            placeholderTextColor="#94a3b8"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Enter your email"
                            placeholderTextColor="#94a3b8"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Create a password"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry
                        />
                    </View>

                    <View style={styles.roleContainer}>
                        <Text style={styles.label}>I am a...</Text>
                        <View style={styles.roleOptions}>
                            <TouchableOpacity
                                style={[styles.roleOption, role === 'student' && styles.selectedRole]}
                                onPress={() => setRole('student')}
                            >
                                <User size={24} color={role === 'student' ? '#1d4ed8' : 'white'} />
                                <Text style={[
                                    styles.roleText,
                                    role === 'student' && styles.selectedRoleText
                                ]}>
                                    Student
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.roleOption, role === 'teacher' && styles.selectedRole]}
                                onPress={() => setRole('teacher')}
                            >
                                <GraduationCap size={24} color={role === 'teacher' ? '#1d4ed8' : 'white'} />
                                <Text style={[
                                    styles.roleText,
                                    role === 'teacher' && styles.selectedRoleText
                                ]}>
                                    Teacher
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.registerButton}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        <Text style={styles.registerButtonText}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/auth/login')}>
                            <Text style={styles.linkText}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        padding: 24,
    },
    header: {
        marginTop: 60,
        marginBottom: 40,
    },
    backButton: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Inter-Bold',
        color: 'white',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: 'rgba(255,255,255,0.8)',
    },
    form: {
        gap: 20,
    },
    inputContainer: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: 'white',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#1e293b',
    },
    roleContainer: {
        gap: 12,
    },
    roleOptions: {
        flexDirection: 'row',
        gap: 12,
    },
    roleOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedRole: {
        backgroundColor: 'white',
        borderColor: 'white',
    },
    roleText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: 'white',
    },
    selectedRoleText: {
        color: '#1d4ed8',
    },
    registerButton: {
        backgroundColor: 'white',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    registerButtonText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#1d4ed8',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    footerText: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: 'rgba(255,255,255,0.8)',
    },
    linkText: {
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
        color: 'white',
    },
});
