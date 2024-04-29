import { Card } from 'antd';

const InfoCard = ({ label, value }) => {
    return (
        <Card title={label} bordered={false} >
            <p className='text-[green] text-[20px]'>{value}</p>
        </Card>
    )
}

export default InfoCard;