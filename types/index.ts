export interface User {
    id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher';
    avatar?: string;
    phone?: string;
    location?: string;
    rating?: number;
    totalSessions?: number;
}

export interface Teacher extends User {
    subjects: string[];
    experience: number;
    hourlyRate: number;
    bio: string;
    education: string[];
    availability: string[];
    totalStudents: number;
    reviews: Review[];
}

export interface Student extends User {
    grade?: string;
    subjects: string[];
    learningGoals: string[];
}

export interface Session {
    id: string;
    studentId: string;
    teacherId: string;
    subject: string;
    date: string;
    time: string;
    duration: number;
    status: 'upcoming' | 'completed' | 'cancelled';
    meetingLink?: string;
    notes?: string;
    amount: number;
}

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: string;
    read: boolean;
}

export interface Review {
    id: string;
    studentId: string;
    studentName: string;
    rating: number;
    comment: string;
    date: string;
}
