import { spawn } from "bun";
import { handler, router } from "igloo-router";

/**
 * Maps a value from one range to another.
 *
 * @param {number} originalValue - The value to map from the original range.
 * @returns {number} - The value mapped to the new range.
 */
function mapValueToRange(originalValue: number) {
  if (!originalValue) {
    return 0;
  }

  // do not play sound if less than $5k is transacted
  if (originalValue < 500000) {
    return 0;
  }

  return 75;
}

router.post("/dub-payment", async (req: Request) => {
  const json = await req.json();

  const volume = mapValueToRange(json?.data?.object?.amount);

  setVolume(volume);
  playSound(`./subscribed.wav`);
  return new Response("Hello, Bun!", { status: 200 });
});

router.post("/dub-subscribe", async (req: Request) => {
  setVolume(90);
  playSound(`./alert.wav`);
  return new Response("Hello, Bun!", { status: 200 });
});

//http://dubsado-alert-pi.local:8000/
const server = Bun.serve({
  port: 8000,
  fetch: handler,
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
