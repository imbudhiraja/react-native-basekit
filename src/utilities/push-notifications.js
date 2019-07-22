import Firebase from 'react-native-firebase';
import Idx from 'idx';
import { setDeviceToken } from '../actions/user-actions-types';

let notificationOpenListener;

let onTokenRefreshListener;

const onNotificationRedirection = (notification, store) => {
  if (Idx(store.getState().user, (_) => _.userDetails)) {
    // navigate to specific route
  }

  if (notification) {
    Firebase.notifications().removeDeliveredNotification(notification.notificationId);
  }
};

export const pushNotificationInit = async (store) => {
  const enabled = await Firebase.messaging().hasPermission();

  if (!enabled) {
    Firebase.messaging()
      .requestPermission()
      .then(async (success) => {
        if (success) {
          const token = await Firebase.messaging().getToken();

          store.dispatch(setDeviceToken(token));
        }
      });
  }

  onTokenRefreshListener = Firebase.messaging().onTokenRefresh((token) => {
    store.dispatch(setDeviceToken(token));
  });

  this.notificationOpenedListener = Firebase.notifications().onNotificationOpened((notificationOpen) => {
    onNotificationRedirection(notificationOpen.notification);
  });

  Firebase.notifications()
    .getInitialNotification()
    .then((notificationOpen) => {
      if (notificationOpen) {
        onNotificationRedirection(notificationOpen.notification);
      }
    });
};

export const pushNotificationRemove = async () => {
  if (notificationOpenListener) {
    notificationOpenListener.remove();
  }

  if (onTokenRefreshListener) {
    onTokenRefreshListener.remove();
  }
};

export default async () => Promise.resolve();
