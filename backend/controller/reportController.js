const pdfParse = require('pdf-parse');

exports.uploadReport = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const data = await pdfParse(req.file.buffer);
    let text = data.text;

    if (text.length > 1000) {
      text = text.substring(0, 1000);
    }

    // Placeholder summary logic — replace with AI call if needed
    const summary = text.substring(0, 200) + (text.length > 200 ? '...' : '');

    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process PDF' });
  }
};
