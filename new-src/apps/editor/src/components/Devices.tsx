import { patchStore, useStore } from "../lib/state";

export default function Devices({ className }: { className?: string; }) {
    const { things } = useStore(["things"]);

    useEffect(() => {
        initSerial();
    }, []);

    return (
        <Flex className={className} sx={{
            flexDirection: "column",
            gap: "0.5em",
            maxHeight: "100%"
        }}>
            <Heading as="h2">List of Things</Heading>
            <ScanButton />
            <Button onClick={async () => {
                const [name, thing] = await authorizePort();
                things[name] = thing;
                patchStore(["things"]);
            }}>pair new thing</Button>
            <Flex sx={{
                flexDirection: "column",
                gap: "0.5em",
                overflow: "auto"
            }}>
                {Object.entries(things).map(([name, thing]) => (
                    <Box key={name}>
                        <Flex sx={{
                            justifyContent: "space-between",
                            paddingBottom: "5px",
                            alignItems: "center"
                        }}>
                            <Heading as="h3">Name: {name}</Heading>
                            <Button variant="secondary" onClick={async () => {
                                const newName = prompt(`New name for ${name}`);
                                if (!newName)
                                    return;
                                await thing.vThing.setName(newName);
                                delete things[name];
                                things[newName] = thing;
                                patchStore(["things"]);
                            }}>rename</Button>
                        </Flex>
                        <Text>Type: {thing.firmwareName}</Text>
                        <Box>
                            {thing.vThing.api.map((entry: any) => (
                                <Box key={entry.name} sx={{
                                    paddingLeft: "25px",
                                    paddingBottom: "5px",
                                    color: "grey"
                                }}>
                                    <div>{entry.name}({entry.args.map((x: string) => x.split(":")[0]).join(", ")})</div>
                                    {entry.args.map((x: any, i: number) => <div key={i} sx={{ paddingLeft: "10px" }}>{x}</div>)}
                                    {entry.return
                                        ? <div sx={{
                                            paddingLeft: "10px",
                                            overflow: "auto",
                                            whiteSpace: "nowrap"
                                        }}><b>returns:</b> {entry.return}</div>
                                        : null}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
                {Object.keys(things).length === 0 && <Text sx={{
                    color: "gray"
                }}>no things found...<br />(maybe try scanning or pairing?)</Text>}
            </Flex>
        </Flex>
    );
}

enum ScanState {
    Loading,
    Error,
    Idle
};

function ScanButton() {
    const [state, setState] = useState<ScanState>(ScanState.Idle);

    return (
        <Button disabled={state === ScanState.Loading} onClick={async () => {
            setState(ScanState.Loading);
            try {
                await rescan();
                setState(ScanState.Idle);
            } catch(e) {
                setState(ScanState.Error);
                patchStore({
                    things: {}
                });
                console.error(e);
            }
        }}>
            scan
            {state === ScanState.Loading && "…"}
            {state === ScanState.Error && <span sx={{
                color: "red",
                ml: "0.25rem"
            }}>!</span>}
        </Button>
    );
}