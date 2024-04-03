export default function() {

  const linkClasses = "cursor-pointer text-lg box-border m-0 min-w-0 text-red-600 underline hover:decoration-wavy"

  return `
    <div class="w-full h-[93vh] inset-0">
      <div data-fade-in style="opacity: 0;" class="sm:text-7xl sm:leading-[1.3] text-3xl font-semibold tracking-tighter mt-2 mx-auto bg-[rgba(242,242,242,0.1)] backdrop-blur-[2px] rounded-xl max-w-max p-3">
        
        <div>
          Blot, the plotter bot
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

      <img data-fade-in style="opacity: 0;" class="h-[50%] mx-auto mt-[2.5rem]" src="/assets/blot-clear-bg.webp">

      <video class="w-full h-full absolute inset-0 z-[-30] object-cover opacity-[.4]" autoplay muted style="max-width: 100%; width: 100%; min-width: 100%;" >
        <source src="/assets/output-movie.mp4" type="video/mp4">
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
          <img src="/assets/code2.webp" class="h-[20rem] w-4/5 rounded border border-gray-300 shadow-md object-cover"/>
          
          
          <div class="bg-[#e7e9fe] p-3 rounded my-5 flex items-center">
            <div class="text-2xl font-bold pr-5">1</div>
            <div>
              <div class="text-lg font-semibold">Code an art piece.</div> 
              <a class="${linkClasses}" href="/editor?guide=start">Get started with our guide.</a>
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
              <a class="${linkClasses}" href="https://github.com/hackclub/blot/blob/main/docs/GET_A_BLOT.md">Submission rules here.</a>
            </div>
          </div>

        </div>

        <div class="flex flex-col md:w-1/3 justify-center items-center">
          <img src="/assets/all-parts.jpg" class="h-[20rem] w-4/5 rounded border border-gray-300 shadow-md object-cover"/>

          <div class="bg-[#e7e9fe] p-3 rounded my-5 flex items-center">
            <div class="text-2xl font-bold pr-5">3</div>
            <div>
              <div class="text-lg font-semibold">Get your parts in the mail.</div> 
              <a class="${linkClasses}" href="https://github.com/hackclub/blot/blob/main/docs/ASSEMBLY.md">Build your own machine.</a>
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
          <img class="md:w-1/2 w-full rounded border border-gray-300 shadow-md" src="/assets/editor.png"/>
          <div class="m-auto py-6 px-10">
            <b>Custom editor for pen plotter art</b> with vector drawing library,
            direct manipulation widgets, a split screen code/visualizer, and
            direct from browser machine control.
          </div>
        </div>

        <div class="flex flex-col md:flex-row justify-center align-center w-full py-8 border-b border-gray-300">
          <img class="md:w-1/2 w-full" src="/assets/parts.png"/>
          <div class="m-auto py-6 px-10">
            <b>CNC you build yourself</b>
            made of six 3D printed parts, and standard DIY machine building
            design patterns (aluminum extrusion, delrin v-wheels, flanged bearing
            idlers...).
           </div>
        </div>

        <div class="flex flex-col md:flex-row justify-center align-center w-full py-8">
          <img class="md:w-1/2 w-full" src="/assets/control-board.webp"/>
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

        <br/>

        <div>
          Also thanks to Paul Hamilton for his contributions to embedded designs.
        </div>

        <div class="flex flex-row mx-auto w-full justify-center gap-20 my-8">
          <div class="flex flex-row justify-center" style="transform: translateX(-27px);">
            <img style="width:130px;" src="/assets/mit-logo.jpg"/>
            <img style="width:50px; height: 50px; transform: translate(0, 17px);" src="https://www.fablabs.io/media/W1siZiIsIjIwMTcvMDEvMjgvMTEvMTMvMDgvZjBlZmVkNjAtM2RlMi00MDUzLWI2NjYtOGE3NjdiOWIxYTRhL01JVCBDZW50ZXIgZm9yIEJpdHMgYW5kIEF0b21zLSBDbG9zZWQgdG8gdGhlIFB1YmxpYy5qcGciXSxbInAiLCJ0aHVtYiIsIjMwMHgzMDAiXV0/MIT%20Center%20for%20Bits%20and%20Atoms-%20Closed%20to%20the%20Public.jpg?sha=08191d35d2986519"/>
          </div>
        </div>
      </div>
    </div>

    ${footer()}

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
    
    <img class="sm:block hidden" style="position: fixed; bottom: 0px; right: 15px; width:100px;" src="https://assets.hackclub.com/flag-standalone.svg"/>

  `
}


