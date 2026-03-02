import fs from 'fs';

async function fetchLogo() {
  try {
    const res = await fetch('http://localhost:3000/api/generate-logo');
    const data = await res.json();
    if (data.success) {
      const base64 = data.image.split(',')[1];
      fs.writeFileSync('public/logo.png', Buffer.from(base64, 'base64'));
      console.log('Saved to public/logo.png');
    } else {
      console.error('Failed:', data.error);
    }
  } catch (e) {
    console.error('Error fetching:', e);
  }
}

fetchLogo();
