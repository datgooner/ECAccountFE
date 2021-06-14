import React from "react";
import axiosClient from "../../api/axiosClient";

function Test(props) {
  React.useEffect(() => {
    async function test() {
      const result = await axiosClient.post("/account/store", {
        fullname: "fullname",
        account: "account",
        previous_id: "1",
        newbu_id: "1",
        technology_id: "1",
        job_range_id: "1",
        language: "language",
        ob_day: "ob_day",
        transfer_day: "01-05-2020",
        source_id: "1",
        status_id: "1",
        forecast_customer_code: "forecast_customer_code",
        forecast_bu_id: "1",
        note: "note",
        phone_number: "phone_number",
      });
      console.log(result);
    }
    test();
  }, []);
  return <div>test</div>;
}

export default Test;
