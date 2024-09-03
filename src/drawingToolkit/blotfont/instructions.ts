import { Turtle } from "../Turtle"
import { Point, Polyline } from "./funcs"

const ParseCoords = (cstr: string, multScale: number = 1): Array<number> => {
    const coordArray: Array<number> = []
    for (const x of cstr.split(":")) {
        if (parseFloat(x)) {
            coordArray.push(parseFloat(x))
        }
    }
    return coordArray
}

// Run a limited set of Turtle functions as simplified string instructions
export const RunInstructions = (inst:string, org?:Point, scale:number=1,returnEndpoint = false):Point|Array<Polyline> => {
    const turtle = new Turtle()
    if (org) {
        turtle.jump(org)
    }
    for (const x of inst.split(",")) {
        const cmd = x.split("$")[0]
        const args = x.split("$")[1]
        let data:Array<number>;
        switch (cmd) {
            case "u":
                turtle.up()
                break;
            case "d":
                turtle.down()
                break;
            case "f":
                turtle.forward(parseFloat(args) * scale)
                break;
            case "arc":
                data = ParseCoords(args)
                turtle.arc(-data[0],data[1] * scale)
                break;
            case "jmp":
                data = ParseCoords(args)
                turtle.jump(data as Point)
                break;
            case "sa":
                turtle.setAngle(parseFloat(args))
                break;
            case "l":
                turtle.left(parseFloat(args))
                break
            case "r":
                turtle.right(parseFloat(args))
                break

            default:
                break
        }
    }
    //drawTurtles([turtle])
    if (returnEndpoint) {
        return turtle.position as Point
    } else {
        return turtle.lines()
    }
}