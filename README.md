Deployed Link: https://dynamic-sfogliatella-51895f.netlify.app/

# Md Aashif Raza - LensLab

LensLab is a fully responsive photography portfolio website designed to showcase My front-end development skills and creative flair through an engaging user interface and interactive features.

## 🌟 Features

### Design & User Experience
- **Modern & Responsive Design**: Fully responsive layout that works perfectly on all devices
- **Smooth Animations**: CSS animations and JavaScript-powered scroll effects
- **Interactive Gallery**: Click on images to view them in a lightbox overlay
- **Parallax Effects**: Subtle parallax scrolling for enhanced visual appeal
- **Professional Typography**: Clean, readable fonts with proper hierarchy

### Navigation & Interaction
- **Smooth Scrolling**: Seamless navigation between sections
- **Mobile-Friendly Sidebar**: Collapsible navigation menu for mobile devices
- **Keyboard Navigation**: Support for keyboard shortcuts (Escape to close modals)
- **Loading States**: Visual feedback for user interactions

### Content Sections
- **Hero Section**: Eye-catching introduction with call-to-action buttons
- **Gallery**: Interactive photo gallery with hover effects and lightbox
- **Exhibits**: Showcase of past exhibitions with detailed information
- **About**: Personal introduction with statistics and background
- **Events**: Upcoming workshops and exhibitions with registration
- **Contact**: Contact form and information with interactive elements

### Technical Features
- **Performance Optimized**: Lazy loading images, debounced scroll events
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Cross-Browser Compatible**: Works on all modern browsers
- **SEO Optimized**: Proper meta tags, semantic structure, and alt text

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. **Clone or Download** the project files to your local machine

2. **File Structure**:
   ```
   Camera project/
   ├── index (1).html          # Main HTML file
   ├── style.css               # Stylesheet
   ├── script.js               # JavaScript functionality
   ├── photo.jpg               # Hero background image
   ├── Gallery/                # Gallery images
   ├── Exhibits/               # Exhibition images
   └── README.md               # This file
   ```

3. **Open the Website**:
   - **Option 1**: Double-click `index (1).html` to open in your browser
   - **Option 2**: Use a local server for better development experience

### Using a Local Server (Recommended)

For the best development experience, use a local server:


## ✉️ Contact Form & EmailJS Integration

The Contact section uses [EmailJS](https://www.emailjs.com/) to send messages directly from the website to the owner’s email address. When a user submits the contact form:
- The message is sent securely using EmailJS (no backend required).
- The user receives an automated confirmation email (auto-reply) with the following content:

  > Hi [Your Name],
  >
  > Thank you for reaching out! 🙌
  >
  > We’ve received your message:
  >
  > "[Your Message]"
  >
  > We’ll get back to you as soon as possible, typically within 24 hours.
  >
  > Best regards,
  > Md Aashif Raza
  >
  > ---
  >
  > This is an automated confirmation email. Please do not reply directly to this message.

The notification on the website also displays this confirmation message after a successful submission.

