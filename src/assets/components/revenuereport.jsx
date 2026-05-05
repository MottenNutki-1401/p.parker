import { useEffect, useState } from "react";
import "../../styles/rev.css";
import vector from "../../assets/vector.svg";

function RevenueReport() {
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored);

    const today = new Date().toLocaleDateString();

    const total = stored
      .filter(t => t.date === today)
      .reduce((sum, t) => sum + (t.price || 0), 0);

    setTodayRevenue(total);
  }, []);

return (
  <div className="report-box">
    <div className="total">
      <p className="label">Today's Revenue</p>
      <h1>₱{todayRevenue}</h1>
    </div>

    <div className="transactions-box">
      <h3>Transactions</h3>
      {transactions.length === 0 ? (
        <p className="empty">No transactions yet</p>
      ) : (
        <table className="tx-table">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Time In</th>
              <th>Time Out</th>
              <th>Date</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i}>
                <td>#{t.slotId}</td>
                <td>{t.timeIn}</td>
                <td>{t.timeOut}</td>
                <td>{t.date}</td>
                <td className="amount-cell">₱{t.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
);
}

export default RevenueReport;