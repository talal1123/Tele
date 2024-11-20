export const config = {
  emailjs: {
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  },
  database: {
    url: import.meta.env.VITE_DATABASE_URL,
  },
} as const;

export const validateConfig = () => {
  const required = [
    ['EMAILJS_PUBLIC_KEY', config.emailjs.publicKey],
    ['EMAILJS_SERVICE_ID', config.emailjs.serviceId],
    ['EMAILJS_TEMPLATE_ID', config.emailjs.templateId],
    ['DATABASE_URL', config.database.url],
  ];

  const missing = required
    .filter(([, value]) => !value)
    .map(([key]) => `VITE_${key}`);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
};