async function loadAppData() {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load app data:', error);
    return null;
  }
}

async function init() {
  const data = await loadAppData();
  if (!data) return;

  const settings = data.sections.app_settings;
  document.documentElement.style.setProperty('--primary-color', settings.primary_color.value);
  document.documentElement.style.setProperty('--background-color', settings.background_color.value);

  const helloSection = data.sections.hello_world;
  document.getElementById('title').textContent = helloSection.title.value;

  const imgElement = document.getElementById('image');
  if (helloSection.image.value) {
    imgElement.src = helloSection.image.value;
  } else {
    imgElement.style.display = 'none';
  }

  document.getElementById('app-container').classList.add('loaded');
}

init();