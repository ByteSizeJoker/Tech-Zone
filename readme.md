# Tech Zone

E-commerce web application for technology products built with vanilla HTML, CSS, and JavaScript.

## Project Structure

```
Tech-Zone/
├── main.html                    # Main application entry point
├── style.css                    # Main stylesheet
├── script.js                    # Main JavaScript file
├── README.md                    # Project documentation
├── font/                        # Custom fonts
├── images/                      # All image assets
│   ├── icons/
│   │   ├── dark/               # Dark theme icons
│   │   └── light/              # Light theme icons
│   ├── products/
│   │   ├── accessories/        # Gaming accessories images
│   │   ├── consoles/          # Gaming console images
│   │   ├── Laptops/           # Laptop images
│   │   ├── pcs/              # PC images
│   │   └── Sp&T/              # Smartphones & Tablets
│   └── *.jpg                   # Background/banner images
└── pages/                       # All HTML pages
    ├── Products/               # Product category pages
    │   ├── accessories.html
    │   ├── console-section.html
    │   ├── laptop-section.html
    │   ├── pc-section.html
    │   └── phone-table-section.html
    ├── about.html
    ├── account.html
    ├── buying-guide.html
    ├── cart.html
    ├── help.html
    ├── privacy.html
    └── tnc.html
```

## Development Setup

### Prerequisites
- Modern web browser with JavaScript enabled
- Local development server (optional but recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ByteSizeJoker/Tech-Zone.git
   cd Tech-Zone
   ```

2. Run locally:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx live-server
   
   # Or open index.html directly in browser
   ```

## Deployment
- Platform: Netlify
- Live URL: https://tech-zone-web.netlify.app/
- Auto-deploy from main branch

## Known Issues & Improvements Needed

### Current Issues
1. **No form validation** - No submittable forms implemented yet
2. **Save to cart** - Add to cart functionality not implemented
3. **Broken image links** - Only "Buy me a coffee" link image doesn't work, others load fine
4. **Search functionality** - Search bar not implemented yet
5. **Price formatting** - Out of stock button positioning shifts based on price length
6. **Cross-browser issues** - Layout inconsistent across different devices/browsers

### Performance Issues
1. **Large image files** - Compression attempts failed, need alternative optimization methods (try WebP format, online compressors like TinyPNG, or reduce image dimensions)
2. **No lazy loading** - All images load at once (implement `loading="lazy"` attribute or Intersection Observer API)

### Code Quality Issues
1. **Inline CSS** - Some styles written directly in HTML
2. **Global variables** - JavaScript uses global scope unnecessarily
3. **No error handling** - Functions don't handle edge cases
4. **Duplicate code** - Repeated DOM manipulation patterns
5. **Hard-coded data** - Product information embedded in HTML instead of dynamic

### UI/UX Issues
1. **Responsive breakpoints** - Layout doesn't work well on tablets (768px-1024px)
2. **Loading states** - No feedback when actions are processing
3. **Button states** - No visual feedback for clicked/hover states on all buttons
4. **Form feedback** - Page reloads instead of showing success/error messages

### Missing Functionality
1. **Product filtering** - Not implemented
2. **Sort options** - Not implemented
3. **Quantity controls** - Not implemented
4. **Remove from cart** - Not implemented (only static "no items" image)
5. **Order summary** - Not implemented
6. **Checkout process** - Not implemented

## Priority Fixes
1. Implement localStorage for cart persistence
2. Add form validation for all input fields  
3. Fix mobile navigation toggle
4. Optimize and compress image assets
5. Add error handling for failed image loads
6. Implement basic search functionality
7. Fix responsive layout on tablet screens
8. Add loading states for better UX
