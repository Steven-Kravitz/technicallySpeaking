const logout = async () => {
    const response = await fetch('/api/user/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/')
    } else {
      alert('Log Out Failed.')
    }
  }
  
  document.querySelector('#logout').addEventListener('click', logout)