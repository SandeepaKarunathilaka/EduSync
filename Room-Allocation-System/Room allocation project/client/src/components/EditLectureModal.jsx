import lectureApi from "../api/lectureApi";
import React, { useState, useEffect } from "react";
import { Modal, Input, Form, InputNumber, message, Checkbox } from "antd";
// Edit Lecture Modal Component
export const EditLectureModal = ({
  open,
  onClose,
  lecture,
  chapterId,
  onDataUpdate,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (lecture && open) {
      form.setFieldsValue({
        title: lecture.title,
        duration: lecture.duration,
        lectureUrl: lecture.lectureUrl,
        isPreview: lecture.isPreview,
      });
    }
  }, [lecture, open, form]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const updatedLecture = {
        title: values.title,
        duration: values.duration,
        lectureUrl: values.lectureUrl,
        isPreview: values.isPreview,
        chapter: chapterId || lecture.chapter,
      };

      await lectureApi.updateLecture(lecture._id, updatedLecture);
      if (onDataUpdate) await onDataUpdate();
      message.success("Lecture updated successfully!");
      onClose(true); // Pass true to indicate successful update
    } catch (error) {
      console.error("Failed to update lecture:", error);
      message.error("Failed to update lecture");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Lecture"
      open={open}
      onCancel={() => onClose(false)}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
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
      </Form>
    </Modal>
  );
};
