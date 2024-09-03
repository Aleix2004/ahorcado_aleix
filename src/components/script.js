document.addEventListener('DOMContentLoaded', function() {
    const profilePicture = document.querySelector('.profile-picture');
    const profileMenu = document.querySelector('.profile-menu');
    const blurBackground = document.createElement('div');
    
    blurBackground.className = 'blur-background';
    document.body.appendChild(blurBackground);
  
    profilePicture.addEventListener('click', function() {
      profileMenu.style.display = 'block';
      blurBackground.style.display = 'block';
    });
  
    blurBackground.addEventListener('click', function() {
      profileMenu.style.display = 'none';
      blurBackground.style.display = 'none';
    });
  });
  