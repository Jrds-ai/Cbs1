'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Package, Star, Heart } from 'lucide-react';

export type Notification = {
    id: number;
    type: string;
    title: string;
    message: string;
    time: string;
    iconType: 'order' | 'feature' | 'social';
    color: string;
    unread: boolean;
};

type NotificationContextType = {
    notifications: Notification[];
    unreadCount: number;
    markAllAsRead: () => void;
    clearAll: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const initialNotifications: Notification[] = [
    {
        id: 1,
        type: 'order',
        title: 'Order Shipped!',
        message: 'Your book "The Magic Crayon" is on its way to your doorstep.',
        time: '2 hours ago',
        iconType: 'order',
        color: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300',
        unread: true
    },
    {
        id: 2,
        type: 'feature',
        title: 'New Art Style: Watercolor',
        message: 'Try our latest AI art style for a soft, dreamy look.',
        time: '1 day ago',
        iconType: 'feature',
        color: 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-300',
        unread: false
    },
    {
        id: 3,
        type: 'social',
        title: 'Your book was featured!',
        message: 'Community loved your "Space Adventures" creation.',
        time: '3 days ago',
        iconType: 'social',
        color: 'bg-pink-100 text-pink-600 dark:bg-pink-500/20 dark:text-pink-300',
        unread: false
    }
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('cbs_notifications');
        if (stored) {
            setNotifications(JSON.parse(stored));
        } else {
            setNotifications(initialNotifications);
            localStorage.setItem('cbs_notifications', JSON.stringify(initialNotifications));
        }
        setLoaded(true);
    }, []);

    const updateNotifications = (newNots: Notification[]) => {
        setNotifications(newNots);
        localStorage.setItem('cbs_notifications', JSON.stringify(newNots));
    };

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAllAsRead = () => {
        updateNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const clearAll = () => {
        updateNotifications([]);
    };

    const contextValue = {
        notifications: loaded ? notifications : initialNotifications,
        unreadCount: loaded ? unreadCount : 0,
        markAllAsRead,
        clearAll
    };

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
