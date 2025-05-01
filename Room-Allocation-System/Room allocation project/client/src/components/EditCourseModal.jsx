import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Form, Upload, InputNumber, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile } from "../service/uploadFileService.js";
import courseApi from "../api/courseApi";

// Edit Course Modal Component
export const EditCourseModal = ({ open, onClose, course, onDataUpdate }) => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course && open) {
      form.setFieldsValue({
        title: course.title,
        description: course.description,
        price: course.price,
        discount: course.discount || 0,
        thumbnail: course.courseThumbnail,
      });
    }
  }, [course, open, form]);

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
    setLoading(true);
    try {
      const values = await form.validateFields();
      const updatedCourse = {
        title: values.title,
        description: values.description,
        price: values.price,
        discount: values.discount,
        courseThumbnail: values.thumbnail,
      };

      await courseApi.updateCourse(course._id, updatedCourse);
      if (onDataUpdate) await onDataUpdate();
      message.success("Course updated successfully!");
      onClose(true); // Pass true to indicate successful update
    } catch (error) {
      console.error("Failed to update course:", error);
      message.error("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Course"
      open={open}
      width={800}
      onCancel={() => onClose(false)}
      onOk={handleSubmit}
      confirmLoading={loading}
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
              {uploading ? "Uploading..." : "Update Thumbnail"}
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
      </Form>
    </Modal>
  );
};
