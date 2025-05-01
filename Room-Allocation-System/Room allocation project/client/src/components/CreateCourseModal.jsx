import React, { useState } from "react";
import {
  Modal,
  Input,
  Button,
  Form,
  Upload,
  InputNumber,
  Checkbox,
  message,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadFile } from "../service/uploadFileService";
import courseApi from "../api/courseApi";
import chapterApi from "../api/chapterApi";
import lectureApi from "../api/lectureApi";

const CreateCourseModal = ({ open, onClose, onDataUpdate }) => {
  const [form] = Form.useForm();
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [newChapterName, setNewChapterName] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [isLectureModalOpen, setIsLectureModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleAddChapter = () => {
    if (newChapterName.trim() === "") return;
    setChapters([...chapters, { name: newChapterName, lectures: [] }]);
    setNewChapterName("");
    setIsChapterModalOpen(false);
  };

  const handleAddLecture = (values) => {
    const updatedChapters = chapters.map((chapter) => {
      if (chapter.name === selectedChapter) {
        return { ...chapter, lectures: [...chapter.lectures, values] };
      }
      return chapter;
    });
    setChapters(updatedChapters);
    setIsLectureModalOpen(false);
  };

  const handleUpload = async ({ file }) => {
    setUploading(true);
    try {
      const url = await uploadFile(file);
      form.setFieldsValue({ thumbnail: url });
      message.success("Thumbnail uploaded successfully!");
    } catch (error) {
      console.error(error);
      message.error("Thumbnail upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields().then(async (values) => {
        console.log("Course Data:", { ...values, chapters });
        //create course
        const courseData = {
          title: values.title,
          description: values.description,
          price: values.price,
          discount: values.discount,
          courseThumbnail: values.thumbnail,
        };

        //create chapter
        const course = await courseApi.createCourse(courseData);
        //create lecture
        for (const chapterData of chapters) {
          const createChapterData = {
            ...chapterData,
            course: course._id,
          };
          const chapter = await chapterApi.createChapter(createChapterData);
          for (const lecture of chapterData.lectures) {
            await lectureApi.createLecture({
              ...lecture,
              chapter: chapter._id,
            });
          }
        }
        if (onDataUpdate) await onDataUpdate();
        onClose();
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main Course Modal */}
      <Modal
        title="Create Course"
        open={open}
        width={1000}
        onCancel={onClose}
        onOk={handleSubmit}
        loading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Enter course title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Enter description" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Enter course price" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Discount" name="discount">
            <InputNumber style={{ width: "100%" }} min={0} max={100} />
          </Form.Item>

          <Form.Item
            label="Thumbnail"
            name="thumbnail"
            rules={[{ required: true, message: "Upload a thumbnail" }]}
          >
            <Upload
              customRequest={handleUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                {uploading ? "Uploading..." : "Upload Thumbnail"}
              </Button>
            </Upload>
            {form.getFieldValue("thumbnail") && (
              <img
                src={form.getFieldValue("thumbnail")}
                alt="Thumbnail"
                style={{ marginTop: 10, width: "100px", height: "auto" }}
              />
            )}
          </Form.Item>

          <Button
            type="dashed"
            onClick={() => setIsChapterModalOpen(true)}
            block
          >
            <PlusOutlined /> Add Chapter
          </Button>

          {/* Display Added Chapters */}
          {chapters.map((chapter) => (
            <div
              key={chapter.name}
              style={{ marginTop: 10, padding: 10, border: "1px solid #ddd" }}
            >
              <strong>{chapter.name}</strong>
              <Button
                size="small"
                onClick={() => {
                  setSelectedChapter(chapter.name);
                  setIsLectureModalOpen(true);
                }}
              >
                Add Lecture
              </Button>
              <ul>
                {chapter.lectures.map((lecture, index) => (
                  <li key={index}>
                    {lecture.title} ({lecture.duration} mins)
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Form>
      </Modal>

      {/* Add Chapter Modal */}
      <Modal
        title="Add Chapter"
        open={isChapterModalOpen}
        onCancel={() => setIsChapterModalOpen(false)}
        onOk={handleAddChapter}
      >
        <Input
          placeholder="Chapter Name"
          value={newChapterName}
          onChange={(e) => setNewChapterName(e.target.value)}
        />
      </Modal>

      {/* Add Lecture Modal */}
      <Modal
        title="Add Lecture"
        open={isLectureModalOpen}
        onCancel={() => setIsLectureModalOpen(false)}
        footer={null}
      >
        <Form onFinish={handleAddLecture} layout="vertical">
          <Form.Item
            label="Lecture Title"
            name="title"
            rules={[{ required: true, message: "Enter lecture title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Duration (mins)"
            name="duration"
            rules={[{ required: true, message: "Enter duration" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Lecture URL"
            name="lectureUrl"
            rules={[{ required: true, message: "Enter URL" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="isPreview" valuePropName="checked">
            <Checkbox>Preview</Checkbox>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Add Lecture
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default CreateCourseModal;
