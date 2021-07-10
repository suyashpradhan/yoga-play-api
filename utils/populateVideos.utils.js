const populateVideos = async (documentToPopulate) => {
  documentToPopulate.videos = documentToPopulate.videos.filter((video) => video.isActive);
  documentToPopulate = await documentToPopulate.populate("videos._id").execPopulate();
  return documentToPopulate.videos.map((video) => video._id);
};

module.exports = populateVideos