import React from 'react';
import { useNotification } from '@/contexts/NotificationContext';

const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  const bgColor = notification.type === 'error' ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`fixed top-4 right-4 p-4 rounded text-white ${bgColor}`}>
      {notification.message}
    </div>
  );
};

export default Notification;