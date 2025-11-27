# Alex Chen - Software Engineer Portfolio Template

A complete, ready-to-use software engineer portfolio website template built with HTML, CSS, and vanilla JavaScript. This turnkey solution includes fully populated dummy data and requires no build steps or external dependencies except JotForm for the contact form.

## 🚀 Quick Start

1. **Download and extract** all files to a folder
2. **Open `index.html`** in your web browser - it works immediately!
3. **Customize** by following the 3-step guide below

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML file with all content
├── css/style.css       # Complete stylesheet with animations
├── js/main.js          # All interactive functionality
└── README.md           # This file
```

## 🎨 Features

### ✅ Complete Functionality
- **Responsive Design** - Mobile-first, works on all devices
- **Dark/Light Mode** - Toggle with localStorage persistence
- **Smooth Scrolling** - Navigation with active section highlighting
- **Project Filtering** - Filter by "All", "Frontend", "Backend", "Full Stack"
- **Animated Elements** - Fade-in on scroll, skill bars, particles
- **Contact Form** - JotForm integration with fallback
- **SEO Optimized** - Complete meta tags, Open Graph, Twitter Card
- **Performance** - Optimized loading, no external dependencies

### 🎨 Design Features
- **Modern Gradient** - Navy (#0a192f) with cyan accent (#64ffda)
- **Professional Typography** - Inter font family
- **Smooth Animations** - CSS transitions and JavaScript animations
- **Interactive Elements** - Hover effects, loading spinner, back-to-top
- **Accessibility** - ARIA labels, semantic HTML, keyboard navigation

## 🛠️ 3-Step Customization Guide

### Step 1: Replace Dummy Content

**In `index.html`:**

1. **Personal Information** (lines 15-25):
   ```html
   <title>YOUR NAME - YOUR TITLE</title>
   <meta name="description" content="YOUR DESCRIPTION">
   <meta property="og:title" content="YOUR NAME - YOUR TITLE">
   ```

2. **Hero Section** (lines 120-130):
   ```html
   <span class="hero-name">YOUR NAME</span>
   <span class="hero-subtitle">YOUR TITLE</span>
   <p class="hero-tagline">YOUR TAGLINE</p>
   ```

3. **About Section** (lines 180-220):
   - Replace professional headshot URL: `https://i.pravatar.cc/300?img=12`
   - Update your personal bio and experience
   - Modify skill percentages in the `data-width` attributes

4. **Projects Section** (lines 250-450):
   - Replace project titles, descriptions, and tech stacks
   - Update placeholder images: `https://via.placeholder.com/600x400`
   - Add your actual project URLs for live demos and GitHub links

5. **Experience Timeline** (lines 470-550):
   - Replace with your actual work experience
   - Update company names, dates, locations, and bullet points
   - Modify education information

### Step 2: Update Contact Form

**Important: The contact form uses JotForm and requires setup:**

