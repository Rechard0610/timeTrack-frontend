import { Button, Result } from 'antd';

import useLanguage from '@/locale/useLanguage';

const About = () => {
  const translate = useLanguage();
  return (
    <Result
      status="info"
      title={'TimeTrack'}
      subTitle={translate('Do you need help on customize of this app')}
      extra={
        <>
          <p>
            Website : <a href="https://timetrack-service.onrender.com/">https://timetrack-service.onrender.com/</a>{' '}
          </p>
          <p>
            GitHub :{' '}
            <a href="https://timetrack-service.onrender.com/">
              https://timetrack-service.onrender.com/
            </a>
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open(`https://timetrack-service.onrender.com//contact-us/`);
            }}
          >
            {translate('Contact us')}
          </Button>
        </>
      }
    />
  );
};

export default About;
