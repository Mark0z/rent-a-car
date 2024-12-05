import emailjs from 'emailjs-com';

export const sendMail = (data) => {
  emailjs
    .send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      data,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
    .then(
      () => {
        return true;
      },
      (error) => {
        return error.text;
      }
    );
};
