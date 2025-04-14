exports.attachCourseId = (req, res, next) => {
    const courseId = req.params.courseId;
    req.courseId = courseId;

    next();
}