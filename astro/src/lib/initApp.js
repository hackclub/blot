import { render } from './render.tsx'
import { init } from './init.js'
import { init as initHackend } from "@hackclub/hackend-client";

initHackend(import.meta.env.HACKEND_URL || "http://localhost:3000")

// to initialize dom elements
render()

// to initialize delegation listeners and what not
init()
