// Contact form validation & input sanitization utilities [Batch F]

export interface ContactInput {
  name: string;
  email: string;
  message: string;
  hp?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateContactForm(input: ContactInput): ValidationResult {
  const errors: Record<string, string> = {};

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

  // Honeypot field must remain empty
  if (input.hp && input.hp.trim().length > 0) {
    errors.hp = "Bot detected.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function sanitizeInput(str: string): string {
  return str.replace(/[<>]/g, "").trim();
}
