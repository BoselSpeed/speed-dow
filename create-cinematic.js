const { execSync } = require('child_process');
const path = require('path');

const ffmpegPath = require('ffmpeg-static');
const inputVideo = '/home/daytona/uploads/Cartoon_family_morning_story_par…_20261007203423.mp4';
const srtFile = '/tmp/cartoon_audio.wav.srt';
const outputFile = path.join(process.cwd(), 'output_cinematic_subtitled.mp4');

// Cinematic filter: color grading + vignette + slight contrast/brightness
const videoFilter = `scale=720:1280,setsar=1,eq=brightness=0.05:contrast=1.1:saturation=0.9,vignette=PI/4.5,format=yuv420p`;

// Burn subtitles with Arabic-friendly styling
const subtitleFilter = `subtitles='${srtFile}':force_style='FontSize=20,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,Outline=2,Shadow=0,MarginV=30,Alignment=2'`;

const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "${videoFilter},${subtitleFilter}" -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k -movflags +faststart "${outputFile}"`;

console.log('Creating cinematic video with subtitles...');
try {
  execSync(cmd, { stdio: 'inherit' });
  console.log(`Saved to ${outputFile}`);
} catch (err) {
  console.error('FFmpeg failed:', err.message);
  process.exit(1);
}