1. **Create JotForm Account**:
   - Go to [jotform.com](https://jotform.com)
   - Create a free account
   - Create a new contact form or use a template

2. **Get Your Form ID**:
   - Publish your form and copy the form ID from the URL
   - Example: `https://form.jotform.com/YOUR_FORM_ID/portfolio-contact`

3. **Update Form Embed** (lines 580-590):
   ```html
   <iframe 
     id="contact-form" 
     src="https://form.jotform.com/YOUR_FORM_ID/portfolio-contact" 
     style="width:100%;height:500px;border:none;"
     title="Contact Form"
     loading="lazy">
   </iframe>
   ```

4. **Update Email Address** (lines 570-575):
   ```html
   <div class="contact-item">
     <span class="contact-text">your.email@domain.com</span>
   </div>
   ```

### Step 3: Customize Design

**In `css/style.css`:**

1. **Color Scheme** (lines 10-50):
   ```css
   :root {
     --primary-navy: #0a192f;    /* Main background */
     --secondary-navy: #112240;  /* Secondary background */
     --accent-cyan: #64ffda;     /* Accent color */
     /* ... other variables */
   }
   ```

2. **Typography** (lines 60-80):
   ```css
   --font-primary: 'Inter', system-ui, sans-serif;
   --text-xs: 0.75rem;
   --text-sm: 0.875rem;
   /* ... other sizes */
   ```

3. **Spacing** (lines 85-95):
   ```css
   --spacing-xs: 0.5rem;
   --spacing-sm: 1rem;
   --spacing-md: 1.5rem;
   /* ... other spacing */
   ```

**In `js/main.js` (optional):**

4. **Particle Count** (line 25):
   ```javascript
   particleCount: 30, // Reduce for better performance
   ```

5. **Animation Speed** (line 22):
   ```javascript
   animationDuration: 200, // Faster animations
   ```

## 🎯 Advanced Customization

### Adding New Projects

1. **Copy the project card structure** (lines 280-320 in index.html)
2. **Update the data-category** attribute:
   ```html
   <div class="project-card" data-category="frontend">
   ```
3. **Add your project details** and ensure it appears in the filter

### Modifying Skills

1. **Update skill percentages** in the `data-width` attributes (lines 200-240)
2. **Add new skills** by copying the skill item structure
3. **The JavaScript automatically animates** based on the data-width values

### Custom Animations

The CSS includes several animation classes:
- `.fade-in` - Fade in on scroll
- `.slide-in-left` - Slide from left
- `.slide-in-right` - Slide from right

Add these classes to any element to enable scroll animations.

## 📱 Responsive Breakpoints

- **Mobile**: 480px and below
- **Tablet**: 768px and below  
- **Desktop**: 1024px and above
- **Large Screens**: 1200px and above

The design is mobile-first and automatically adapts to all screen sizes.

## 🔧 Technical Details

### Browser Support
- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Mobile**: iOS Safari 12+, Chrome Mobile 60+
- **Features**: CSS Grid, Flexbox, Intersection Observer, CSS Variables

### Performance Optimizations
- **No External Dependencies** - Everything is self-contained
- **Optimized Images** - Uses placeholder services for demo content
- **Lazy Loading** - Images load as needed
- **Debounced Events** - Smooth scroll and resize handling
- **CSS Variables** - Easy theme switching without re-renders

### Accessibility Features
- **Semantic HTML** - Proper heading hierarchy and landmarks
- **ARIA Labels** - Screen reader support for interactive elements
- **Keyboard Navigation** - Tab order and focus management
- **Color Contrast** - WCAG AA compliant color ratios
- **Reduced Motion** - Respects user preferences

## 🚀 Deployment

### Option 1: Static Hosting
Upload all files to any static hosting service:
- **GitHub Pages** - Push to repository and enable Pages
- **Netlify** - Drag and drop folder to deploy
- **Vercel** - Connect repository or upload files
- **AWS S3** - Upload to S3 bucket with static hosting

### Option 2: Local Development
```bash
# Simple HTTP server
python -m http.server 8000
# or
npx serve .

# Open http://localhost:8000
```

### Option 3: Custom Domain
1. **Purchase domain** from any registrar
2. **Update DNS** to point to your hosting service
3. **Update contact email** in the HTML
4. **Update social links** in the footer

## 📋 Checklist Before Publishing

- [ ] Replace all dummy content with your information
- [ ] Update contact form with your JotForm ID
- [ ] Test on mobile devices
- [ ] Verify all links work correctly
- [ ] Check contact form submission
- [ ] Test dark/light mode toggle
- [ ] Verify project filtering works
- [ ] Check scroll animations
- [ ] Test navigation menu on mobile
- [ ] Update social media links
- [ ] Add your professional headshot
- [ ] Customize color scheme if desired

## 🎨 Color Reference

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Navy | #0a192f | Main background |
| Secondary Navy | #112240 | Card backgrounds |
| Accent Cyan | #64ffda | Links, buttons, highlights |
| Text Primary | #e2e8f0 | Main text (dark mode) |
| Text Secondary | #cbd5e1 | Secondary text |
| Text Light | #94a3b8 | Muted text |

## 🤝 Contributing

This template is designed for personal use. Feel free to:
- Fork and modify for your needs
- Share improvements
- Report issues or bugs

## 📄 License

This template is open source and available under the MIT License.

## 💡 Tips for Success

1. **Keep content updated** - Regularly update projects and experience
2. **Use high-quality images** - Professional photos and project screenshots
3. **Test thoroughly** - Check all functionality before publishing
4. **Optimize performance** - Compress images, minify files for production
5. **Monitor analytics** - Track visitor engagement and popular content
6. **Keep it simple** - Focus on clear communication over flashy effects

## 🆘 Troubleshooting

### Common Issues

**Contact form not working:**
- Verify JotForm ID is correct
- Check form is published and accessible
- Test fallback form as backup

**Animations not working:**
- Check browser supports Intersection Observer
- Verify JavaScript is enabled
- Look for console errors

**Mobile menu not opening:**
- Ensure JavaScript is loaded
- Check for CSS conflicts
- Verify element IDs match

**Theme not switching:**
- Check localStorage is available
- Verify CSS variables are supported
- Look for JavaScript errors

### Browser Console
Open Developer Tools (F12) and check the Console tab for any error messages.

### Getting Help
If you encounter issues:
1. Check the browser console for error messages
2. Verify all files are in the correct location
3. Test with a different browser
4. Try the fallback contact form
5. Check that JavaScript is enabled

---

**Built with ❤️ using HTML, CSS, and JavaScript**

*Ready to showcase your skills and projects to the world! 🚀*