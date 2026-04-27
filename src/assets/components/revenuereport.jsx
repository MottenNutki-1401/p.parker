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
    
      <h2>Today's Revenue</h2>
         <hr />
      <h1>₱{todayRevenue}</h1>
     </div>

  
     <div className="transactions-box">

    <h3>Transactions</h3>
   <hr />
   
        {transactions.length === 0 ? (
          <p>No transactions yet</p>

        ) : (

          transactions.map((t, i) => (

            <div key={i} className="report-item">

              <p>Slot #{t.slotId}</p>
              <p>{t.timeIn} - {t.timeOut}</p>
              <p>₱{t.price}</p>
              <p>{t.date}</p>
              <hr />
            </div>
          ))
        )}
      </div>
    
      
    </div>

    
  );
}

export default RevenueReport;