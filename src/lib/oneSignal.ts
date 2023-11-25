import { env } from '@/env/env.mjs';
import OneSignal from 'react-onesignal';

export const initializeOneSignal = async (
  userId: string,
  onInitialized: () => void,
  onError?: (error: unknown) => void
) => {
  try {
    await OneSignal.init({
      appId: env.ONESIGNAL_APP_ID,
      safari_web_id: env.ONESIGNAL_SAFARI_ID,
      allowLocalhostAsSecureOrigin: true,
    });

    await OneSignal.login(userId);
    await OneSignal.Slidedown.promptPush();

    onInitialized()
  } catch (error) {
    onError?.(error)
  }
}
