import { spawn } from "bun";

//http://dubsado-alert-pi.local:8000/
const server = Bun.serve({
  port: 8000,
  fetch(req) {
    setVolume(90);
    playSound(`./alert.wav`);
    return new Response("Hello, Bun!", { status: 200 });
  },
});

async function playSound(filePath: string) {
  const process = spawn({
    cmd: ["aplay", filePath],
  });
}

/**     SET VOLUME
 *      takes in a value from 0 to 100
 *      sets the global volume of the pi itself
 */
async function setVolume(volume: number) {
  spawn({ cmd: ["amixer", "set", "Master", `${volume}%`] });
}

console.log(`Server running at http://localhost:${server.port}`);
