import mongoose from "mongoose";

const accordionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const Accordion = mongoose.model("Accordion", accordionSchema);

export default Accordion;
