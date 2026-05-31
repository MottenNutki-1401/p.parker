
import axios from "axios";

const BASE_URL = "http://localhost/smp_backend/api";


// GET PARKING SLOTS
export async function getParkingSlots() {

    const response = await fetch(
        `${BASE_URL}/parking-slots`
    );

    return await response.json();
}

//update parking
// UPDATE PARKING SLOT STATUS
export async function updateParkingSlotStatus(
  slotId,
  status
) {

  const response =
    await fetch(

      `${BASE_URL}/admin/parking-slots/${slotId}`,

      {

        method: "PUT",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          status: status
        })
      }
    );

  return await response.json();
}


// LOGIN USER
export async function loginUser(userData) {

    const response = await fetch(
        `${BASE_URL}/login`,
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)
        }
    );

    return await response.json();
}




// REGISTER USER
export async function registerUser(userData) {

    const response = await fetch(
        `${BASE_URL}/auth/register`,
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)
        }
    );

    return await response.json();
}


// GET USER PROFILE
export async function getProfile() {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/users/profile`,
        {

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();
}



//update userprofile
export async function updateProfile(userData) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/users/profile`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(userData)
        }
    );

    return await response.json();
}

// CREATE BOOKING
export async function createBooking(bookingData) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/bookings`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(bookingData)
        }
    );

    return await response.json();
}
// CREATE BILLING
export async function createBilling(
  billingData
) {

  const response =
    await fetch(

      `${BASE_URL}/billings`,

      {

        method: "POST",

        headers: {

          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(
            billingData
          )
      }
    );

  return await response.json();
}
//get booking 
export const getBookings =
  async () => {

    const response =
      await axios.get(
        `${BASE_URL}/admin/bookings`
      );

    return response.data;
};