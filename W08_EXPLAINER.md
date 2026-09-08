# W08 — Make It Do Something

## Dynamic feature: Contact form

I chose one real dynamic feature for the portfolio: the contact form.

### What is a backend?

A backend is the part of an application that handles work behind the page. The visitor sees the frontend in the browser, but the backend/service receives the data, processes it, and delivers or stores the result.

For this portfolio I use EmailJS as the backend-style email service, so I do not need to build and host my own server just to receive contact messages.

### What the feature does

A visitor enters their name, email, and message and presses **Send**. The page sends the form data to EmailJS. EmailJS uses the configured email service and template to deliver the message to my inbox.

The free EmailJS plan is enough for this portfolio because it currently allows 200 requests per month.

### Data flow

`Visitor → Portfolio form → JavaScript → EmailJS → configured email service → my inbox`

The HTML form contains named fields (`name`, `email`, and `message`). The JavaScript listens for the submit event, stops the normal page reload, and calls `emailjs.sendForm()` with the service ID, template ID, and the form itself. EmailJS reads the named fields and passes their values to the configured template.

### Testing

I test the feature by opening the live portfolio, entering a real test name, email, and message, clicking **Send**, and checking that the message arrives in my configured inbox. A successful submission shows the success message and clears the form.

The feature is intended as contact/lead capture and not as an automatic business decision system.