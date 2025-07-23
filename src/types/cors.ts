export type ICorsConfig = {
    // origin: string[];
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean | undefined) => void) => void;
    methods: string[];
    credentials: boolean;
    allowedHeaders?: string[];
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
};