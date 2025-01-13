import "./styles.css";
import { Button, Form, InputNumber } from "antd";
import {  useEffect, useState } from "react";

export default function App() {
  const [formRef] = Form.useForm();



  const initialValues =  localStorage.getItem('values')?JSON.parse(localStorage.getItem('values')):{
    yearRate: 3.3,
    totalMount: 32.832193,
    monthCount: 172,
  };



  const [MonthlyPayments, setMonthlyPayments] = useState("");

  const yearRate = Form.useWatch("yearRate", formRef);
  const monthRate = yearRate / 12;

  const calculate = (values) => {

    localStorage.setItem('values',JSON.stringify(values))
    const { totalMount, monthCount, yearRate } = values;
    const monthRate = yearRate / 12;
    
    // 每月还款金额 = [贷款本金×月利率×(1+月利率)^贷款月数] / [(1+月利率)^贷款月数－1]
    const value =
      (totalMount *
        10000 *
        ((monthRate / 100) * Math.pow(1 + monthRate / 100, monthCount))) /
      (Math.pow(1 + monthRate / 100, monthCount) - 1);

    setMonthlyPayments(value.toFixed(2));

    // 待还总额度
  };

  useEffect(() => {
    calculate(initialValues);
  }, []);

  const onValuesChange = (changedValues, allValues) => {
    console.log('litong: changedValues:',changedValues);
    console.log('litong: allValues:',allValues);
    calculate(allValues);
  }
  

  return (
    <div className="w-[300px] p-4 border-gray-300 rounded-lg shadow-sm border border-solid">
      <Form
        size="large"
        form={formRef}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={initialValues}
        onValuesChange={onValuesChange}
        layout="horizontal"
        onFinish={calculate}
      >
        <Form.Item label="贷款总额" name="totalMount">
          <InputNumber
            formatter={(value) => `${value} 万`}
            className="w-full"
          />
        </Form.Item>

        <Form.Item label="贷款期限" name="monthCount">
          <InputNumber
            className="w-full"
            formatter={(value) => `${value} 个月`}
          />
        </Form.Item>

        <Form.Item label="年利率" name="yearRate">
          <InputNumber className="w-full" formatter={(value) => `${value}%`} />
        </Form.Item>

        <Form.Item label="月利率：">
          <span>{monthRate&&monthRate.toFixed(2)||0}% = {yearRate}% / 12</span>
        </Form.Item>

        <Form.Item label="" wrapperCol={{ span: 20, offset: 14 }}>
          <Button type="primary" htmlType="submit">
            计算
          </Button>
        </Form.Item>
      </Form>

      <div>
        每月还款：
        <div>
          {/* <div>(每月还款额=贷款本金×[月利率×(1+月利率)^还款月数]÷[(1+月利率)^还款月数-1])</div> */}
          {MonthlyPayments}
        </div>
      </div>
    </div>
  );
}

// 每月应还利息=贷款本金×月利率×[(1+月利率)^还款月数 - (1+月利率)^还款月序号-1]÷[(1+月利率)^还款月数-1]
// 每月应还本金=贷款本金×月利率×(1+月利率)^还款月序号-1÷ [(1+月利率)^还款月数-1]
// 总支付利息=还款月数×每月月供额-贷款本金
