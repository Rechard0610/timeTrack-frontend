import { useMemo } from 'react';
import { Col, Progress, Spin } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { Column } from '@ant-design/plots';

const chartData =  [
  {
    type: 'We',
    value: 0.16,
  },
  {
    type: 'Th',
    value: 0.125,
  },
  {
    type: 'Fr',
    value: 0.24,
  },
  {
    type: 'Sa',
    value: 0.24,
  }
];

const config = {
  chartData,
  xField: 'type',
  yField: 'value',
  seriesField: '',
  color: '#5B8FF9',
  label: {
    offset: 10,
  },
  // label: {
  //   content: (originData) => {
  //     const val = parseFloat(originData.value);

  //     if (val < 0.05) {
  //       return (val * 100).toFixed(1) + '%';
  //     }
  //   },
  //   offset: 10,
  // },
  // legend: false,
  // xAxis: {
  //   label: {
  //     autoHide: true,
  //     autoRotate: false,
  //   },
  // },
};

const colours = {
  draft: '#595959',
  sent: '#1890ff',
  pending: '#1890ff',
  unpaid: '#ffa940',
  overdue: '#ff4d4f',
  partially: '#13c2c2',
  paid: '#95de64',
  declined: '#ff4d4f',
  accepted: '#95de64',
  cyan: '#13c2c2',
  purple: '#722ed1',
  expired: '#614700',
};

const defaultStatistics = [
  {
    tag: 'draft',
    value: 0,
  },
  {
    tag: 'pending',
    value: 0,
  },
  {
    tag: 'sent',
    value: 0,
  },
  {
    tag: 'accepted',
    value: 0,
  },
  {
    tag: 'declined',
    value: 0,
  },
  {
    tag: 'expired',
    value: 0,
  },
];

const defaultInvoiceStatistics = [
  {
    tag: 'draft',
    value: 0,
  },
  {
    tag: 'pending',
    value: 0,
  },
  {
    tag: 'overdue',
    value: 0,
  },
  {
    tag: 'paid',
    value: 0,
  },
  {
    tag: 'unpaid',
    value: 0,
  },
  {
    tag: 'partially',
    value: 0,
  },
];

const PreviewState = ({ tag, color, value }) => {
  const translate = useLanguage();
  return (
    <div style={{ color: '#595959', marginBottom: 5 }}>
      <div className="left alignLeft capitalize">{translate(tag)}</div>
      <div className="right alignRight">{value} %</div>
      <Progress
        percent={value}
        showInfo={false}
        strokeColor={{
          '0%': color,
          '100%': color,
        }}
      />
    </div>
  );
};

export default function PreviewProjectCard({
  title = 'Preview',
  statistics = defaultStatistics,
  isLoading = false,
  entity = 'invoice',
}) {
  const statisticsMap = useMemo(() => {
    if (entity === 'invoice') {
      return defaultInvoiceStatistics.map((defaultStat) => {
        const matchedStat = Array.isArray(statistics)
          ? statistics.find((stat) => stat.tag === defaultStat.tag)
          : null;
        return matchedStat || defaultStat;
      });
    } else {
      return defaultStatistics.map((defaultStat) => {
        const matchedStat = Array.isArray(statistics)
          ? statistics.find((stat) => stat.tag === defaultStat.tag)
          : null;
        return matchedStat || defaultStat;
      });
    }
  }, [statistics, entity]);

  const customSort = (a, b) => {
    const colorOrder = Object.values(colours);
    const indexA = colorOrder.indexOf(a.props.color);
    const indexB = colorOrder.indexOf(b.props.color);
    return indexA - indexB;
  };
  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 8 }}
      lg={{ span: 8 }}
    >
      <div className="pad20">
        <h3
          style={{
            color: '#22075e',
            fontSize: 'large',
            marginTop: 0,
          }}
        >
          {title}
        </h3>
        <Column {...config} />

      </div>
    </Col>
  );
}
