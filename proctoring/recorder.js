import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'
import fsExtra from 'fs-extra'

const TEMP_DIR = path.join(process.cwd(), 'tmp_recordings')
fsExtra.ensureDirSync(TEMP_DIR)

/**
 * Append a binary chunk to a temp file for an attempt.
 * @param {String} attemptId
 * @param {Buffer} chunk
 */
export const appendChunk = async (attemptId, chunk) => {
  const filePath = path.join(TEMP_DIR, `${attemptId}.webm`)
  await fs.promises.appendFile(filePath, chunk)
}

/**
 * Finalize recording: transcode .webm to .mp4 using ffmpeg
 * Returns path to mp4 file
 */
export const finalizeRecording = async (attemptId) => {
  const webmPath = path.join(TEMP_DIR, `${attemptId}.webm`)
  const mp4Path = path.join(TEMP_DIR, `${attemptId}.mp4`)

  if (!fs.existsSync(webmPath)) throw new Error('No recording found')

  // ffmpeg -y -i input.webm -c:v libx264 -preset veryfast -crf 23 -c:a aac output.mp4
  await new Promise((resolve, reject) => {
    const args = ['-y', '-i', webmPath, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-c:a', 'aac', mp4Path]
    const ff = spawn('ffmpeg', args)

    ff.stderr.on('data', d => { /* ffmpeg logs */ })
    ff.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error('FFmpeg failed with code ' + code))
    })
  })

  // Optionally remove the webm after conversion (keep if you want)
  // await fs.promises.unlink(webmPath)

  return mp4Path
}
