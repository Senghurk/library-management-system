import '../styles/global.css';
import { NotificationProvider } from '../contexts/NotificationContext';

function MyApp({ Component, pageProps }) {
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  );
}

export default MyApp;