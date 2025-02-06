import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const SizeForm = (props) => {

return (
	<div style={{backgroundColor: 'black'}} className='form_underlayer'>
		<Form
			className='size_form'
			onFinish={
				(values) =>
				{
					const { width, height, length } = values;
					props.onSubmit(width, height, length)
				}
			}
		>
		<Form.Item
			label={<label style={{ color: "white" }}>Height</label>}
			name="height"
			// onChange={handleUsernameChange}
		>
			<Input value={"1"} />
		</Form.Item>

		<Form.Item
			label={<label style={{ color: "white" }}>Width</label>}
			name="width"
			// onChange={handlePasswordChange}
		>
			<Input value="1"/>
		</Form.Item>

		<Form.Item
			label={<label style={{ color: "white" }}>Length</label>}
			name="length"
			// onChange={handlePasswordChange}
		>
			<Input value="1"/>
		</Form.Item>

		<Form.Item>
			<Button type="primary" htmlType="submit">
			Calculate
			</Button>
		</Form.Item>

		<Form.Item>
			<Button type="primary" htmlType="submit">
			Calculate
			</Button>
		</Form.Item>

		</Form>
	</div>
  );
};
export default SizeForm;