export default function() {

  const linkClasses = "cursor-pointer text-lg box-border m-0 min-w-0 text-red-600 underline hover:decoration-wavy"

  return `
    <div class="w-full h-[93vh] inset-0">
      <div data-fade-in style="opacity: 0;" class="sm:text-7xl sm:leading-[1.3] text-3xl font-semibold tracking-tighter mt-2 mx-auto bg-[rgba(242,242,242,0.1)] backdrop-blur-[2px] rounded-xl max-w-max p-3">
        
        <div>
          Blot, the plotter Bot
        </div>

        <div>
          from 
          <a
            class="box-border m-0 min-w-0 p-0 px-2 bg-[#ec3750] rounded-lg text-white whitespace-nowrap no-underline"
            href="https://www.hackclub.com">
              Hack Club
          </a>
        </div>

        <div class="text-xl leading-none font-light tracking-normal pt-2.5">
          Write a program that creates art and we'll send you* a CNC machine that can draw it.
        </div>

      </div>

      <img data-fade-in style="opacity: 0;" class="h-[57%] mx-auto mt-[1.5rem]" src="/landing/blot-clear-bg.png">

      <video class="w-full h-full absolute inset-0 z-[-30] object-cover opacity-[.4]" autoplay muted>
        <source src="/landing/output-movie.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>

      <div data-fade-in class="absolute bottom-[3px]" style="opacity: 0; background: rgba(242, 242, 242, 0.1); backdrop-filter: blur(2px); width: max-content; margin: 10px; padding: 5px;">
        (*Must be a teenager to receive a free machine.)
      </div>
    </div>

    <div class="bg-[#f4f3fb] pt-8 pb-3">

      <div class="text-5xl p-3 font-semibold bg-[#3333ee] text-center text-white w-3/5 mx-auto rounded-md mb-8">
        How do I get Blot?
      </div>

      <div class="flex flex-col md:flex-row">

        <div class="flex flex-col md:w-1/3 justify-center items-center">
          <img src="/landing/code2.webp" class="h-[20rem] w-4/5 rounded border border-gray-300 shadow-md object-cover"/>
          
          
          <div class="bg-[#e7e9fe] p-3 rounded my-5 flex items-center">
            <div class="text-2xl font-bold pr-5">1</div>
            <div>
              <div class="text-lg font-semibold">Code an art piece.</div> 
              <a class="${linkClasses}">Learn how from our guides.</a>
            </div>
          </div>

        </div>

        <div class="flex flex-col md:w-1/3 justify-center items-center">
          <img src="https://raw.githubusercontent.com/hackclub/blot/main/art/tree-leo/snapshots/tree.png" class="h-[20rem] w-4/5 rounded border border-gray-300 shadow-md object-cover"/>
        

          <div class="bg-[#e7e9fe] p-3 rounded my-5 flex items-center">
            <div class="text-2xl font-bold pr-5">2</div>
            <div>
              <div class="text-lg font-semibold">
                Submit it to the <a href="/gallery" class="${linkClasses}">gallery</a>.
              </div> 
              <a class="${linkClasses}">Submission rules here.</a>
            </div>
          </div>

        </div>

        <div class="flex flex-col md:w-1/3 justify-center items-center">
          <img src="/landing/code2.webp" class="h-[20rem] w-4/5 rounded border border-gray-300 shadow-md object-cover"/>

          <div class="bg-[#e7e9fe] p-3 rounded my-5 flex items-center">
            <div class="text-2xl font-bold pr-5">3</div>
            <div>
              <div class="text-lg font-semibold">Get your parts in the mail.</div> 
              <a class="${linkClasses}">Build your own machine.</a>
            </div>
          </div>

        </div>

      </div>

    </div>

    <div 
      class="pt-10"
      style="
        background-image: linear-gradient(to right,#ddd 1px,transparent 1px),linear-gradient(to bottom,#ddd 1px,transparent 1px);
        background-size: 40px 40px;
      "
      >
      <div class="text-3xl font-bold text-center mb-2">
        We built everything from scratch, with ❤️, and open source.
      </div>

      <div class="flex flex-col w-4/5 m-auto text-lg leading-snug">

        <div class="flex flex-col md:flex-row justify-center align-center w-full py-8 border-b border-gray-300">
          <img class="md:w-1/2 w-full rounded border border-gray-300 shadow-md" src="/landing/editor.png"/>
          <div class="m-auto py-6 px-10">
            <b>Custom editor for pen plotter art</b> with vector drawing library,
            direct manipulation widgets, a split screen code/visualizer, and
            direct from browser machine control.
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-center align-center w-full py-8 border-b border-gray-300">
          <img class="md:w-1/2 w-full" src="/landing/parts.png"/>
          <div class="m-auto py-6 px-10">
            <b>CNC you build yourself</b>
            made of six 3D printed parts, and standard DIY machine building
            design patterns (aluminum extrusion, delrin v-wheels, flanged bearing
            idlers...).
           </div>
        </div>

        <div class="flex flex-col md:flex-row justify-center align-center w-full py-8">
          <img class="md:w-1/2 w-full" src="/landing/control-board.png"/>
          <div class="m-auto py-6 px-10">
            <b>Custom control board and firmware</b> so you can understand what
            goes on in the brains of the machine.
           </div>
        </div>

      </div>
    </div>

    <div>
      <div class="text-3xl font-bold text-center my-6">
        Much thanks to..
      </div>

      <div class="w-4/5 text-xl mx-auto">
        <div>
          In addition to helping people learn to 
          program by making art with technology, 
          Blot was made to introduce people to using 
          computers to make physical things.
          It was developed with support from 
          <a class="${linkClasses}" href="https://cba.mit.edu/">MIT's Center for Bits and Atoms</a> 
          as part of ongoing efforts
          to democratize digital fabrication machines. 
        </div>

        <br/>

        <div>
          It's situated among projects such as 
          <a href="https://mtm.cba.mit.edu/" class="${linkClasses}">Machines That Make</a>, 
          <a href="https://github.com/fellesverkstedet/fabricatable-machines/wiki" class="${linkClasses}">Fabricatable Machines</a>,
          and most recently <a href="https://github.com/modular-things/modular-things" class="${linkClasses}">Modular Things</a>.
        </div>

        <div class="flex flex-row mx-auto w-full justify-center gap-20 my-8">
          <img style="width:100px;" src="https://assets.hackclub.com/flag-standalone.svg"/>
          
          <img style="width:50px;" src="https://www.fablabs.io/media/W1siZiIsIjIwMTcvMDEvMjgvMTEvMTMvMDgvZjBlZmVkNjAtM2RlMi00MDUzLWI2NjYtOGE3NjdiOWIxYTRhL01JVCBDZW50ZXIgZm9yIEJpdHMgYW5kIEF0b21zLSBDbG9zZWQgdG8gdGhlIFB1YmxpYy5qcGciXSxbInAiLCJ0aHVtYiIsIjMwMHgzMDAiXV0/MIT%20Center%20for%20Bits%20and%20Atoms-%20Closed%20to%20the%20Public.jpg?sha=08191d35d2986519"/>
        </div>
      </div>
    </div>

    <footer class="p-2">
      © 2023 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
    </footer>

    <script>
      setTimeout(() => {
        document.querySelectorAll('[data-fade-in]').forEach(el => {
          fadeIn(el, 1200)
        })
      }, 800)

      function fadeIn(el, duration) {
        let start

        function animate(timestamp) {
          if (!start) start = timestamp
          const elapsed = timestamp - start

          // Calculate the current opacity
          el.style.opacity = Math.min(elapsed / duration, 1)

          // Continue the animation until the duration is reached
          if (elapsed < duration) {
            requestAnimationFrame(animate)
          }
        }

        // Start the animation
        requestAnimationFrame(animate)
      }
    </script>
   
  `
}

