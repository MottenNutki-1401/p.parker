function Receipt({ receipt, onClose }) {
  if (!receipt) return null;

  const formatTimeAMPM = (time) => {
    if (!time || !time.includes(":")) return "—";
    let [hours, minutes] = time.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${String(minutes).padStart(2, "0")} ${ampm}`;
  };

  const handleSavePDF = () => {
    window.print();
  };

  return (
    <div className="receipt-overlay" onClick={onClose}>
      <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Receipt</h2>
        <p><strong>Name:</strong> {receipt.name}</p>
        <p><strong>Slot ID:</strong> {receipt.slotId}</p>
        <p><strong>Date:</strong> {receipt.date}</p>
        <p><strong>Time In:</strong> {formatTimeAMPM(receipt.timeIn)}</p>
        <p><strong>Time Out:</strong> {formatTimeAMPM(receipt.timeOut)}</p>
        <hr />
        <p><strong>Amount Due:</strong> ₱{receipt.price || 0}</p>

        <div className="receipt-actions no-print">
          <button className="save-pdf-btn" onClick={handleSavePDF}>Save as PDF</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;