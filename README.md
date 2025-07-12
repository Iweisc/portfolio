# Lewis - Portfolio Website

A clean, modern, and professional portfolio website designed to showcase my skills, projects, and experience as a Full Stack Web Developer.

## Features

- Responsive design that works on all devices
- Clean and professional UI following best practices
- Interactive sections with smooth animations
- "Ted Trend" toggle between Work Experience and Education
- Skills showcase organized by category
- Project cards with descriptions and links
- Contact information for easy accessibility

## Technologies Used

- HTML5
- CSS3 (with CSS variables for easy customization)
- JavaScript (vanilla, no frameworks needed)
- Font Awesome for icons
- Google Fonts (Poppins)

## How to Use

1. Clone this repository to your local machine
2. Customize the HTML content in `index.html` with your own information
3. Modify the colors and styling in `styles.css` if desired
4. Update project images and links
5. Deploy to your preferred hosting service (GitHub Pages, Netlify, Vercel, etc.)

## Customization Tips

### Changing Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` selector in `styles.css`:

```css
:root {
  --primary-color: #6a0dad; /* Main purple color */
  --primary-light: #9c27b0; /* Lighter purple for hover effects */
  --secondary-color: #2d3e50; /* Dark blue-gray for secondary elements */
  /* ... other colors ... */
}
```

### Adding/Removing Projects

To add a new project, copy the project card HTML structure and update the content:

```html
<div class="project-card">
  <div class="project-image">
    <img src="path-to-your-project-image.jpg" alt="Project Name">
  </div>
  <div class="project-info">
    <h3>Project Name</h3>
    <p>Project description goes here.</p>
    <div class="project-tags">
      <span>Technology 1</span>
      <span>Technology 2</span>
    </div>
    <div class="project-links">
      <a href="#" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
      <a href="#" target="_blank"><i class="fab fa-github"></i> Source Code</a>
    </div>
  </div>
</div>
```

### Updating Experience & Education

Modify the content within the tab sections to reflect your own experience and education:

```html
<div class="tab-content active" id="work">
  <div class="timeline-item">
    <h3>Your Job Title</h3>
    <p class="timeline-meta">Company Name • Start Year - End Year</p>
    <p>Description of your responsibilities and achievements.</p>
  </div>
  <!-- Add more timeline items as needed -->
</div>
```

## Credits

- Profile GIF from [GitHub Octocat](https://github.com/5713670/github-profile-readme-templates)
- Skill icons from [Skill Icons](https://skillicons.dev/)
- Font Awesome for the icons
- Google Fonts for the Poppins font family 