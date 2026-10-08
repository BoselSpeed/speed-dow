const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const ffmpegPath = require('ffmpeg-static');
const inputVideo = '/home/daytona/uploads/Cartoon_family_morning_story_par…_20261007203423.mp4';
const audioFile = path.join('/tmp', 'cartoon_audio.wav');
const srtFile = path.join('/tmp', 'cartoon_subtitles.srt');
const outputFile = path.join(process.cwd(), 'output_cinematic_subtitled.mp4');

// Extract audio
console.log('Extracting audio...');
execSync(`"${ffmpegPath}" -y -i "${inputVideo}" -vn -acodec pcm_s16le -ar 16000 -ac 1 "${audioFile}"`, { stdio: 'inherit' });

// Transcribe with whisper
console.log('Transcribing audio with Whisper...');
const { nodewhisper } = require('nodejs-whisper');

(async () => {
  await nodewhisper(audioFile, {
    modelName: 'tiny',
    autoDownloadModelName: 'tiny',
    modelRootPath: '/tmp/whisper-models',
    removeWavFileAfterTranscription: false,
    outputInSrt: true,
    outputInText: false,
    whisperOptions: {
      outputInSrt: true,
      language: 'arabic',
      translateToEnglish: false,
      timestamps_length: 20,
      splitOnWord: true,
    },
    logger: {
      log: (msg) => console.log(msg),
      error: (msg) => console.error(msg),
      info: (msg) => console.log(msg),
      debug: (msg) => {},
      warn: (msg) => console.warn(msg),
    },
  });

  // Move SRT to expected location
  const generatedSrt = audioFile.replace('.wav', '.srt');
  if (fs.existsSync(generatedSrt)) {
    fs.renameSync(generatedSrt, srtFile);
    console.log(`Subtitles saved to ${srtFile}`);
  } else {
    console.log('No SRT file generated');
  }
})().catch(err => {
  console.error('Whisper error:', err.message);
  process.exit(1);
});
