"use client";

const VerificationMessage = ({
  email,
  loading,
  setIsLogin,
  setShowVerificationMessage,
}) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-blue-600">
        Verification Link Sent!
      </h2>
      <p className="text-gray-600 mt-2">
        A verification link has been sent to{" "}
        <span className="font-semibold">{email}</span>. Please check your inbox
        to verify your account.
      </p>
      <button
        onClick={() => {
          setIsLogin(true);
          setShowVerificationMessage(false);
        }}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
        disabled={loading}
      >
        Go to Login
      </button>
    </div>
  );
};

export default VerificationMessage;
