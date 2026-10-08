const { execSync } = require('child_process');
const path = require('path');

const ffmpegPath = require('ffmpeg-static');
const video1 = '/home/daytona/uploads/Cartoon_family_morning_story_par…_20261007203423.mp4';
const video2 = '/home/daytona/uploads/Family_hugging_and_waving_together_20261007203413.mp4';
const concatFile = path.join('/tmp', 'concat_list.txt');
const outputFile = path.join(process.cwd(), 'output_merged_dark.mp4');

// Create concat list
const fs = require('fs');
fs.writeFileSync(concatFile, `file '${video1}'\nfile '${video2}'\n`);

// Merge videos + remove audio + apply very dark filter
// brightness=0.15 means very dark (15% brightness)
// contrast=1.3 slightly increases contrast to preserve details in shadows
const videoFilter = `scale=720:1280,setsar=1,eq=brightness=-0.25:contrast=1.3:saturation=0.3,format=yuv420p`;

const cmd = `"${ffmpegPath}" -y -f concat -safe 0 -i "${concatFile}" -vf "${videoFilter}" -an -c:v libx264 -preset slow -crf 20 -movflags +faststart "${outputFile}"`;

console.log('Merging videos with dark filter and no audio...');
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Saved to ${outputFile}`);
} catch (err) {
  console.error('FFmpeg failed:', err.message);
  process.exit(1);
}
