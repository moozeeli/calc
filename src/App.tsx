import "./styles.css";
import { Button, Input, Form } from "antd";
import { useEffect, useState } from "react";

export default function App() {
  const [totalmount, setTotalMount] = useState(115);
  const [monthCount, setMonthCount] = useState(360);
  const [yearRate, setYearRate] = useState(0.0565);
  const [monthRate, setMonthRate] = useState(0.53 / 12);

  useEffect(() => {
    setMonthRate(yearRate / 12);
  }, [yearRate]);

  const [everyMonthReback, setEveryMonthReback] = useState(0);
  const calculate = () => {
    // 每月还款金额 = [贷款本金×月利率×(1+月利率)^贷款月数] / [(1+月利率)^贷款月数－1]
    const value =
      (totalmount * 10000 * (monthRate * Math.pow(1 + monthRate, monthCount))) /
      (Math.pow(1 + monthRate, monthCount) - 1);

    setEveryMonthReback(value);

    // 待还总额度
  };
  return (
    <div className="w-[300px] p-4">
      <Form 
        labelCol={{span:8}}
        wrapperCol={{span:16}}
      >
        <Form.Item label="贷款总额">
          <Input
            type="number"
            value={totalmount}
            onChange={(e) => {
              setTotalMount(Number(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item label="贷款期限（月数）">
          <Input
            type="number"
            value={monthCount}
            onChange={(e) => {
              setMonthCount(Number(e.target.value));
            }}
          />
        </Form.Item>

        <Form.Item label="年利率">
          <Input
            type="number"
            onChange={(e) => {
              setYearRate(parseFloat(e.target.value));
            }}
          />
          <span>月利率：{monthRate}</span>
        </Form.Item>

        <Form.Item label="">
          <Button onClick={calculate}>计算</Button>
        </Form.Item>
      </Form>

      <div>
        每月还款：
        <div>
          {/* // 每月还款额=贷款本金×[月利率×(1+月利率)^还款月数]÷[(1+月利率)^还款月数-1] */}
          {everyMonthReback}
        </div>
        <ul>
          {}
          <li></li>
        </ul>
      </div>
    </div>
  );
}

// 每月应还利息=贷款本金×月利率×[(1+月利率)^还款月数 - (1+月利率)^还款月序号-1]÷[(1+月利率)^还款月数-1]
// 每月应还本金=贷款本金×月利率×(1+月利率)^还款月序号-1÷ [(1+月利率)^还款月数-1]
// 总支付利息=还款月数×每月月供额-贷款本金
