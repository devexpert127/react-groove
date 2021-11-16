# Form component

This component is designed to simply form workflow. It can be used in 2 different ways each with it's own set of rules: as a regular form to send an email using template(handled by [EmailJS](https://www.emailjs.com/) service for now) and as a subscription form to make a single request with form data to specified url.

`Form` component provides 3 callback for better control:

- `onBeforeSubmit` to be called before submit process is started
- `onSubmitSuccess` to be called after submit process has successfully finished
- `onSubmitFail` to be called if error happened during submission process

## Regular Form

### Props

| Name            | Required | Type                                                 | Default value | Description                                                                     |
| --------------- | -------- | ---------------------------------------------------- | ------------- | ------------------------------------------------------------------------------- |
| emailJSUserId   | +        | string                                               | -             | userId provided by EmailJS service                                              |
| toEmail         | +        | string                                               | -             | Address to send email to                                                        |
| templateId      | +        | string                                               | -             | Template id from EmailJS service to used to fill in the data                    |
| onBeforeSubmit  | -        | (event: React.FormEvent<HTMLFormElement>) => void    | -             | Handler called before submit process is started                                 |
| onSubmitSuccess | -        | (event: React.FormEvent<HTMLFormElement>) => void    | -             | Handler called after submit process successfully finished                       |
| onSubmitFail    | -        | (error: Error) => void                               | -             | Handler called when error happened during submission                            |
| validateForm    | -        | (event: React.FormEvent<HTMLFormElement>) => boolean | -             | Function to validate form inputs. Return true if form is valid, false otherwise |

### Usage

    <Form
      emailJSUserId="email_js_user_id"
      toEmail="your@email.com"
      templateId="some_template_id"
      onBeforeSubmit={() => {}}
      onSubmitSuccess={() => {}}
      onSubmitFail={() => {}}
      validateForm={() => true}
    >
      <input name="first_name" placeholder="First Name" type="text" />
      <input name="last_name" placeholder="Last Name" type="text" />
      <button type="submit">Submit</button>
    </Form>

## Subscription Form

### Props

| Name            | Required | Type                                                 | Default value | Description                                                                     |
| --------------- | -------- | ---------------------------------------------------- | ------------- | ------------------------------------------------------------------------------- |
| subscription    | +        | true                                                 | -             | Used to enable subscription form logics                                         |
| subscriptionUrl | +        | string                                               | -             | Url where component will send form data to                                      |
| onBeforeSubmit  | -        | (event: React.FormEvent<HTMLFormElement>) => void    | -             | Handler called before submit process is started                                 |
| onSubmitSuccess | -        | (event: React.FormEvent<HTMLFormElement>) => void    | -             | Handler called after submit process successfully finished                       |
| onSubmitFail    | -        | (error: Error) => void                               | -             | Handler called when error happened during submission                            |
| validateForm    | -        | (event: React.FormEvent<HTMLFormElement>) => boolean | -             | Function to validate form inputs. Return true if form is valid, false otherwise |

### Usage

    <Form
      subscription
      subscriptionUrl="/my-subscription/url"
      onBeforeSubmit={() => {}}
      onSubmitSuccess={() => {}}
      onSubmitFail={() => {}}
      validateForm={() => true}
    >
      <input
        name="email"
        placeholder="Email"
        type="email"
      />
      <input
        name="test"
        placeholder="Email"
        type="hidden"
      />
      <button type="submit">Submit</button>
    </Form>
