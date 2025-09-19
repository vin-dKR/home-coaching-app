import { Teacher, Session, Message, Review } from '../types';

export const mockTeachers: Teacher[] = [
    {
        id: '1',
        name: 'Dr. Emily Watson',
        email: 'emily@example.com',
        role: 'teacher',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
        subjects: ['Mathematics', 'Physics'],
        experience: 8,
        hourlyRate: 45,
        bio: 'Passionate mathematics and physics teacher with 8 years of experience helping students excel in STEM subjects.',
        education: ['PhD in Mathematics - MIT', 'MS in Physics - Stanford'],
        availability: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
        rating: 4.9,
        totalSessions: 234,
        totalStudents: 89,
        location: 'Boston, MA',
        reviews: [
            {
                id: '1',
                studentId: '1',
                studentName: 'Alex Johnson',
                rating: 5,
                comment: 'Excellent teacher! Helped me improve my calculus grade significantly.',
                date: '2024-01-15'
            }
        ]
    },
    {
        id: '2',
        name: 'Prof. David Miller',
        email: 'david@example.com',
        role: 'teacher',
        avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=400',
        subjects: ['Chemistry', 'Biology'],
        experience: 12,
        hourlyRate: 55,
        bio: 'Experienced science educator specializing in chemistry and biology. Making complex concepts simple.',
        education: ['PhD in Chemistry - Harvard', 'MS in Biology - Yale'],
        availability: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
        rating: 4.8,
        totalSessions: 312,
        totalStudents: 124,
        location: 'New York, NY',
        reviews: []
    },
    {
        id: '3',
        name: 'Ms. Sarah Chen',
        email: 'sarah@example.com',
        role: 'teacher',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        subjects: ['English Literature', 'Writing'],
        experience: 6,
        hourlyRate: 40,
        bio: 'Creative writing and literature specialist. Helping students develop strong communication skills.',
        education: ['MA in English Literature - Columbia', 'BA in Creative Writing - NYU'],
        availability: ['Tuesday', 'Thursday', 'Friday', 'Sunday'],
        rating: 4.7,
        totalSessions: 189,
        totalStudents: 67,
        location: 'San Francisco, CA',
        reviews: []
    }
];

export const mockSessions: Session[] = [
    {
        id: '1',
        studentId: '1',
        teacherId: '1',
        subject: 'Mathematics',
        date: '2024-01-20',
        time: '10:00 AM',
        duration: 60,
        status: 'upcoming',
        amount: 45,
        meetingLink: 'https://zoom.us/j/123456789'
    },
    {
        id: '2',
        studentId: '1',
        teacherId: '2',
        subject: 'Chemistry',
        date: '2024-01-18',
        time: '2:00 PM',
        duration: 90,
        status: 'completed',
        amount: 82.5,
        notes: 'Covered organic chemistry basics'
    }
];
