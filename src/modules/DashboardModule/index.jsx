import { Row } from 'antd';
import useLanguage from '@/locale/useLanguage';
import MemberRankingCard from './components/MemberRankingCard';
import AssignedProjectCard from './components/AssignedProjectCard';
import OngoingTaskCard from './components/OngoingTaskCard';
import TimeSheetCard from './components/TimeSheetCard';
import ResizableChart from './components/ResizableChart'

export default function DashboardModule() {
  const translate = useLanguage();
  return (
    <>
      <Row gutter={[32, 32]}>
        <MemberRankingCard
          title={translate('Top 5 Members based on time logged')}
          stand="logged"
        />
        <MemberRankingCard
          title={translate('Top 5 Members based on activity')}
          stand={'activity'}
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[32, 32]}>
        <ResizableChart status='Finished' />
        <MemberRankingCard
          title={translate('Top 5 Members based on productivity')}
          stand={'productivity'}
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[32, 32]}>
        <ResizableChart status='In Progress' />
        <AssignedProjectCard
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[32, 32]}>
        <OngoingTaskCard
        />
        <TimeSheetCard
          entity={'invoice'}
        />
      </Row>
    </>
  );
}
