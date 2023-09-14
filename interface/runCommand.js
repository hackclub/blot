export async function runCommand(cmd, state) {
  // Pranav's

  // const parsedCode = acorn.parse(current_code, { ecmaVersion: "latest" });
  // const functionDeclarations = parsedCode.body.filter(
  //   (node) => node.type === "FunctionDeclaration"
  // );

  // let functionString = "";

  // for (const declaration of functionDeclarations) {
  //   functionString += current_code.slice(
  //     declaration.start,
  //     declaration.end
  //   ) + "\n";
  // }

  // runCode(functionString + text);

  console.log(state.topScope)

  const names = Object.keys(state.topScope)
  const values = Object.values(state.topScope)

  const AsyncFunction = async function () {}.constructor

  // need to return last statement
  const f = new AsyncFunction(...names, cmd)

  const result = await f(...values)

  console.log(result)
}
