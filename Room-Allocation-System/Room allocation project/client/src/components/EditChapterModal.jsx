import chapterApi from "../api/chapterApi";
import React, { useState, useEffect } from "react";
import { Modal, Input, Form, message } from "antd";

export const EditChapterModal = ({
  open,
  onClose,
  chapter,
  courseId,
  onDataUpdate,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chapter && open) {
      form.setFieldsValue({
        name: chapter.name,
      });
    }
  }, [chapter, open, form]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const updatedChapter = {
        name: values.name,
        course: courseId || chapter.course,
      };

      await chapterApi.updateChapter(chapter._id, updatedChapter);
      if (onDataUpdate) await onDataUpdate();
      message.success("Chapter updated successfully!");
      onClose(true); // Pass true to indicate successful update
    } catch (error) {
      console.error("Failed to update chapter:", error);
      message.error("Failed to update chapter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Chapter"
      open={open}
      onCancel={() => onClose(false)}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Chapter Name"
          name="name"
          rules={[{ required: true, message: "Enter chapter name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
