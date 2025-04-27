import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AlertCircleIcon, CheckCircleIcon, SendIcon } from 'lucide-react'
const RequestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const onSubmit = (data) => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log('Request submitted:', data)
      setIsSubmitting(false)
      setSubmitSuccess(true)
      reset()
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Submit Request</h2>
        <p className="text-gray-600">
          Submit a request or concern to the admin
        </p>
      </div>
      {submitSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
          <CheckCircleIcon className="mr-3 h-5 w-5 text-green-500 mt-0.5" />
          <span>
            Your request has been submitted successfully. The admin will review
            it shortly.
          </span>
        </div>
      )}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Request Type
              </label>
              <select
                {...register('requestType', {
                  required: 'Please select a request type',
                })}
                className={`w-full border ${errors.requestType ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select a request type</option>
                <option value="schedule_change">Schedule Change</option>
                <option value="room_change">Room Change</option>
                <option value="technical_issue">Technical Issue</option>
                <option value="other">Other</option>
              </select>
              {errors.requestType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.requestType.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                {...register('priority', {
                  required: 'Please select a priority level',
                })}
                className={`w-full border ${errors.priority ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
              {errors.priority && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.priority.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              {...register('subject', {
                required: 'Subject is required',
              })}
              placeholder="Brief description of your request"
              className={`w-full border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-600">
                {errors.subject.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Details
            </label>
            <textarea
              rows={5}
              {...register('details', {
                required: 'Please provide details about your request',
                minLength: {
                  value: 20,
                  message:
                    'Please provide more details (minimum 20 characters)',
                },
              })}
              placeholder="Provide detailed information about your request"
              className={`w-full border ${errors.details ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            ></textarea>
            {errors.details && (
              <p className="mt-1 text-sm text-red-600">
                {errors.details.message}
              </p>
            )}
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Related Courses (if applicable)
            </label>
            <select
              multiple
              {...register('relatedCourses')}
              className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="intro_programming">
                Introduction to Programming
              </option>
              <option value="data_structures">Data Structures</option>
              <option value="database_systems">Database Systems</option>
              <option value="software_engineering">Software Engineering</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Hold Ctrl (or Cmd) to select multiple courses
            </p>
          </div>
          <div className="mt-6 flex items-start">
            <div className="flex items-center h-5">
              <input
                id="urgent"
                type="checkbox"
                {...register('urgent')}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="urgent" className="font-medium text-gray-700">
                Mark as urgent
              </label>
              <p className="text-gray-500">
                This will notify the admin immediately
              </p>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center w-full md:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <SendIcon size={18} className="mr-2" />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircleIcon className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Need immediate assistance?
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                For urgent matters requiring immediate attention, please contact
                the admin office directly at:
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Email: admin@university.edu</li>
                <li>Phone: (555) 123-4567</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RequestForm
