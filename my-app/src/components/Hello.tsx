import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Hello: FC = () => {
  const { t } = useTranslation();
  return <h1>{t('hello')}</h1>;
};

export default Hello;
