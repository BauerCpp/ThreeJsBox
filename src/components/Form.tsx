import React, { useContext } from 'react';
import { Form, Input, Button, Switch, FormProps } from 'antd';
import { ThemeContext, THEMES, Theme } from '../context/context';

interface SizeFormValues {
  width: number;
  height: number;
  length: number;
}

interface SizeFormProps {
  onSubmit: (width: number, height: number, length: number) => void;
  onThemeChange: () => void;
  initialValues: {width: number, height: number, length: number};
}

const SizeForm: React.FC<SizeFormProps> = (props) => {
  const theme = useContext(ThemeContext);
  const initialValues: SizeFormValues = {...props.initialValues}; // Default values
  const formStyle = {
    backgroundColor: THEMES[theme].backgroundColor,
    padding: '16px', // Added padding for better aesthetics
    borderRadius: '8px',  // Added border radius for a softer look
  };

  const labelStyle = {
    color: THEMES[theme].textColor,
  };

  const onFinish: FormProps<SizeFormValues>['onFinish'] = (values) => {
    const { width, height, length } = values;
	console.log(width, height, length)
    props.onSubmit(width, height, length);
  };

  const validateNumber = (_: any, value: any) => {
      if (isNaN(Number(value))) {
        return Promise.reject('Please enter a valid number!');
      }

      if (Number(value) <= 0) {
        return Promise.reject('Value must be greater than zero!');
      }
      return Promise.resolve();
  };

  return (
    <div style={formStyle} className="form_underlayer">
      <Form<SizeFormValues>
        className="size_form"
        onFinish={onFinish}
        layout="vertical"
        initialValues={initialValues}
      >
        <Form.Item
          label={<label style={labelStyle}>Height</label>}
          name="height"
          rules={[
            { required: true, message: 'Please enter height!' },
            { validator: validateNumber },
          ]}
        >
          <Input type="number" min={1}  />
        </Form.Item>

        <Form.Item
          label={<label style={labelStyle}>Width</label>}
          name="width"
          rules={[
            { required: true, message: 'Please enter width!' },
            { validator: validateNumber },
          ]}
        >
          <Input type="number" min={1} />
        </Form.Item>

        <Form.Item
          label={<label style={labelStyle}>Length</label>}
          name="length"
          rules={[
            { required: true, message: 'Please enter length!' },
            { validator: validateNumber },
          ]}
        >
          <Input type="number" min={1} />
        </Form.Item>

        <Form.Item>
			<div className='centered'>
        		<Button type="primary" htmlType="submit">
        		    Calculate
        		</Button>
			</div>
        </Form.Item>

        <Form.Item>
		<div className='centered'>
          <span style={labelStyle}> {'Dark'} </span>
        	<Switch style={{margin: '0 8px'}} onClick={props.onThemeChange} />
          <span style={labelStyle}> {'Light'} </span>
		</div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SizeForm;