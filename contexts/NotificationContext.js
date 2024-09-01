import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      {notification && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-md ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};