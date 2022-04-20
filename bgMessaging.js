import firebase from '@react-native-firebase/app';
// Optional flow type
import type {RemoteMessage} from '@react-native-firebase/app';

export default async (message: RemoteMessage) => {
  // handle your message

  return Promise.resolve();
};
