const { execSync } = require('child_process');
const path = require('path');

const ffmpegPath = require('ffmpeg-static');
const inputFile = process.argv[2] || '/home/daytona/uploads/hh1.mp4';
const speed = parseFloat(process.argv[3]) || 0.5;

const outputFile = path.join(
  process.cwd(),
  `output_${speed}x.mp4`
);

const videoFilter = `setpts=${1 / speed}*PTS`;
const audioFilter = `atempo=${speed}`;

const cmd = `"${ffmpegPath}" -i "${inputFile}" -vf "${videoFilter}" -af "${audioFilter}" -c:v libx264 -c:a aac -movflags +faststart "${outputFile}"`;

console.log(`Processing ${inputFile} at ${speed}x speed...`);
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Saved to ${outputFile}`);
} catch (err) {
  console.error('FFmpeg failed:', err.message);
  process.exit(1);
}
