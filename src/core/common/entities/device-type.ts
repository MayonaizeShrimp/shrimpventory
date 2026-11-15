export const DEVICE_TYPE = {
  MOBILE: 'mobile',
  DESKTOP: 'desktop',
} as const;

export type DeviceTypes = (typeof DEVICE_TYPE)[keyof typeof DEVICE_TYPE];
