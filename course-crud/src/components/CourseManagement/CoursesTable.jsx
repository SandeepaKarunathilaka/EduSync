import React, { useState } from "react";
import { Table, Typography, Button, Space, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import courseApi from "../../api/courseApi";
import chapterApi from "../../api/chapterApi";
import lectureApi from "../../api/lectureApi";
import { EditCourseModal } from "./EditCourseModal";
import { EditChapterModal } from "./EditChapterModal";
import { EditLectureModal } from "./EditLectureModal";

const { Text } = Typography;

const CoursesTable = ({ courses, onDataUpdate }) => {
  // State for edit modals
  const [editCourseModalVisible, setEditCourseModalVisible] = useState(false);
  const [editChapterModalVisible, setEditChapterModalVisible] = useState(false);
  const [editLectureModalVisible, setEditLectureModalVisible] = useState(false);

  // State for selected items
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);

  // Handle edit course
  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setEditCourseModalVisible(true);
  };

  // Handle edit chapter
  const handleEditChapter = (chapter) => {
    setSelectedChapter(chapter);
    setEditChapterModalVisible(true);
  };

  // Handle edit lecture
  const handleEditLecture = (lecture) => {
    setSelectedLecture(lecture);
    setEditLectureModalVisible(true);
  };

  // Handle delete course
  const handleDeleteCourse = async (courseId) => {
    try {
      await courseApi.deleteCourse(courseId);

      message.success("Course deleted successfully");
      if (onDataUpdate) onDataUpdate(); // Refresh data
    } catch (error) {
      console.error("Failed to delete course:", error);
      message.error("Failed to delete course");
    }
  };

  // Handle delete chapter
  const handleDeleteChapter = async (chapterId) => {
    try {
      await chapterApi.deleteChapter(chapterId);

      message.success("Chapter deleted successfully");
      if (onDataUpdate) onDataUpdate(); // Refresh data
    } catch (error) {
      console.error("Failed to delete chapter:", error);
      message.error("Failed to delete chapter");
    }
  };

  // Handle delete lecture
  const handleDeleteLecture = async (lectureId) => {
    try {
      await lectureApi.deleteLecture(lectureId);
      message.success("Lecture deleted successfully");
      if (onDataUpdate) onDataUpdate();
    } catch (error) {
      console.error("Failed to delete lecture:", error);
      message.error("Failed to delete lecture");
    }
  };

  // Handle edit modal close
  const handleEditModalClose = (updated = false) => {
    setEditCourseModalVisible(false);
    setEditChapterModalVisible(false);
    setEditLectureModalVisible(false);

    // Refresh data if something was updated
    if (updated && onDataUpdate) {
      onDataUpdate();
    }
  };

  const expandedRowRender = (record) => {
    const chapterColumns = [
      {
        title: "Chapter Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, chapter) => (
          <Space>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEditChapter(chapter)}
            />
            <Popconfirm
              title="Are you sure you want to delete this chapter?"
              description="All associated lectures will also be deleted."
              onConfirm={() => handleDeleteChapter(chapter._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      },
    ];

    const lectureColumns = [
      {
        title: "Lecture Title",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
        render: (duration) => `${duration} mins`,
      },
      {
        title: "Is Preview",
        dataIndex: "isPreview",
        key: "isPreview",
        render: (isPreview) => (isPreview ? "Yes" : "No"),
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, lecture) => (
          <Space>
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEditLecture(lecture)}
            />
            <Popconfirm
              title="Are you sure you want to delete this lecture?"
              onConfirm={() => handleDeleteLecture(lecture._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        ),
      },
    ];

    return (
      <Table
        columns={chapterColumns}
        dataSource={record.chapters}
        expandable={{
          expandedRowRender: (chapter) => (
            <Table
              columns={lectureColumns}
              dataSource={chapter.lectures}
              pagination={false}
              rowKey="_id"
            />
          ),
          rowExpandable: (chapter) =>
            chapter.lectures && chapter.lectures.length > 0,
        }}
        pagination={false}
        rowKey="_id"
      />
    );
  };

  const columns = [
    {
      title: "Course Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price}`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount || 0}%`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditCourse(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this course?"
            description="All chapters and lectures will also be deleted."
            onConfirm={() => handleDeleteCourse(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={courses}
        expandable={{ expandedRowRender }}
        rowKey="_id"
      />

      {/* Edit Course Modal */}
      <EditCourseModal
        open={editCourseModalVisible}
        onClose={handleEditModalClose}
        course={selectedCourse}
        onDataUpdate={onDataUpdate}
      />

      {/* Edit Chapter Modal */}
      <EditChapterModal
        open={editChapterModalVisible}
        onClose={handleEditModalClose}
        chapter={selectedChapter}
        courseId={selectedCourse?._id}
        onDataUpdate={onDataUpdate}
      />

      {/* Edit Lecture Modal */}
      <EditLectureModal
        open={editLectureModalVisible}
        onClose={handleEditModalClose}
        lecture={selectedLecture}
        chapterId={selectedChapter?._id}
        onDataUpdate={onDataUpdate}
      />
    </>
  );
};

export default CoursesTable;
