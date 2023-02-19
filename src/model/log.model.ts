import { Schema, model } from "mongoose";
import { ILog } from "@/interface/db.interface";

const LogSchema = new Schema<ILog>({
    log: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

export default model<ILog>("Logs", LogSchema);