import { useState, useEffect } from "react";
import "../styles/parking.css";
import topview from "../assets/topview.png";
import Receipt from "../assets/components/receipt.jsx";
import "../styles/receipt.css";
import vector from "../assets/vector.svg";

import { createBooking,  getParkingSlots, createBilling } from "../api/api";

function ParkingSlots() {
  const currentUser = "user";

    const user = JSON.parse(
      localStorage.getItem("user")
    );

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [tick, setTick] = useState(0);

  const [extendHours, setExtendHours] = useState(0);
  const ratePerHour = 35; 

 const [receipt, setReceipt] = useState(null);

  
  const [timeIn, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [timeInPeriod, setTimeInPeriod] =
  useState("AM");

  const [timeOutPeriod, setTimeOutPeriod] =
   useState("AM");

  //slots from db
  const [slots, setSlots] = useState([]);

  const layout = [
    { type: "row", slots: [1, 2, 3, 4, null, 5, 6, 7, 8]},
    { type: "road" },

    { type: "row", slots: [9, 10, 11, 12, null, 13, 14, 15, 16] },
    { type: "road" },

    { type: "row", slots: [17, 18, 19, 20, null, 21, 22, 23, 24] },
    { type: "road" },

    { type: "row", slots: [25, 26, 27, 28, null, 29, 30, 31, 32]},
  ];

  useEffect(() => {
    const interval = setInterval(() => setTick((p) => p + 1), 1000);
    return () => clearInterval(interval);
  }, []);
  //another useeffect
  useEffect(() => {

  loadSlots();

}, []);

  const getStatusClass = (status) => {

  status = status?.trim().toLowerCase();

  if (status === "occupied")
    return "occupied";

  if (status === "available")
    return "available";

  if (status === "maintenance")
    return "maintenance";

  return "";
};

const getContent = (status) => {

  status = status?.trim().toLowerCase();

  if (status === "occupied")
    return (
      <img
        src={topview}
        alt="car"
        className="topview"
      />
    );

  if (status === "available")
    return "Available Slot";

  if (status === "maintenance")
    return "Under Maintenance";

  return "";
};
const calculatePrice = (timeIn, timeOut) => {
  if (!timeIn || !timeOut) return 0;

  const [inH, inM] = timeIn.split(":").map(Number);
  const [outH, outM] = timeOut.split(":").map(Number);

  const start = new Date();
  start.setHours(inH, inM, 0);

  const end = new Date();
  end.setHours(outH, outM, 0);

  if (end <= start) {
    end.setDate(end.getDate() + 1);
  }

  const diff = end - start;
  const hours = diff / (1000 * 60 * 60);

  return Math.ceil(hours) * ratePerHour;
};
//load slots from db
const loadSlots = async () => {

  try {

    const response =
      await getParkingSlots();

    console.log(response);

    if (
      response.status ===
      "success"
    ) {

      setSlots(
        response.data
      );
    }

  }

  catch (error) {

    console.error(error);
  }
};

//booking user 
 const handleBooking = async () => {

  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    //send result to db
   const result = await createBooking({

      user_id: user.id,

      parking_slot_id: selectedSlot.id,

      time_in: timeIn,

      time_out: timeOut,

      total_amount: calculatePrice(
        timeIn,
        timeOut
      )

    });

    if (result.status !== "success") {

      alert(result.message);

      return;
    }

//real db slots show ui
    await loadSlots();

    setReceipt({
      name: currentUser,
      slotId: selectedSlot.id,
      timeIn,
      timeOut,
      price: calculatePrice(timeIn, timeOut),
      date: new Date().toLocaleString()
    });

    const existing =
      JSON.parse(
        localStorage.getItem("transactions")
      ) || [];

    localStorage.setItem(
      "transactions",
      JSON.stringify([
        ...existing,
        {
          name: currentUser,
          slotId: selectedSlot.id,
          timeIn,
          timeOut,
          price: calculatePrice(
            timeIn,
            timeOut
          ),
          date:
            new Date()
              .toLocaleDateString()
        }
      ])
    );

    setSelectedSlot(null);

  }

  catch (error) {

    console.error(error);

    alert("Booking failed");
  }
};

   const getRemainingSeconds = (slot) => {
  if (!slot || !slot.time_out) return 0;

      const now = new Date();
      const [h, m] = slot.time_out.split(":");

      const end = new Date();
      end.setHours(Number(h));
      end.setMinutes(Number(m));
      end.setSeconds(0);

      const diff = Math.floor((end - now) / 1000);
      return diff > 0 ? diff : 0;
    };

    const formatTime = (secs) => {
      const h = String(Math.floor(secs / 3600)).padStart(2, "0");
      const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
      const s = String(secs % 60).padStart(2, "0");
      return `${h}:${m}:${s}`;
    };
    
  
    return (

    <div className="parking-wrapper">
      
        <img src={vector} className="vector" alt="yellow" /> 

      <div className="parking-lot">
        {layout.map((item, index) => {
          if (item.type === "road") {
            return <div key={index} className="road"></div>;
          }

          return (
            <div key={index} className="parking-row">
                      {item.slots.map((slotId, i) => {
              if (slotId === null)
                return <div key={`gap-${index}-${i}`} className="gap" />;

           const slot = slots.find(
              (s) => Number(s.id) === slotId
            );
                          if (!slot) {

                return (
                  <div
                    key={`${index}-${i}`}
                    className="slot"
                  >
                    Loading...
                  </div>
                );
              }

              return (
                <div
                  key={`${index}-${i}-${slot.id}`}
                 className={`slot ${getStatusClass(slot.status)} ${
                  Number(slot.user_id) ===
                  Number(user?.id)
                    ? "mine"
                    : ""
                }`}
                  onClick={() => setSelectedSlot(slot)} >
                     <div className="slot-number">Slot#{slot.slot_number}</div>
                  {getContent(slot.status)}
                </div>
              );
            })}
            </div>
          );
        })}
      </div>


      {/* MODAL */}
      {selectedSlot && (
        <div className="modal-overlay" onClick={() => setSelectedSlot(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <div className="slotnum">
             Slot #{selectedSlot.id}
            </div>

            {/* AVAILABLE */}
            {selectedSlot.status === "available" && (
              <>
                <p>Select time:</p>

  <div className="time-group">

  <div>

    <p>Time In</p>

    <input
      type="time"
      value={timeIn}
      onChange={(e) =>
        setTimeIn(e.target.value)
      }
    />

    <select
      value={timeInPeriod}
      onChange={(e) =>
        setTimeInPeriod(
          e.target.value
        )
      }
    >
      <option value="AM">
        AM
      </option>

      <option value="PM">
        PM
      </option>
    </select>

  </div>


  <div>

    <p>Time Out</p>

    <input
      type="time"
      value={timeOut}
      onChange={(e) =>
        setTimeOut(e.target.value)
      }
    />

    <select
      value={timeOutPeriod}
      onChange={(e) =>
        setTimeOutPeriod(
          e.target.value
        )
      }
    >
      <option value="AM">
        AM
      </option>

      <option value="PM">
        PM
      </option>
    </select>

  </div>

</div>  

 <button className="btn3" onClick={handleBooking}>
                  Confirm Booking
                </button>
              </>
            )}

            {/* YOUR SLOT */}
            {selectedSlot.status === "occupied" &&
            Number(selectedSlot.user_id) ===
            Number(user?.id) && (() => {
  
const seconds = getRemainingSeconds(selectedSlot);
const display = formatTime(seconds);
  const billing = extendHours * ratePerHour;

  return (
    <>
      <div className="timer-box">{display}</div>

      <input
        type="number"
        placeholder="Extend Time (hrs)"
        value={extendHours}
        onChange={(e) => setExtendHours(Number(e.target.value))}
      />

      <input
        type="text"
        placeholder="Billing"
        value={`₱${billing}`}
        readOnly
      />

        <div className="btn-group">

       <button
        onClick={() => {
        const updated = slots.map((s) => {
          if (s.id !== selectedSlot.id) return s;

          if (!s.timeOut) return s; //  FIX HERE

          const now = new Date();
          const [h, m] = s.timeOut.split(":");

          const end = new Date();
          end.setHours(Number(h));
          end.setMinutes(Number(m));

          const base = end > now ? end : now;
          base.setHours(base.getHours() + extendHours);

          const newTimeOut = `${String(base.getHours()).padStart(2, "0")}:${String(
            base.getMinutes()
          ).padStart(2, "0")}`;

          setReceipt({
            name: currentUser,
            slotId: s.id,
            timeIn: s.timeIn,
            timeOut: newTimeOut,
            price: extendHours * ratePerHour,
            date: new Date().toLocaleString(),
          });
        const existing = JSON.parse(localStorage.getItem("transactions")) || [];

        localStorage.setItem(
          "transactions",
          JSON.stringify([
            ...existing,
            {
              name: currentUser,
              slotId: s.id,
              timeIn: s.timeIn,
              timeOut: newTimeOut,
              price: extendHours * ratePerHour,
              date: new Date().toLocaleDateString()
            }
          ])
        );
        
          return {
            ...s,
            timeOut: newTimeOut,
          };
        });

        setSlots(updated);
        setExtendHours(0);
        setSelectedSlot(null);
      }}
      >
  EXTEND
</button>

           <button
            onClick={() => {
            const updated = slots.map((s) =>
           s.id === selectedSlot.id
           ? { ...s, status: "available", bookedBy: null, timeIn: null, timeOut: null }
           : s
            );
            setSlots(updated);
             setSelectedSlot(null);
               }}>
             END TIME
             </button>

       </div>
     </>
   );
})()}

            {/* OTHER */}
           {selectedSlot.status === "occupied" &&
            Number(selectedSlot.user_id) !==
            Number(user?.id) && (
                <p>Slot #{selectedSlot.id} is already occupied</p>
              )}

            {/* MAINTENANCE */}
            {selectedSlot.status === "maintenance" && (
              <p>Slot #{selectedSlot.id} is under maintenance </p>
            )}

            <button onClick={() => setSelectedSlot(null)}>Close</button>
          </div>
        </div>
      )}

    

        {receipt && (
  <Receipt 
    receipt={receipt} 
    onClose={() => setReceipt(null)} 
  />
)}

    </div>

    
  );
}

export default ParkingSlots;