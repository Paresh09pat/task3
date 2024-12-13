import React, { useState } from "react";
import axios from "axios";

const PostToApi = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [headersData, setHeadersData] = useState(null);
  const [responseBody, setResponseBody] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Allow only numbers and limit length to 10
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const response = await axios.post(
        "https://chimpu.online/api/post.php",
        new URLSearchParams({ phonenumber: phoneNumber }),
        { validateStatus: false }
      );

      // Extract and set headers data
      const headersWithPhone = {
        ...response.headers,
        phonenumber: phoneNumber, // Add the submitted phone number
      };
      setHeadersData(headersWithPhone);
      setResponseBody(response.data); // Capture the response body
    } catch (error) {
      console.error("Error posting to API:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }} className="maindiv">
      <h2>Post Phone Number</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handleInputChange}
          required
          style={{ marginLeft: "10px", padding: "5px" }}
          placeholder="Enter 10-digit number"
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "5px",
            cursor: phoneNumber.length === 10 ? "pointer" : "not-allowed",
          }}
          disabled={phoneNumber.length !== 10} // Disable button if number isn't 10 digits
        >
          Submit
        </button>
      </form>

      {headersData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Headers Received:</h3>
          <pre style={{ backgroundColor: "#f4f4f4", padding: "10px" }}>
            {JSON.stringify(headersData, null, 2)}
          </pre>
        </div>
      )}

      
    </div>
  );
};

export default PostToApi;
