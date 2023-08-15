import "./styles.css";
import { Button, Input, Form } from "antd";
import { useState } from "react";

export default function App() {
  const [totalmount, setTotalMount] = useState(0);

  const calculate = () => {};
  return (
    <div className="App flex">
      <Form>
        <Form.Item label="贷款总额">
          <Input
            type="number"
            value={totalmount}
            onChange={(e) => {
              console.log(e);
              setTotalMount(Number(e.target.value));
            }}
          />
        </Form.Item>
        <Form.Item label="">
          <Button onClick={calculate}>计算</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

// 每月还款额=贷款本金×[月利率×(1+月利率)^还款月数]÷[(1+月利率)^还款月数-1]
// 每月应还利息=贷款本金×月利率×[(1+月利率)^还款月数 - (1+月利率)^还款月序号-1]÷[(1+月利率)^还款月数-1]
// 每月应还本金=贷款本金×月利率×(1+月利率)^还款月序号-1÷ [(1+月利率)^还款月数-1]
// 总支付利息=还款月数×每月月供额-贷款本金
