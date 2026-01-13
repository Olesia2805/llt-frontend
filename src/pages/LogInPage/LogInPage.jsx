import { useTranslation } from 'react-i18next';
import { FaHashtag } from 'react-icons/fa6';

import styles from './LogInPage.module.css';
import Container from '../../components/Container/Container';
import LogInForm from '../../components/login/LogInForm/LogInForm';

import loginBackground from '../../assets/img/login_background.jpg';
import loginBackgroundMobile from '../../assets/img/login_background_mobile.jpg';

const LogInPage = () => {
  const { t } = useTranslation('login');

  return (
    <Container>
      <main>
        <div className={styles.loginWrapper}>
          <div className={styles.heroText}>
            <span className={styles.badge}>
              <FaHashtag />
              {t('hero_section.badge_text', 'Welcome Back').toUpperCase()}
            </span>
            <h1 dangerouslySetInnerHTML={{ __html: t('hero_section.title') }} />
            <p>{t('hero_section.description')}</p>
          </div>

          <LogInForm />

          <picture>
            <source media="(max-width: 768px)" srcSet={loginBackgroundMobile} />
            <img
              className={styles.image}
              src={loginBackground}
              alt={t('hero_section.imageAlt', 'Travel adventure background')}
              loading="lazy"
            />
          </picture>
        </div>
      </main>
    </Container>
  );
};

export default LogInPage;
