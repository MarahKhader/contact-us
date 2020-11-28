import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';



// Email validation
const emailRegex = RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

// Form validation
const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // Validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // Validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === '' && (valid = false);
  });

  return valid;
};

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: '',
      phone: '',
      subject: '',
      service: '',
      message: '',
      formErrors: {
        name: '',
        email: '',
        address: '',
        phone: '',
        subject: '',
        service: '',
        message: '',
      },
    };
  }

  toastifySuccess() {
    toast.success('Form sent!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
    });
  }

  toastifyFail() {
    toast.error('Form failed to send!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback fail',
    });
  }

  handleSubmit = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });

    e.preventDefault();

    if (formValid(this.state)) {
      // Handle form validation success
      const { name, email, address, phone, subject, service, message } = this.state;

      // Set template params
      let templateParams = {
        name: name,
        email: email,
        address: address,
        phone: phone,
        subject: subject,
        service: service,
        message: message,
      };

      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'userID');

      console.log(`
        --SUBMITTING--
        Name: ${name}
        Email: ${email}
        Address: ${address}
        Phone: ${phone}
        Subject: ${subject}
        Service: ${service}
        Message: ${message}
      `);
      
      this.toastifySuccess();
      this.resetForm();
    } else {
      // Handle form validation failure
      console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
      this.toastifyFail();
    }
  };

  // Function to reset form
  resetForm() {
    this.setState({
      name: '',
      email: '',
      address: '',
      phone: '',
      subject: '',
      service: '',
      message: '',
    });
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case 'name':
        formErrors.name = value.length < 1 ? 'Please enter your name.' : '';
        break;
      case 'email':
        formErrors.email = emailRegex.test(value) ? '' : 'Please enter a valid email address.';
        break;
      case 'address':
        formErrors.address = value.length < 1 ? 'Please enter your address.' : '';
        break;
      case 'phone':
        formErrors.phone = value.length < 1 ? 'Please enter your phone No.' : '';
        break;
      case 'subject':
        formErrors.subject = value.length < 1 ? 'Please enter a subject.' : '';
        break;
      case 'service':
        formErrors.service = value.length < 1 ? 'Please enter a service.' : '';
        break;
      case 'message':
        formErrors.message = value.length < 1 ? 'Please enter a message' : '';
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className='ContactForm'>
        <form id='contact-form' onSubmit={this.handleSubmit} noValidate>
          <div className='row'>
            <div className='col-6'>
              <h> Your Name : </h>
              <input
                type='text'
                name='name'
                value={this.state.name}
                className={`form-control formInput ${formErrors.name.length > 0 ? 'error' : null}`}
                onChange={this.handleChange}
                placeholder='Name'
                noValidate
              ></input>
              {formErrors.name.length > 0 && (
                <span className='errorMessage'>{formErrors.name}</span>
              )}
            </div>

            <div className='col-6'>
              <h> Your Work Email : </h>
              <input
                type='email'
                name='email'
                value={this.state.email}
                className={`form-control formInput ${formErrors.email.length > 0 ? 'error' : null}`}
                onChange={this.handleChange}
                placeholder='Email'
                noValidate
              ></input>
              {formErrors.email.length > 0 && (
                <span className='errorMessage'>{formErrors.email}</span>
              )}
            </div>

            <div className='col-6'>
              <h> Your Address : </h>
              <input
                type='address'
                name='address'
                value={this.state.address}
                className={`form-control formInput ${formErrors.address.length > 0 ? 'error' : null}`}
                onChange={this.handleChange}
                placeholder='Address'
                noValidate
              ></input>
              {formErrors.address.length > 0 && (
                <span className='errorMessage'>{formErrors.address}</span>
              )}
            </div>

            <div className='col-6'>
              <h> Your Phone Number : </h>
              <input
                type='phone'
                name='phone'
                value={this.state.phone}
                className={`form-control formInput ${formErrors.phone.length > 0 ? 'error' : null}`}
                onChange={this.handleChange}
                placeholder='Phone No.'
                noValidate
              ></input>
              {formErrors.phone.length > 0 && (
                <span className='errorMessage'>{formErrors.phone}</span>
              )}
            </div>
          </div>

          <div className='row'>
            <div className='col-6'>
            <fieldset className='jradio'>
            <h> Your Intrest : </h>
            <label>
              <input
                type="radio"
                name="subject"
                checked={this.state.subject === "interest"}
                onChange={this.handleChange}
                value="interest"
              />{" "}
              Interest in service
            </label>
            <label>
              <input
                type="radio"
                name="subject"
                checked={this.state.subject === "join team"}
                onChange={this.handleChange}
                value="join team"
              />{" "}
              Join to our team
            </label>
            <label>
              <input
                type="radio"
                name="subject"
                checked={this.state.subject === "another"}
                onChange={this.handleChange}
                value="another"
              />
              Another help
            </label>
          </fieldset>
          </div>
          <label className='select-s'>
            Select Service: 
            <select
              type="select"
              name="service"
              className='select-b'
              disabled={this.state.subject !== "interest"}
              onChange={this.handleChange}
              value={this.state.service}
            >
              <option>Recruitment Services</option>
              <option>Training Services</option>
              <option>Outsourcing Services</option>
              <option>Consulting Services</option>
              <option>Staff Augmentation</option>
              <option>CV Writing</option>
              <option>Cover Letter Writing</option>
              <option>CV Designing</option>
            </select>
          </label>

            <div className='col-6'>
              <h> Explain to us more :</h>
              <textarea
                rows='5'
                name='message'
                value={this.state.message}
                className={`msg formInput ${
                  formErrors.message.length > 0 ? 'error' : null
                }`}
                onChange={this.handleChange}
                placeholder='Message'
                noValidate
              ></textarea>
              {formErrors.message.length > 0 && (
                <span className='errorMessage'>{formErrors.message}</span>
              )}
            </div>
            <button className='submit-btn' type='submit'>
                Submit
              </button>
          </div>
        </form>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react/16.6.3/umd/react.production.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.6.3/umd/react-dom.production.min.js"></script>
        
        <ToastContainer />
      </div>
      
    );
  }
}

export default ContactForm;