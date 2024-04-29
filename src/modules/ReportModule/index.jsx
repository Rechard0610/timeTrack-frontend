import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Card, Button, Tabs } from 'antd';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import ExportButtonGroup from './components/ExportButtonGroup'
import InfoCard from './components/InfoCard'
import PersonInfo from './components/PersonInfo'
import NormalCard from './components/NormalCard'
import AssignChart from './components/AssignChart'
import ProjectDescription from './components/projectDescription'
import ReportHeader from './components/ReportHeader'
import ExportHeader from './components/ExportHeader'
import Loading from '@/components/Loading';

const { TabPane } = Tabs; // Destructured TabPane from Tabs

export default function ReportModule() {
    const currentAdmin = useSelector(selectCurrentAdmin);
    const [currentTab, setCurrentTab] = useState('report');

    const productiveListTitle = { entity: 'reportProdcutiveList', title: ['Activity', 'Productivity', 'Profitability'] }
    const recordListTitle = { entity: 'reportRecord', title: ['Idle Time', 'Manual Time', 'Working Time'] }
    const reportPerson = { entity: 'reportPerson' }
    const recordTitle = { entity: 'reportProductiveTime', title: ['Working Time', 'Manual Time', 'Idle Time'] }
    const productiveTitle = { entity: 'reportProductivePer', title: ['Activity', 'Productivity', 'Profitability'] }
    const topAssginClient = { entity: 'reportAssignClient', title: 'Clients' }
    const topAssginProject = { entity: 'reportAssignProject', title: 'Projects' }
    const clientBudget = { entity: 'reportClientBudget' }
    const projectBudget = { entity: 'reportProjectBudget' }
    const reportTime = { entity: 'reportTime', title: ['Total', 'Spent', 'Remaining'] }
    const expensesListTitle = { entity: 'reportExpense', title: ['Salary', 'Expenses', 'Lunch'] }
    const billedClient = { entity: 'reportClientBill' }
    const billedProject = { entity: 'reportProjectBill' }
    const reportTotalExpense = { entity: 'reportTotalExpense', title: ['Total', 'Total', 'Expenses'] }
    const reportTotalEarn = { entity: 'reportTotalEarn', title: ['Earnings', 'Billed', 'Not Billed'] }


    const handleChangeTab = (value) => {
        setCurrentTab(value);
    }

    return (
        <Loading isLoading={false}>
            <Tabs defaultActiveKey="report" onChange={handleChangeTab}>
                <TabPane tab="Reports" key="report">
                    <>
                        <ReportHeader />
                        <InfoCard config={productiveListTitle} />
                        <InfoCard config={recordListTitle} />
                        <PersonInfo config={reportPerson} />
                        <NormalCard config={recordTitle} />
                        <NormalCard config={productiveTitle} />
                        <AssignChart config={topAssginClient} />
                        <AssignChart config={topAssginProject} />
                        <div className='flex justify-between'>
                            <ProjectDescription config={clientBudget} />
                            <ProjectDescription config={projectBudget} />
                        </div>
                        <NormalCard config={reportTime} />
                        <InfoCard config={expensesListTitle} />
                        <div className='flex justify-between'>
                            <ProjectDescription config={billedClient} />
                            <ProjectDescription config={billedProject} />
                        </div>
                        <NormalCard config={reportTotalExpense} />
                        <NormalCard config={reportTotalEarn} />
                    </>
                </TabPane>
                <TabPane tab="Exports" key="export">
                    <ExportHeader />
                    <ExportButtonGroup />
                </TabPane>
            </Tabs>
        </Loading>
    );
}
