import Transport from "winston-transport";
import fs from "fs";
import path from "path";

export interface FifoFileTransportOptions extends Transport.TransportStreamOptions {
    filename: string;
    maxLogs?: number;
}

export class FifoFileTransport extends Transport {
    private readonly filename: string;
    private readonly maxLogs: number;
    private logEntries: string[] = [];
    private writePromise: Promise<void> = Promise.resolve();

    constructor(options: FifoFileTransportOptions) {
        super(options);
        this.filename = options.filename;
        this.maxLogs = options.maxLogs ?? 50;

        this.initializeLogFile();
    }

    private initializeLogFile(): void {
        try {
            const dir = path.dirname(this.filename);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            if (fs.existsSync(this.filename)) {
                const content = fs.readFileSync(this.filename, "utf-8");
                this.logEntries = content
                    .split("\n")
                    .map((line) => line.trim())
                    .filter((line) => line.length > 0);

                if (this.logEntries.length > this.maxLogs) {
                    this.logEntries = this.logEntries.slice(-this.maxLogs);
                    fs.writeFileSync(this.filename, this.logEntries.join("\n") + "\n", "utf-8");
                }
            }
        } catch (error: unknown) {
            this.logEntries = [];
            console.error("Failed to initialize FifoFileTransport file:", error);
        }
    }

    public override log(info: unknown, callback: () => void): void {
        setImmediate(() => {
            this.emit("logged", info);
        });

        const messageSymbol = Symbol.for("message");
        let logLine = "";

        if (
            typeof info === "object" &&
            info !== null &&
            messageSymbol in info &&
            typeof (info as Record<symbol, unknown>)[messageSymbol] === "string"
        ) {
            logLine = (info as Record<symbol, unknown>)[messageSymbol] as string;
        } else {
            logLine = JSON.stringify(info);
        }

        this.logEntries.push(logLine);

        // FIFO: If exceeds maxLogs, delete the first (oldest) error log entry
        if (this.logEntries.length > this.maxLogs) {
            this.logEntries.shift();
        }

        const dataToWrite = this.logEntries.join("\n") + "\n";

        // Queue writes sequentially to ensure atomic and safe file updates
        this.writePromise = this.writePromise
            .catch(() => {})
            .then(async () => {
                await fs.promises.writeFile(this.filename, dataToWrite, "utf-8");
            });

        this.writePromise
            .then(() => callback())
            .catch(() => callback());
    }
}
