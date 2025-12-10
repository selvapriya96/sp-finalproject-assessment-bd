import Result from "../models/resultModel.js";

export const getResultById = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("userId", "name email")
      .populate("examId", "title")
      .populate("answers.questionId");

    if (!result)
      return res.status(404).json({ message: "Result not found" });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
