import { buildFeedbackPath, extractFeedback } from "./feedback";

function handle(req, res) {
    const feedbackId = req.query.feedbackId; // để truy cập và nhận feedbackId của mình
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);
    const selectedFeedback = feedbackData.find(
        (feedback) => feedback.id === feedbackId
    );
    res.status(200).json({
        feedback: selectedFeedback
    });
}
export default handle;