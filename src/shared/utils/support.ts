import { Linking } from 'react-native';
import { SUPPORT_WHATSAPP } from '../data/products';

export const openSupportChat = () => {
  Linking.openURL(`https://wa.me/${SUPPORT_WHATSAPP}`).catch(() => {});
};
