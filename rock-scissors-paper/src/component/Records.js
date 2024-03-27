import React from "react";

const Records = (props) => {
  return (
    <div>
      <table className="records-table">
        <caption className="readonly">
          records: Your Choice, Computer Choice, Win
        </caption>
        <colgroup>
          <col width="33%"></col>
          <col width="33%"></col>
          <col width="33%"></col>
        </colgroup>
        <thead>
          <tr>
            <th>Your Choice</th>
            <th>Computer Choice</th>
            <th>Win</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>-</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Records;
