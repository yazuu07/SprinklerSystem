document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signInBtn = document.querySelector('.sign-in-btn');
    const demoEmail = document.querySelector('.demo-email');
    const demoPassword = document.querySelector('.demo-password');
    const signUpLink = document.getElementById('signUpLink');
  
    // Demo account credentials
    const DEMO_CREDENTIALS = {
      email: 'demo@example.com',
      password: 'demo123'
    };
  
    // Fill demo credentials when clicked
    demoEmail.addEventListener('click', function() {
      emailInput.value = DEMO_CREDENTIALS.email;
      emailInput.focus();
    });
  
    demoPassword.addEventListener('click', function() {
      passwordInput.value = DEMO_CREDENTIALS.password;
      passwordInput.focus();
    });
  
    // Form submission
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      const password = passwordInput.value;
  
      // Basic validation
      if (!email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
      }
  
      if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address', 'error');
        return;
      }
  
      // Show loading state
      signInBtn.classList.add('loading');
      signInBtn.textContent = '';
  
      // Simulate login process
      setTimeout(() => {
        if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
          showMessage('Login successful! Redirecting...', 'success');
          setTimeout(() => {
            // In a real app, you would redirect to the dashboard
            alert('Welcome to your watering system dashboard!');
            resetForm();
          }, 1500);
        } else {
          showMessage('Invalid email or password', 'error');
        }
        
        // Reset button state
        signInBtn.classList.remove('loading');
        signInBtn.textContent = 'Sign In';
      }, 2000);
    });
  
    // Sign up link
    signUpLink.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Sign up functionality would be implemented here');
    });
  
    // Helper functions
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    function showMessage(message, type) {
      // Remove existing messages
      const existingMessage = document.querySelector('.message');
      if (existingMessage) {
        existingMessage.remove();
      }
  
      // Create new message
      const messageDiv = document.createElement('div');
      messageDiv.className = `message ${type}`;
      messageDiv.textContent = message;
      
      // Add styles
      messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' 
          ? 'background: #10b981; color: white;' 
          : 'background: #ef4444; color: white;'
        }
      `;
  
      document.body.appendChild(messageDiv);
  
      // Remove message after 3 seconds
      setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          if (messageDiv.parentNode) {
            messageDiv.remove();
          }
        }, 300);
      }, 3000);
    }
  
    function resetForm() {
      emailInput.value = '';
      passwordInput.value = '';
      signInBtn.classList.remove('loading');
      signInBtn.textContent = 'Sign In';
    }
  
    // Add CSS animations for messages
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  });


  function saveProfile() {
    const name = document.getElementById('usernameInput').value.trim();
    if (name.length < 1) return alert("Please enter a valid name.");

    localStorage.setItem("username", name);
    alert("Profile saved!");
    updateWelcomeText();
}
function updateWelcomeText() {
    const name = localStorage.getItem("username") || "User";
    const welcomeEls = document.querySelectorAll('.welcome-text');

    welcomeEls.forEach(el => {
        el.textContent = `Welcome back, ${name}!`;
    });
}

document.addEventListener("DOMContentLoaded", updateWelcomeText);