function footer() {

  // <footer class="p-2">
  //   © 2023 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
  // </footer>

  return `
    <style>
      @font-face {
        font-family: 'Phantom Sans';
        src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Regular.woff')
            format('woff'),
          url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Regular.woff2')
            format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'Phantom Sans';
        src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Italic.woff')
            format('woff'),
          url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Italic.woff2')
            format('woff2');
        font-weight: normal;
        font-style: italic;
        font-display: swap;
      }
      @font-face {
        font-family: 'Phantom Sans';
        src: url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Bold.woff')
            format('woff'),
          url('https://assets.hackclub.com/fonts/Phantom_Sans_0.7/Bold.woff2')
            format('woff2');
        font-weight: bold;
        font-style: normal;
        font-display: swap;
      }

      footer {
        font-family: "Phantom Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        font-size: 20px;
        line-height: 1.5;
        font-weight: 400;
      }
    </style>
    <footer class="bg-gray-900 text-white">
      <div>
        <article class="sm:flex hidden h-[400px] gap-[5rem] items-center  justify-center">
          <div class="flex flex-col px-4 gap-[1rem]">
            <h2 class="font-bold text-xl mb-4">Hack&nbsp;Club</h2>
            <a href="https://hackclub.com/philosophy/" class="text-white-400 hover:underline">Philosophy</a>
            <a href="https://hackclub.com/team/" class="text-white-400 hover:underline">Our Team &amp; Board</a>
            <a href="https://hackclub.com/jobs/" class="text-white-400 hover:underline">Jobs</a>
            <a href="https://hackclub.com/brand/" class="text-white-400 hover:underline">Branding</a>
            <a href="https://hackclub.com/press/" class="text-white-400 hover:underline">Press Inquiries</a>
            <a href="https://hackclub.com/philanthropy/" class="text-white-400 hover:underline">Donate</a>
          </div>

          <div class="flex flex-col px-4 gap-[1rem]">
            <h2 class="font-bold text-xl mb-4">Resources</h2>
            <a href="https://hackclub.com/pizza" class="text-white-400 hover:underline">Clubs Pizza Grant</a>
            <a href="https://events.hackclub.com/" class="text-white-400 hover:underline">Community Events</a>
            <a href="https://jams.hackclub.com/" class="text-white-400 hover:underline">Jams</a>
            <a href="https://toolbox.hackclub.com/" class="text-white-400 hover:underline">Toolbox</a>
            <a href="https://directory.hackclub.com/" class="text-white-400 hover:underline">Clubs Directory</a>
            <a href="https://hackclub.com/conduct/" class="text-white-400 hover:underline">Code of Conduct</a>
          </div>

          <div class="flex flex-col px-4 gap-[1rem]">
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="45" fill="white" viewBox="0 0 256 90" aria-label<="Hack Club logo"><path d="M75.156 38.08l6.475 1.105s1.798-11.402-.224-10.199l-6.251 9.094zM204.85 34.495l2.161 5.06s5.237-2.106 4.619-4.915c-.537-2.442-3.098-1.496-5.641-.557h-.001c-.382.142-.764.282-1.138.412zM207.752 43.455s1.483 6.212 1.421 5.93c-.007-.093.397-.247 1.002-.477 2.014-.766 6.257-2.379 4.999-5.453-1.636-3.997-7.422 0-7.422 0z"></path><path fill-rule="evenodd" d="M7.205 89.303c-.022-2.227-.161-16.553 3.072-32.54 15.846-2.401 28.778.144 54.94 7.37 5.142 1.42 10.135 2.927 15.139 4.437 21.52 6.494 43.238 13.047 77.819 13.047 39.513 0 89.839-46.125 96.97-52.854.321-.303.07-.804-.37-.798a895.798 895.798 0 01-22.817-.006.484.484 0 01-.422-.707L241.991 6.9c.186-.36-.392-.91-.737-.696-10.403 6.44-68.291 38.655-125.701 11.127C62.987-7.874 36.693.801 29.405 4.381c.206-.647.195-1.355-.559-1.45-.953-.121-1.458.46-1.458.46-.955.738-11.701 20.409-18.91 41.665C1.272 66.313-.092 87.361.006 89.551h7.202c0-.049 0-.132-.002-.248zm33.522-73.187c-.647 3.657-1.888 9.939-4.497 18.056-5.42 12.948 3.823 10.836 6.47 5.457 1.569-2.97 3.182-6.194 3.182-6.194l8.307 3.185s-.669 3.783-1.353 6.912c-2.61 8.118 4.998 7.144 7.102 1.146.177-.583.477-1.518.856-2.697 1.62-5.045 4.672-14.553 5.648-20.073 1.814-4.357-4.395-8.336-7.205-1.295-1.502 2.593-3.941 8.27-3.941 8.27s-6.857-2.534-6.938-2.81c-.14-.362.021-1.024.212-1.812.177-.727.38-1.562.397-2.37-.418-11.655-7.37-10.693-8.24-5.775zm36.6 9.076c2.114-4.209 4.542-4.915 6.347-4.723.779.065 1.838 1.648 2.648 3.17 2.651 10.02-2.1 28.448-2.94 29.686-2.892 4.671-7.967 3.788-6.04-1.259.901-3.066 1.865-5.852 1.865-5.852l-6.568-.734c-5.162 10.028-9.802 5.829-7.128 1.497 2.861-5.074 8.956-16.183 11.816-21.785zm33.437 10.102c.857-2.414-.924-7.875-7.149-6.964-9.016.065-12.136 15.862-12.136 15.862s-1.498 7.65.867 12.865c1.971 4.611 6.52 5.007 8.041 5.139.137.012.25.022.334.032 5.917-1.78 3.891-5.722 2.879-5.849-.221-.011-.456-.014-.701-.018-1.178-.015-2.578-.034-3.746-.988-2.393-1.928-1.967-6.824-1.447-9.457 1.224-4.429 3.918-13.223 8.213-11.07 2.577 3.293 4.386 1.78 4.845.448zm5.93-.406c-.608 1.855-.691 3.748-.785 5.895-.151 3.458-.332 7.576-2.777 13.261-.68 1.62-2.071 4.212-2.9 5.756-.323.602-.561 1.045-.638 1.21-2.196 4.16 2.263 6.611 7.175-.657 1.19-1.664 2.501-5.919 2.501-5.919l2.137-.24s1.867 8.216 2.296 11.736c.46 3.396 6.476 5.328 6.564-1.338-.215-2.285-1.011-5.374-2.509-9.298 0 0-.978-2.874-1.925-3.247 0 0 6.713-6.677 7.353-9.268.67-2.714-.552-4.6-5.802-.172-5.249 4.428-5.858 5.846-5.858 5.846s1.248-5.583 1.123-9.812c.456-4.473-4.584-7.73-5.955-3.753zm33.811 8.412c-2.253 2.233-3.67 6.425-3.512 12.767.314 9.466 4.236 14.906 10.933 13.822 6.697-1.083 5.12-5.915 4.503-6.075-.088-.022-.163-.059-.244-.098-.376-.181-.861-.415-3.12.435-2.746 1.032-4.814-.173-6.545-4.375-1.144-2.843-1.764-8.367.302-11.452.537-.795 1.051-1.088 1.378-1.275l.075-.042.039-.024.019-.011c1.235-.753 2.5-.023 2.717.166 3.458 2.504 4.135-.27 2.899-2.736-2.44-3.446-5.681-4.15-9.444-1.102zm14.971.143c-.033-3.593 3.677-6.363 4.981 1.672.926 2.985 1.185 7.574 1.384 11.111.147 2.614.262 4.655.59 5.05.773.93 6.526-.368 8.084-.892 1.558-.524 4.428.164 3.78 1.724-.423 1.281-1.467 1.63-2.02 1.814-.134.045-.239.08-.3.116-.309.187-13.313 4.042-13.796 1.475-.342-1.815-.457-2.938-.667-4.986h-.001c-.087-.848-.19-1.854-.332-3.133-.178-1.594-.448-3.404-.721-5.234h-.001c-.475-3.187-.961-6.434-.981-8.717zm15.594-3.216c-.282-2.598 2.367-4.185 3.927-1.396.534.974 1.107 3.415 1.752 6.165.788 3.354 1.682 7.167 2.746 9.337 1.06 1.599 3.243 1.887 4.271.42 1.214-2.218.338-7.759-.413-12.204a62.31 62.31 0 00-.479-1.777v-.001c-.361-1.286-.655-2.334-.634-3.168.466-4.003 3.677-3.055 5.175 1.049 1.249 4.572 2.551 11.959 1.898 14.585l-.074.3c-.604 2.447-1.329 5.39-4.442 6.131-.842.185-7.855 1.196-10.321-6.477l-.757-2.562c-1.783-6.024-2.399-8.103-2.649-10.402zm21.992-8.576c4.312-2.607 7.547-3.502 10.075-2.589 1.48.91 2.436 3.407 2.037 5.558-.461 1.87-1.231 3.396-1.231 3.396 2.559.258 4.432 2.811 4.918 6.153.487 3.341-2.661 6.486-8.515 8.433-1.972.556-4.067.549-4.16-.138-.063-1.341-5.033-17.326-5.033-17.326-.015-.096-.034-.193-.053-.29-.175-.892-.37-1.884 1.962-3.197z" clip-rule="evenodd"></path></svg><div class="css-wodnsz">
            <div class="grid grid-rows-2 grid-cols-4 gap-4">
              <a target="_self" rel="noopener me" href="https://hackclub.com/slack" title="Hack Club on Slack" class="text-white-400 hover:underline">
                <svg fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" xmlns="http://www.w3.org/2000/svg" aria-label="slack-fill" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="32" height="32"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 4c10 0 12 2 12 12s-2 12-12 12S4 26 4 16 6 4 16 4zm-2.746 4.122a1.605 1.605 0 0 1 1.745.347 1.6 1.6 0 0 1 .468 1.131v1.6h-1.6a1.603 1.603 0 0 1-1.48-2.212 1.598 1.598 0 0 1 .867-.866zM9.6 12.267h4.267a1.604 1.604 0 0 1 1.478.988A1.596 1.596 0 0 1 15 14.997a1.602 1.602 0 0 1-1.132.47H9.6a1.605 1.605 0 0 1-1.479-.989 1.595 1.595 0 0 1 .347-1.742 1.601 1.601 0 0 1 1.132-.47zm14.279.988a1.596 1.596 0 0 1-.347 1.742 1.6 1.6 0 0 1-1.132.47h-1.6v-1.6a1.596 1.596 0 0 1 .987-1.478 1.605 1.605 0 0 1 1.745.347c.149.148.266.325.347.519zM19.733 9.6v4.267a1.594 1.594 0 0 1-.987 1.477 1.605 1.605 0 0 1-1.226 0 1.602 1.602 0 0 1-.987-1.477V9.6a1.596 1.596 0 0 1 .987-1.478 1.605 1.605 0 0 1 1.745.347 1.598 1.598 0 0 1 .468 1.131zm-1.6 14.4a1.603 1.603 0 0 0 1.6-1.6 1.595 1.595 0 0 0-.987-1.478 1.605 1.605 0 0 0-.613-.122h-1.6v1.6a1.597 1.597 0 0 0 1.6 1.6zm0-4.267H22.4a1.605 1.605 0 0 0 1.479-.988 1.596 1.596 0 0 0-.347-1.742 1.6 1.6 0 0 0-1.132-.47h-4.267a1.605 1.605 0 0 0-1.478.989A1.596 1.596 0 0 0 17 19.264a1.602 1.602 0 0 0 1.132.47zm-10.012-.988a1.596 1.596 0 0 1 .347-1.742 1.601 1.601 0 0 1 1.132-.47h1.6v1.6a1.596 1.596 0 0 1-.987 1.478 1.605 1.605 0 0 1-1.745-.347 1.597 1.597 0 0 1-.347-.519zm4.146 3.655v-4.267a1.593 1.593 0 0 1 .987-1.477 1.603 1.603 0 0 1 1.745.347 1.6 1.6 0 0 1 .468 1.13V22.4a1.597 1.597 0 0 1-1.6 1.6 1.603 1.603 0 0 1-1.6-1.6z"></path></svg>
              </a>
              <a target="_blank" rel="noopener me" href="https://twitter.com/hackclub" title="Hack Club on Twitter" class="text-white-400 hover:underline">
                <svg fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" xmlns="http://www.w3.org/2000/svg" aria-label="twitter" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="32" height="32"><g><path d="M16,28c11,0 12,-1 12,-12c0,-11 -1,-12 -12,-12c-11,0 -12,1 -12,12c0,11 1,12 12,12Zm5.825,-13.901c0,3.669 -2.889,7.901 -8.172,7.901l0,0c-1.622,0 -3.132,-0.46 -4.403,-1.248c0.225,0.026 0.454,0.039 0.685,0.039c1.346,0 2.585,-0.444 3.568,-1.189c-1.258,-0.022 -2.318,-0.825 -2.684,-1.928c0.175,0.032 0.355,0.05 0.54,0.05c0.262,0 0.516,-0.034 0.758,-0.098c-1.315,-0.255 -2.305,-1.377 -2.305,-2.722c0,-0.013 0,-0.024 0.001,-0.036c0.387,0.208 0.829,0.333 1.301,0.348c-0.772,-0.498 -1.279,-1.348 -1.279,-2.312c0,-0.509 0.143,-0.985 0.389,-1.396c1.417,1.681 3.534,2.786 5.921,2.902c-0.049,-0.204 -0.074,-0.416 -0.074,-0.633c0,-1.533 1.286,-2.777 2.872,-2.777c0.826,0 1.573,0.338 2.097,0.877c0.654,-0.124 1.269,-0.356 1.824,-0.674c-0.215,0.649 -0.67,1.192 -1.263,1.536c0.581,-0.067 1.134,-0.216 1.649,-0.437c-0.384,0.557 -0.872,1.046 -1.433,1.438c0.006,0.119 0.008,0.239 0.008,0.359Z"></path></g></svg>
              </a>
              <a target="_blank" rel="noopener me" href="https://github.com/hackclub" title="Hack Club on GitHub" class="text-white-400 hover:underline">
                <svg fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" xmlns="http://www.w3.org/2000/svg" aria-label="github" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="32" height="32"><g><path d="M18.837,27.966c8.342,-0.241 9.163,-1.997 9.163,-11.966c0,-11 -1,-12 -12,-12c-11,0 -12,1 -12,12c0,9.995 0.826,11.734 9.228,11.968c0.073,-0.091 0.1,-0.205 0.1,-0.321c0,-0.25 -0.01,-2.816 -0.015,-3.699c-3.037,0.639 -3.678,-1.419 -3.678,-1.419c-0.497,-1.222 -1.213,-1.548 -1.213,-1.548c-0.991,-0.656 0.075,-0.643 0.075,-0.643c1.096,0.075 1.673,1.091 1.673,1.091c0.974,1.617 2.556,1.15 3.178,0.879c0.099,-0.683 0.381,-1.15 0.693,-1.414c-2.425,-0.267 -4.974,-1.175 -4.974,-5.23c0,-1.155 0.426,-2.099 1.124,-2.839c-0.113,-0.268 -0.487,-1.344 0.107,-2.8c0,0 0.917,-0.285 3.003,1.084c0.871,-0.235 1.805,-0.352 2.734,-0.356c0.927,0.004 1.861,0.121 2.734,0.356c2.085,-1.369 3,-1.084 3,-1.084c0.596,1.456 0.221,2.532 0.108,2.8c0.7,0.74 1.123,1.684 1.123,2.839c0,4.065 -2.553,4.96 -4.986,5.221c0.392,0.327 0.741,0.973 0.741,1.96c0,0.946 -0.006,2.619 -0.01,3.728c-0.002,0.549 -0.003,0.959 -0.003,1.074c0,0.109 0.029,0.224 0.095,0.319Z"></path></g></svg>
              </a>
              <a target="_blank" rel="noopener me" href="https://figma.com/@hackclub" title="Hack Club on Figma" class="text-white-400 hover:underline">
                <svg fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" xmlns="http://www.w3.org/2000/svg" aria-label="figma-fill" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="32" height="32"><g><path d="M16.774 14.114c-.5.5-.78 1.179-.78 1.886v-2.667h2.666c-.707 0-1.386.281-1.886.781z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M27.986 15.968c0 11-1 12-12 12s-12-1-12-12 1-12 12-12 12 1 12 12zm-9.326-2.635A2.667 2.667 0 1115.993 16v5.333a2.667 2.667 0 11-2.666-2.666 2.667 2.667 0 010-5.334 2.666 2.666 0 110-5.333h5.333a2.667 2.667 0 110 5.333z"></path></g></svg>
              </a>
              <a target="_blank" rel="noopener me" href="https://social.dino.icu/@hackclub" title="Hack Club on Mastodon" class="text-white-400 hover:underline">
                <svg fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" xmlns="http://www.w3.org/2000/svg" aria-label="mastodon" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="32" height="32"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M28 16C28 6 26 4 16 4C6 4 4 6 4 16C4 26 6 28 16 28C26 28 28 26 28 16ZM20.1998 8.2058C22.0924 8.46832 23.689 9.82312 23.9354 11.5423C24.0428 12.5649 23.9896 14.1016 23.9638 14.8483C23.9574 15.0339 23.9526 15.1707 23.9525 15.2387C23.9525 15.339 23.937 16.2553 23.9308 16.352C23.7649 18.8085 22.1327 19.7786 20.4176 20.0877C20.3988 20.093 20.3776 20.0968 20.3559 20.1008C20.3506 20.1018 20.3453 20.1027 20.3401 20.1037C19.2527 20.303 18.0878 20.3561 16.9826 20.3851C16.7183 20.3917 16.4548 20.3917 16.1905 20.3917C15.0917 20.3919 13.9966 20.2699 12.9284 20.0281C12.9228 20.0267 12.9168 20.0266 12.9111 20.0278C12.9054 20.0289 12.9001 20.0314 12.8955 20.0348C12.891 20.0383 12.8874 20.0427 12.8851 20.0477C12.8827 20.0528 12.8816 20.0582 12.8819 20.0637C12.9121 20.3901 12.9877 20.7113 13.1067 21.0193C13.2547 21.3756 13.7717 22.2315 15.6937 22.2315C16.8106 22.2334 17.9238 22.1114 19.0101 21.8679C19.0156 21.8667 19.0214 21.8667 19.0269 21.8679C19.0324 21.869 19.0376 21.8713 19.0421 21.8746C19.0465 21.8779 19.0501 21.882 19.0526 21.8868C19.0552 21.8916 19.0565 21.8968 19.0566 21.9021V23.1078C19.0564 23.1135 19.0548 23.1191 19.052 23.1241C19.0492 23.1292 19.0452 23.1335 19.0403 23.1369C18.7013 23.3675 18.2457 23.5032 17.8469 23.622C17.8281 23.6276 17.8095 23.6332 17.791 23.6387C17.6086 23.6925 17.4241 23.7398 17.2376 23.7805C15.5421 24.1429 13.7725 24.0552 12.127 23.5274C10.5902 23.0213 9.02149 21.7807 8.63398 20.2899C8.42703 19.4827 8.28122 18.6628 8.19763 17.8363C8.10981 16.9324 8.08046 16.0271 8.05108 15.1205C8.04001 14.779 8.02893 14.4373 8.01473 14.0955C7.9783 13.2243 7.99923 12.2746 8.19531 11.4179C8.60298 9.6784 10.2832 8.46105 12.1232 8.2058C12.161 8.20055 12.2028 8.19365 12.2517 8.18558C12.6158 8.12547 13.3759 8 15.8472 8H15.8681C18.6706 8 19.8805 8.16144 20.1998 8.2058ZM19.4922 17.6719H21.2957L21.2972 13.401C21.2972 12.5279 21.0598 11.8346 20.585 11.3212C20.0936 10.8085 19.4511 10.5452 18.6544 10.5452C17.7329 10.5452 17.0353 10.8783 16.5703 11.5437L16.1208 12.2506L15.672 11.5437C15.207 10.8783 14.5095 10.5452 13.5864 10.5452C12.7889 10.5452 12.1464 10.8085 11.6566 11.3212C11.1818 11.8351 10.9443 12.5283 10.9443 13.401V17.6719H12.7463V13.5268C12.7471 12.6542 13.1385 12.2091 13.922 12.2091C14.7885 12.2091 15.2233 12.7356 15.2233 13.7755V16.0444H17.016V13.7755C17.016 12.7356 17.45 12.2091 18.3165 12.2091C19.1047 12.2091 19.4922 12.6542 19.4922 13.5268V17.6719Z"></path></g></svg>
              </a>
              <a target="_blank" rel="noopener me" href="https://www.youtube.com/c/HackClubHQ" title="Hack Club on YouTube" class="text-white-400 hover:underline">
                <svg fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" xmlns="http://www.w3.org/2000/svg" aria-label="youtube" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="32" height="32"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M28 16C28 6 26 4 16 4S4 6 4 16s2 12 12 12 12-2 12-12zm-14.473 3.127l6.48-3.36-6.485-3.383.005 6.742z"></path></g></svg>
              </a>
              <a target="_blank" rel="noopener me" href="https://www.instagram.com/starthackclub" title="Hack Club on Instagram" class="text-white-400 hover:underline">
                <svg fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" xmlns="http://www.w3.org/2000/svg" aria-label="instagram" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="32" height="32"><g><path fill-rule="evenodd" clip-rule="evenodd" d="M16 6c5.1 0 7.247.575 8.336 1.664C25.425 8.753 26 10.9 26 16s-.575 7.247-1.664 8.336C23.247 25.425 21.1 26 16 26s-7.247-.575-8.336-1.664C6.575 23.247 6 21.1 6 16s.575-7.247 1.664-8.336C8.753 6.575 10.9 6 16 6zm0-2c10 0 12 2 12 12s-2 12-12 12S4 26 4 16 6 4 16 4z"></path><path d="M16 9.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM16 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.845-10.405a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"></path></g></svg>
              </a>
              <a target="_blank" rel="noopener me" href="mailto:team@hackclub.com" title="Hack Club on email-fill" class="text-white-400 hover:underline">
                <svg fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414" xmlns="http://www.w3.org/2000/svg" aria-label="email-fill" viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet" fill="currentColor" width="32" height="32"><g><path d="M16,26c11,0 12,-0.833 12,-10c0,-9.167 -1,-10 -12,-10c-11,0 -12,0.833 -12,10c0,9.167 1,10 12,10Zm-8.651,-14.774c0.411,-0.344 1.023,-0.289 1.366,0.124c1.335,1.601 5.617,5.318 7.285,6.592c1.696,-1.296 5.931,-4.963 7.285,-6.592c0.343,-0.413 0.955,-0.468 1.366,-0.124c0.412,0.344 0.467,0.957 0.124,1.37c-0.695,0.838 -2.02,2.129 -3.429,3.404c1.409,1.275 2.734,2.566 3.429,3.404c0.343,0.412 0.288,1.026 -0.124,1.37c-0.411,0.344 -1.023,0.289 -1.366,-0.124c-0.662,-0.798 -2.015,-2.083 -3.422,-3.339c-1.102,0.95 -2.137,1.789 -2.841,2.291c-0.302,0.213 -0.644,0.398 -1.022,0.398c-0.378,0 -0.72,-0.185 -1.021,-0.398c-0.691,-0.492 -1.728,-1.335 -2.835,-2.292c-1.414,1.264 -2.775,2.556 -3.429,3.34c-0.343,0.413 -0.955,0.468 -1.366,0.124c-0.411,-0.344 -0.467,-0.957 -0.124,-1.37l0.001,-0.001c0.683,-0.822 2.018,-2.119 3.436,-3.403c-1.418,-1.284 -2.753,-2.582 -3.436,-3.403l-0.001,-0.001c-0.343,-0.413 -0.287,-1.026 0.124,-1.37Z"></path></g></svg>
              </a>
            </div>
          </div>

          <span>
            <a href="tel:1-855-625-HACK" class="text-white-400 hover:underline">1-855-625-HACK</a>
            <br>
            <span>(call toll-free)</span>
          </span>

          </div>
        </article>
        <p class="p-5">© 2024 Hack&nbsp;Club. 501(c)(3) nonprofit (EIN: 81-2908499)</p>
      </div>
    </footer>
  `
}














