import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react-native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            router.replace('/(tabs)');
        } catch (error) {
            Alert.alert('Error', 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    const fillDemoCredentials = (role: 'student' | 'teacher') => {
        if (role === 'student') {
            setEmail('student@test.com');
            setPassword('password');
        } else {
            setEmail('teacher@test.com');
            setPassword('password');
        }
    };

    return (
        <LinearGradient colors={['#3b82f6', '#1d4ed8']} style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue learning</Text>
                </View>

                <View style={styles.form}>
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
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter your password"
                                placeholderTextColor="#94a3b8"
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeButton}
                            >
                                {showPassword ? (
                                    <EyeOff size={20} color="#64748b" />
                                ) : (
                                    <Eye size={20} color="#64748b" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.demoSection}>
                        <Text style={styles.demoLabel}>Demo Accounts:</Text>
                        <View style={styles.demoButtons}>
                            <TouchableOpacity
                                style={styles.demoButton}
                                onPress={() => fillDemoCredentials('student')}
                            >
                                <Text style={styles.demoButtonText}>Student Demo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.demoButton}
                                onPress={() => fillDemoCredentials('teacher')}
                            >
                                <Text style={styles.demoButtonText}>Teacher Demo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={styles.loginButtonText}>
                            {loading ? 'Signing In...' : 'Sign In'}
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => router.push('/auth/register')}>
                            <Text style={styles.linkText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
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
        flex: 1,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: 'white',
        marginBottom: 8,
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
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        color: '#1e293b',
    },
    eyeButton: {
        paddingHorizontal: 16,
    },
    demoSection: {
        marginBottom: 30,
    },
    demoLabel: {
        fontSize: 14,
        fontFamily: 'Inter-Medium',
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 12,
    },
    demoButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    demoButton: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    demoButtonText: {
        fontSize: 12,
        fontFamily: 'Inter-Medium',
        color: 'white',
    },
    loginButton: {
        backgroundColor: 'white',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        fontSize: 16,
        fontFamily: 'Inter-SemiBold',
        color: '#1d4ed8',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
