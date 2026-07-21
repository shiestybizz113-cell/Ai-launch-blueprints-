export type RadiusOption = 'sharp' | 'medium' | 'rounded';
export type ButtonStyle = 'solid' | 'outline' | 'ghost';
export type InputStyle = 'filled' | 'outlined' | 'underlined';

export interface BrandKit {
  primaryColor: string;
  accentColor: string;
  linkColor: string;
  borderRadius: RadiusOption;
  fontFamily: string;
  buttonStyle: ButtonStyle;
  inputStyle: InputStyle;
}

export const DEFAULT_BRAND_KIT: BrandKit = {
  primaryColor: '#3b82f6', // blue-500
  accentColor: '#8b5cf6', // violet-500
  linkColor: '#2563eb', // blue-600
  borderRadius: 'medium',
  fontFamily: 'Inter',
  buttonStyle: 'solid',
  inputStyle: 'outlined',
};
