const Course = require("./model");
const Chapter = require("../chapter/model");
const Lecture = require("../lecture/model");

const createCourse = async (courseData) => {
  const course = new Course(courseData);
  return await course.save();
};

const getAllCourses = async () => {
  try {
    // Fetch all courses that are not deleted
    const courses = await Course.find({ deleteStatus: false });

    // Populate chapters and lectures for each course
    const coursesWithDetails = await Promise.all(
      courses.map(async (course) => {
        // Find all chapters associated with the course
        const chapters = await Chapter.find({
          course: course._id,
          deleteStatus: false,
        });

        // Populate lectures for each chapter
        const chaptersWithLectures = await Promise.all(
          chapters.map(async (chapter) => {
            const lectures = await Lecture.find({
              chapter: chapter._id,
              deleteStatus: false,
            });
            return {
              ...chapter.toObject(),
              lectures,
            };
          })
        );

        return {
          ...course.toObject(),
          chapters: chaptersWithLectures,
        };
      })
    );

    return coursesWithDetails;
  } catch (error) {
    console.error("Error fetching courses with details:", error);
    throw error;
  }
};

const getCourseById = async (id) => {
  return await Course.findById(id);
};

const updateCourse = async (id, courseData) => {
  return await Course.findByIdAndUpdate(id, courseData, { new: true });
};

const deleteCourse = async (id) => {
  return await Course.findByIdAndUpdate(
    id,
    { deleteStatus: true },
    { new: true }
  );
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
