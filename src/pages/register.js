import { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useRouter } from "next/router";

Modal.setAppElement("#__next");

export default function Home() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const sendOtp = async () => {
    try {
      setError(null);
      const response = await axios.post("http://localhost:8000/send-otp", {
        phone,
      });
      if (response.data.success) {
        setIsOtpSent(true);
        setModalIsOpen(true);
      }
    } catch (error) {
      setError("Failed to send OTP. Try again.");
    }
  };

  const verifyOtp = async () => {
    try {
      setError(null);
      const response = await axios.post("http://localhost:8000/verify-otp", {
        phone,
        otp,
      });
      if (response.data.success) {
        setModalIsOpen(false);
        router.push("/dashboard");
      }
    } catch (error) {
      setError("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">WhatsApp OTP Login</h1>
      <input
        type="tel"
        placeholder="Enter phone number"
        className="p-2 border rounded w-64 mb-2"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        onClick={sendOtp}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isOtpSent}
      >
        {isOtpSent ? "OTP Sent" : "Register"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded shadow-lg w-80"
      >
        <h2 className="text-xl font-bold mb-2">Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          className="p-2 border rounded w-full mb-2"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            onClick={verifyOtp}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
