/**
 * Send OTP to the provided phone number
 * @param {string} phoneNumber - 10 digit phone number
 * @returns {Promise} - Returns OTP (in production, this would be sent via SMS)
 */
export const sendOTP = async (phoneNumber) => {
  try {
    // TODO: Replace with actual API endpoint
    // const response = await api.post('/auth/send-otp', { phoneNumber });

    // Dummy implementation for now
    const dummyOTP = Math.floor(1000 + Math.random() * 9000).toString();
    console.log('Dummy OTP sent:', dummyOTP); // For development testing

    return {
      success: true,
      message: 'OTP sent successfully',
      otp: dummyOTP, // Remove this in production
    };
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error(error.response?.data?.message || 'Failed to send OTP');
  }
};

/**
 * Verify OTP and login user
 * @param {string} phoneNumber - 10 digit phone number
 * @param {string} otp - OTP entered by user
 * @returns {Promise} - Returns authentication status and token
 */
export const verifyOTP = async (phoneNumber, otp) => {
  try {
    // TODO: Replace with actual API endpoint
    // const response = await api.post('/auth/verify-otp', { phoneNumber, otp });

    // Dummy implementation for now
    // In development, accept any 4-digit OTP
    const isValid = otp.length === 4;

    if (!isValid) {
      throw new Error('Invalid OTP');
    }

    // Dummy token
    const dummyToken = 'dummy_jwt_token_' + Date.now();

    return {
      success: true,
      message: 'Login successful',
      token: dummyToken,
      user: {
        phoneNumber,
        id: 'user_' + phoneNumber,
      },
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw new Error(error.response?.data?.message || 'Failed to verify OTP');
  }
};

/**
 * Logout user
 * @returns {Promise}
 */
export const logout = async () => {
  try {
    // TODO: Replace with actual API endpoint
    // await api.post('/auth/logout');

    // Backend should clear the authentication cookie on logout.
    // If we later decide to store client-side data, clear it here.
    // Example: await api.post('/auth/logout');

    return { success: true };
  } catch (error) {
    console.error('Error logging out:', error);
    throw new Error('Failed to logout');
  }
};
