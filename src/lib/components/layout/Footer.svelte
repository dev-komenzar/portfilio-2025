<script lang="ts">
  const currentYear = new Date().getFullYear();
  
  // Placeholder for translations
  const footer = {
    copyright: '© {year} Portfolio',
    rights: 'All rights reserved.',
    links: {
      github: 'GitHub',
      twitter: 'Twitter',
      linkedin: 'LinkedIn'
    }
  };
</script>

<footer class="footer">
  <div class="container footer-container">
    <div class="footer-content">
      <div class="footer-copyright">
        <p>{footer.copyright.replace('{year}', currentYear.toString())} - {footer.rights}</p>
      </div>
      
      <div class="footer-social">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-link">
          <span class="social-icon">
            <!-- GitHub icon (simplified) -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </span>
          <span class="social-text">{footer.links.github}</span>
        </a>
        
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="social-link">
          <span class="social-icon">
            <!-- Twitter/X icon (simplified) -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </span>
          <span class="social-text">{footer.links.twitter}</span>
        </a>
        
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link">
          <span class="social-icon">
            <!-- LinkedIn icon (simplified) -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </span>
          <span class="social-text">{footer.links.linkedin}</span>
        </a>
      </div>
    </div>
  </div>
</footer>

<style>
  .footer {
    background-color: var(--color-surface);
    border-top: 1px solid var(--color-border);
    padding: var(--space-8) 0;
    margin-top: auto;
  }
  
  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .footer-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }
  
  .footer-copyright {
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    text-align: center;
  }
  
  .footer-social {
    display: flex;
    gap: var(--space-4);
  }
  
  .social-link {
    display: flex;
    align-items: center;
    color: var(--color-text-secondary);
    transition: color var(--transition-fast);
  }
  
  .social-link:hover {
    color: var(--color-primary);
  }
  
  .social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .social-text {
    display: none;
    margin-left: var(--space-2);
  }
  
  /* Desktop styles */
  @media (min-width: 768px) {
    .footer-content {
      flex-direction: row;
      justify-content: space-between;
    }
    
    .footer-copyright {
      text-align: left;
    }
    
    .social-text {
      display: inline;
    }
  }
</style>