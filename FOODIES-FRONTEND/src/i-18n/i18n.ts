// src/plugins/i18n.ts
import { createI18n } from 'vue-i18n';
import en from '../locales/en.json';
import fr from '../locales/fr.json';

// Configuration de l'instance i18n
const i18n = createI18n({
  legacy: false, // Utilisez le mode de composition
  locale: 'fr', // Définissez la langue par défaut
  fallbackLocale: 'fr', // Langue de secours si la clé n'est pas trouvée
  messages: {
    en,
    fr,
  },
});

export default i18n;
