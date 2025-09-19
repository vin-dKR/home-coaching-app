import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';

export class AuthService {
    private static currentUser: User | null = null;

    static async login(email: string, password: string): Promise<User> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser: User = {
            id: '1',
            name: email === 'student@test.com' ? 'Sarah Johnson' : 'Dr. Michael Chen',
            email,
            role: email === 'student@test.com' ? 'student' : 'teacher',
            avatar: email === 'student@test.com'
                ? 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
                : 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
            rating: 4.8,
            totalSessions: email === 'student@test.com' ? 12 : 156,
        };

        this.currentUser = mockUser;
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
    }

    static async register(userData: Partial<User>): Promise<User> {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newUser: User = {
            id: Math.random().toString(),
            name: userData.name || '',
            email: userData.email || '',
            role: userData.role || 'student',
            rating: 0,
            totalSessions: 0,
        };

        this.currentUser = newUser;
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        return newUser;
    }

    static async logout(): Promise<void> {
        this.currentUser = null;
        await AsyncStorage.removeItem('user');
    }

    static async getCurrentUser(): Promise<User | null> {
        if (this.currentUser) return this.currentUser;

        const stored = await AsyncStorage.getItem('user');
        if (stored) {
            this.currentUser = JSON.parse(stored);
            return this.currentUser;
        }

        return null;
    }
}
