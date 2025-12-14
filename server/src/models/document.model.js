import { Schema, model } from "mongoose";

const DocumentDetailSchema = new Schema({
    document_name: { type: String, required: true },
    procurement_method: { type: String }
});

const SchemeDocumentSchema = new Schema({
    scheme_name: { type: String, required: true },
    documents: [DocumentDetailSchema]
});

const DocumentSchema = new Schema({
    clerkUserId: { type: String, required: true },
    executionId: { type: String, required: true },
    schemes: [SchemeDocumentSchema],
    // Optional: Link to a user if available in the future
    // userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Document = model("Document", DocumentSchema);
