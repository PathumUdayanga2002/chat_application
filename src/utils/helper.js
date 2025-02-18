// helpers.js

/**
 * Format a date object into a readable string.
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted date string (e.g., "10:30 AM, Oct 25, 2023").
 */
export const formatDate = (date) => {
    if (!date) return '';
  
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  
  /**
   * Truncate a string to a specified length and add an ellipsis if necessary.
   * @param {string} text - The string to truncate.
   * @param {number} maxLength - The maximum length of the string.
   * @returns {string} - The truncated string.
   */
  export const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
  
    return `${text.slice(0, maxLength)}...`;
  };
  
  /**
   * Capitalize the first letter of a string.
   * @param {string} text - The string to capitalize.
   * @returns {string} - The capitalized string.
   */
  export const capitalize = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  
  /**
   * Generate a unique ID (useful for creating IDs for messages or other entities).
   * @returns {string} - A unique ID.
   */
  export const generateId = () => {
    return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  };
  
  /**
   * Validate an email address.
   * @param {string} email - The email address to validate.
   * @returns {boolean} - True if the email is valid, false otherwise.
   */
  export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  /**
   * Validate a password (at least 6 characters long).
   * @param {string} password - The password to validate.
   * @returns {boolean} - True if the password is valid, false otherwise.
   */
  export const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  /**
   * Debounce a function to limit how often it can be called.
   * @param {Function} func - The function to debounce.
   * @param {number} delay - The delay in milliseconds.
   * @returns {Function} - The debounced function.
   */
  export const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  // utils/helpers.js
export const getConversationId = (userId1, userId2) => {
  return userId1 < userId2 ? `${userId1}_${userId2}` : `${userId2}_${userId1}`;
};