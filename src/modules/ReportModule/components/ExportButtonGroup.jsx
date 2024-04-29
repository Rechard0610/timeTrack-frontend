import * as d3 from "d3";
import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Button, Modal, Form } from 'antd';

const ExportButtonGroup = ({ width, height, data, currentAdmin }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const handleClickButton = () => {
        setOpen(true);
    }
    
    const onSubmit = (field) => {

    }

    const handleCancel = () => {
        setOpen(false);
    }

    return (
        <div className="container mx-auto pt-4">
            <Row gutter={[16, 16]}>
                <Col span={24} className="flex flex-wrap justify-between">
                    <Button onClick={handleClickButton} className="w-1/6 h-16">Detailed Cients</Button>
                    <Button onClick={handleClickButton} className="w-1/6 h-16">Client</Button>
                    <Button onClick={handleClickButton} className="w-1/6 h-16">People</Button>
                    <Button onClick={handleClickButton} className="w-1/6 h-16">Builliable, Unbillable, Invoiced</Button>
                    <Button onClick={handleClickButton} className="w-1/6 h-16">Revenue</Button>
                </Col>
                <Col span={24} className="flex flex-wrap justify-between">
                    <Button onClick={handleClickButton} className="w-1/5 h-16">Detailed People</Button>
                    <Button onClick={handleClickButton} className="w-1/5 h-16">People</Button>
                    <Button onClick={handleClickButton} className="w-1/5 h-16">Expenses</Button>
                    <Button onClick={handleClickButton} className="w-1/5 h-16">Salary</Button>
                </Col>
            </Row>
            <Modal
                open={open}
                title="Export Excel"
                onCancel={handleCancel}
                footer={null}
            >
                {/* <p>Adjust, specify or delete the whole tracked time period or parts of it.</p> */}
                <Form
                    form={form} layout="vertical" onFinish={onSubmit}
                >
                </Form>
            </Modal >
        </div>
    );
};

export default ExportButtonGroup;
