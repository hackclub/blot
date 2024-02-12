export default function(fadeIn = false) {
  return `
    <nav ${fadeIn ? `data-fade-in style="opacity: 0;"` : ""} class="bg-[--primary] text-white flex items-center justify-between text-lg p-2 sticky top-0 z-50" style="font-family: var(--font-sans);">

      <a href="/" class="flex gap-1 items-center">
        <img src="/borpheus.svg" class="w-7 translate-x-1 translate-y-[-3px]" />
        <span class="text-2xl font-bold">lot</span>
      </a>

      <div class="flex gap-4">

        <a href="/editor" class="flex h-full gap-1 items-center hover:opacity-60">
          <img src="/icons/editor.svg"/>
          <span class="hidden sm:block">editor</span>
        </a>

        <a href="/guides" class="flex h-full gap-1 items-center hover:opacity-60">
          <img src="/icons/guides.svg"/>
          <span class="hidden sm:block">guides</span>
        </a>

        <a href="/gallery" class="flex h-full gap-1 items-center hover:opacity-60">
          <img src="/icons/gallery.svg"/>
          <span class="hidden sm:block">gallery</span>
        </a>

        <a href="https://github.com/hackclub/blot/blob/main/docs/ASSEMBLY.md" class="flex h-full gap-1 items-center hover:opacity-60">
          <img src="/icons/wrench.svg"/>
          <span class="hidden sm:block">build guide</span>
        </a>

        <a href="https://github.com/hackclub/blot" class="flex h-full gap-1 items-center hover:opacity-60" rel="noreferrer" target="_blank">
          <img src="/icons/github.svg"/>
          <span class="hidden sm:block">source</span>
        </a>

      </div>
    </nav>
  `
}
