import fs from 'fs'
import path from 'path'
import { spawn } from 'child_process'
import fsExtra from 'fs-extra'

const TEMP_DIR = path.join(process.cwd(), 'tmp_recordings')
fsExtra.ensureDirSync(TEMP_DIR)


export const appendChunk = async (attemptId, chunk) => {
  const filePath = path.join(TEMP_DIR, `${attemptId}.webm`)
  await fs.promises.appendFile(filePath, chunk)
}

export const finalizeRecording = async (attemptId) => {
  const webmPath = path.join(TEMP_DIR, `${attemptId}.webm`)
  const mp4Path = path.join(TEMP_DIR, `${attemptId}.mp4`)

  if (!fs.existsSync(webmPath)) throw new Error('No recording found')

  
  await new Promise((resolve, reject) => {
    const args = ['-y', '-i', webmPath, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '23', '-c:a', 'aac', mp4Path]
    const ff = spawn('ffmpeg', args)

    ff.stderr.on('data', d => { /* ffmpeg logs */ })
    ff.on('exit', code => {
      if (code === 0) resolve()
      else reject(new Error('FFmpeg failed with code ' + code))
    })
  })

  

  return mp4Path
}
