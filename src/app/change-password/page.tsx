"use client";
import React, { useState, Fragment } from "react";
import { Layout, Form, Input } from "antd";
import Http from '@security/Http'
import {
    errorResponse,
    successResponse,
    validateMessages
} from "@helpers/response";
import ButtonSubmitReset from '@common/ButtonSubmitReset';
import { Card } from 'antd';
import { useRouter } from "next/navigation";
import JKMasterLayout from '@JKMasterLayout';
import { API_URL, change_password } from "../components/common/constants";



const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const { Content } = Layout;

    const onReset = () => {
        form.resetFields()
    }

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        // @ts-ignore
        await Http.post(API_URL + change_password, data)
            .then((response) => {
                setIsLoading(false);
                router.push('/home');
                successResponse(response);
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response) {
                    errorResponse(error);
                }
            });
    }
    const onFinish = (values: any) => {
        const data = {
            password: values.password,
            password_confirmation: values.confirm,
            old_password: values.old_password,
        }
        onSubmit(data);
    };


    return (
        <Fragment>
            <JKMasterLayout title="Change Password">
                <div className="page-card-view d-flex justify-content-center pt-3">
                    <Card title="Change Password Form" className='col-md-6 col-xs-12 col-lg-6'>
                        <Form form={form}
                            name="basic"
                            layout="vertical"
                            onFinish={onFinish}
                            validateMessages={validateMessages()}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="old_password"
                                label="Old Password"
                                rules={[
                                    {
                                        required: true,
                                        type: 'string',
                                        min: 7,
                                        max: 15,
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        type: 'string',
                                        min: 7,
                                        max: 15,
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        type: 'string',
                                        min: 7,
                                        max: 15,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>



                            <Form.Item
                                className="text-center"
                            >
                                <ButtonSubmitReset isLoading={isLoading} onReset={onReset} />
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            </JKMasterLayout>
        </Fragment >
    )
};

export default Page;
