import ChunkModel from "../models/chunk.model.js";

export const getDocuments = async (req, res) => {
  try {
    const docs = await ChunkModel.aggregate([
      { $match: { user_id: req.user.id } },
      {
        $group: {
          _id: "$file_id",
          file_name: { $first: "$file_name" },
        },
      },
    ]);

    res.json(docs);
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Server error" });
  }
};