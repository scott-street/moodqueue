export type NotificationType = {
  success: boolean;
  text: string;
  show: boolean;
};

export const defaultNotification: NotificationType = {
  success: true,
  text: '',
  show: false
};
