// src/components/DemoModal.jsx

import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button } from 'antd'; // Import Ant Design's Button
import { Formik, Form as FormikForm, Field } from 'formik';
import * as Yup from 'yup';
import ReactInputMask from 'react-input-mask';
import { sendMail } from '../../services/mailService';
import modalService from '../../services/modalService';
import { useTranslation } from 'react-i18next';
import './DemoModal.css';
import { toast } from 'react-toastify';

const DemoModal = () => {
  const [visible, setVisible] = useState(false);
  const [demoTitle, setDemoTitle] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    // Subscribe to modal visibility changes
    modalService.subscribe(setVisible);

    // Subscribe to modal data changes
    modalService.subscribeData(setDemoTitle);

    // Cleanup on unmount
    return () => {
      modalService.unsubscribe(setVisible);
      modalService.unsubscribeData(setDemoTitle);
    };
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('demoModal.validation.required')),
    companyName: Yup.string().required(t('demoModal.validation.required')),
    phone: Yup.string().required(t('demoModal.validation.required')),
  });

  const MOBILE_PHONE_MASK = '+7 (7**) ***-**-**';

  const onClose = () => {
    modalService.closeModal();
  };

  const onSubmit = async (values) => {
    try {
      // Step 2: Prepare mail data
      const mailData = {
        subject: demoTitle,
        company: `${values.companyName}`,
        name: `${values.name}`,
        phone: `${values.phone}`,
      };

      // Step 3: Send the mail
      const mailResponse = await sendMail(mailData);

      const isSuccess =
        mailResponse?.success === true ||
        mailResponse?.success === 'Сообщение успешно отправлено';

      if (!isSuccess) {
        toast.error(t('demoModal.alerts.error'));
        return;
      }
      toast.success(t('demoModal.alerts.success'));
      onClose();
    } catch (error) {
      console.error('Error in onSubmit:', error);
      toast.error(`${t('demoModal.alerts.error')}`);
    }
  };

  return (
    <Modal
      className="custom-modal"
      width={500}
      style={{ borderRadius: '20px', overflow: 'hidden' }}
      bodyStyle={{ borderRadius: '20px', padding: '24px', background: 'white' }}
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div className="title">
        <p className="header-demo">{demoTitle}</p>
        <span>{t('demoModal.header')}</span>
      </div>
      <Formik
        initialValues={{ name: '', companyName: '', phone: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <FormikForm>
            <Form.Item
              validateStatus={errors.name && touched.name ? 'error' : ''}
              help={errors.name && touched.name ? errors.name : ''}
            >
              <Field name="name">
                {({ field }) => <Input {...field} placeholder={t('demoModal.form.name')} />}
              </Field>
            </Form.Item>

            <Form.Item
              validateStatus={errors.companyName && touched.companyName ? 'error' : ''}
              help={errors.companyName && touched.companyName ? errors.companyName : ''}
            >
              <Field name="companyName">
                {({ field }) => <Input {...field} placeholder={t('demoModal.form.companyName')} />}
              </Field>
            </Form.Item>

            <Form.Item
              validateStatus={errors.phone && touched.phone ? 'error' : ''}
              help={errors.phone && touched.phone ? errors.phone : ''}
            >
              <Field name="phone">
                {({ field }) => (
                  <ReactInputMask
                    formatChars={{ '*': '[0-9]' }}
                    {...field}
                    mask={MOBILE_PHONE_MASK}
                    maskChar={null}
                    placeholder="+7"
                  >
                    {(inputProps) => <Input {...inputProps} placeholder={t('demoModal.form.phone')} />}
                  </ReactInputMask>
                )}
              </Field>
            </Form.Item>

            <Form.Item>
              <div className="actions">
                <Button type="primary" htmlType="submit" className="success-btn customButtonStyle">
                  {t('demoModal.buttons.submit')}
                </Button>
                <Button type="default" onClick={onClose} className="default-btn customButtonStyle">
                  {t('demoModal.buttons.close')}
                </Button>
              </div>
            </Form.Item>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default DemoModal;
