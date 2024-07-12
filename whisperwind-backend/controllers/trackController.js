const fs = require('fs');
const path = require('path');

const sanitizeJSONString = (jsonString) => {
  return jsonString
    .replace(/(\w+):/g, '"$1":')
    .replace(/'/g, '"')
    .replace(/,\s*}/g, '}')
    .replace(/,\s*]/g, ']');
};

const addTrackToCategoryPage = (req, res) => {
  const { title, imageUrl, audioUrl, categoryName } = req.body;

  const filePath = path.resolve(__dirname, '..', '..', 'whisperwind', 'src', 'pages', 'CategoryPage.js');
  console.log('Using file path:', filePath);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading CategoryPage.js:', err);
      return res.status(500).json({ error: 'An error occurred while reading CategoryPage.js' });
    }

    console.log('CategoryPage.js content before update:', data);

    const categoryArrayRegex = new RegExp(`('${categoryName}': \\[)([^\\]]*)\\]`, 's');
    const match = data.match(categoryArrayRegex);

    if (!match) {
      console.error('Category not found in CategoryPage.js');
      return res.status(400).json({ error: 'Category not found in CategoryPage.js' });
    }

    const newItem = `  { "title": "${title.replace(/"/g, '\\"')}", "imageUrl": "${imageUrl.replace(/"/g, '\\"')}", "audioUrl": "${audioUrl.replace(/"/g, '\\"')}" },\n`;
    const updatedArray = `${match[1]}\n${newItem}${match[2]}]`;
    const updatedData = data.replace(categoryArrayRegex, updatedArray);

    console.log('CategoryPage.js content after update:', updatedData);

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to CategoryPage.js:', err);
        return res.status(500).json({ error: 'An error occurred while writing to CategoryPage.js' });
      }

      res.status(200).json({ message: 'Track added successfully' });
    });
  });
};

const getAllTracks = (req, res) => {
  const filePath = path.resolve(__dirname, '..', '..', 'whisperwind', 'src', 'pages', 'CategoryPage.js');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading CategoryPage.js:', err);
      return res.status(500).json({ error: 'An error occurred while reading CategoryPage.js' });
    }

    const sanitizedData = sanitizeJSONString(data);

    const categoryArrayRegex = /'(.*)': \[([^\]]*)\]/g;
    let match;
    const tracks = [];

    while ((match = categoryArrayRegex.exec(sanitizedData)) !== null) {
      const categoryName = match[1];
      const categoryTracks = match[2].split('},').map(track => track.trim() + '}');
      categoryTracks.pop();
      categoryTracks.forEach(track => {
        try {
          const trackObj = JSON.parse(track.replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
          trackObj.categoryName = categoryName;
          tracks.push(trackObj);
        } catch (e) {
          console.error('Error parsing track JSON:', track, e);
        }
      });
    }

    res.status(200).json(tracks);
  });
};

module.exports = { addTrackToCategoryPage, getAllTracks };
