import test from "node:test";
import assert from "node:assert/strict";

// Contact form validation logic test
function validateContactForm(input) {
  const errors = {};

  if (!input.name || input.name.trim().length === 0) {
    errors.name = "Name is required.";
  } else if (input.name.trim().length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || input.email.trim().length === 0) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(input.email.trim())) {
    errors.email = "Please enter a valid email address.";
  } else if (input.email.trim().length > 120) {
    errors.email = "Email must be 120 characters or fewer.";
  }

  if (!input.message || input.message.trim().length === 0) {
    errors.message = "Message is required.";
  } else if (input.message.trim().length > 2000) {
    errors.message = "Message must be 2000 characters or fewer.";
  }

  // Honeypot field
  if (input.hp && input.hp.trim().length > 0) {
    errors.hp = "Bot detected.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

function sanitizeInput(str) {
  return str.replace(/[<>]/g, "").trim();
}

test("validateContactForm passes with valid inputs", () => {
  const result = validateContactForm({
    name: "Aditya Singh",
    email: "aditya@example.com",
    message: "Hello, let's talk about machine learning projects!",
  });
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
});

test("validateContactForm fails when name is empty", () => {
  const result = validateContactForm({
    name: "   ",
    email: "aditya@example.com",
    message: "Valid message",
  });
  assert.equal(result.valid, false);
  assert.equal(result.errors.name, "Name is required.");
});

test("validateContactForm fails with invalid email format", () => {
  const result = validateContactForm({
    name: "Aditya",
    email: "not-an-email",
    message: "Valid message",
  });
  assert.equal(result.valid, false);
  assert.equal(result.errors.email, "Please enter a valid email address.");
});

test("validateContactForm detects honeypot bot trap", () => {
  const result = validateContactForm({
    name: "Bot",
    email: "bot@spam.com",
    message: "Spam message",
    hp: "spam-bot-value",
  });
  assert.equal(result.valid, false);
  assert.equal(result.errors.hp, "Bot detected.");
});

test("sanitizeInput strips HTML tags to prevent XSS", () => {
  const dirty = "<script>alert('xss')</script>Hello World";
  const clean = sanitizeInput(dirty);
  assert.equal(clean.includes("<"), false);
  assert.equal(clean.includes(">"), false);
});
