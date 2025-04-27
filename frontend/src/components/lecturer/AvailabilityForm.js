/*import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircleIcon, ClockIcon, SaveIcon } from 'lucide-react'
const AvailabilityForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      monday: {
        available: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      tuesday: {
        available: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      wednesday: {
        available: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      thursday: {
        available: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      friday: {
        available: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      saturday: {
        available: false,
        startTime: '09:00',
        endTime: '13:00',
      },
      sunday: {
        available: false,
        startTime: '09:00',
        endTime: '13:00',
      },
    },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  // Watch all values to enable/disable time inputs based on availability
  const watchAll = watch()
  const days = [
    {
      id: 'monday',
      label: 'Monday',
    },
    {
      id: 'tuesday',
      label: 'Tuesday',
    },
    {
      id: 'wednesday',
      label: 'Wednesday',
    },
    {
      id: 'thursday',
      label: 'Thursday',
    },
    {
      id: 'friday',
      label: 'Friday',
    },
    {
      id: 'saturday',
      label: 'Saturday',
    },
    {
      id: 'sunday',
      label: 'Sunday',
    },
  ]
  const onSubmit = (data) => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      console.log('Availability updated:', data)
      setIsSubmitting(false)
      setSubmitSuccess(true)
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Update Availability
        </h2>
        <p className="text-gray-600">Set your weekly teaching availability</p>
      </div>
      {submitSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
          <CheckCircleIcon className="mr-3 h-5 w-5 text-green-500 mt-0.5" />
          <span>Your availability has been updated successfully.</span>
        </div>
      )}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {days.map((day) => (
              <div key={day.id} className="p-4 border rounded-md bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center mb-4 md:mb-0 md:w-1/4">
                    <input
                      type="checkbox"
                      id={`${day.id}-available`}
                      {...register(`${day.id}.available`)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`${day.id}-available`}
                      className="ml-2 block text-sm font-medium text-gray-700"
                    >
                      {day.label}
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-3/4">
                    <div>
                      <label
                        htmlFor={`${day.id}-start`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Start Time
                      </label>
                      <input
                        type="time"
                        id={`${day.id}-start`}
                        disabled={!watchAll[day.id]?.available}
                        {...register(`${day.id}.startTime`, {
                          required: watchAll[day.id]?.available
                            ? 'Start time is required'
                            : false,
                        })}
                        className={`w-full border ${errors[day.id]?.startTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${!watchAll[day.id]?.available ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      />
                      {errors[day.id]?.startTime && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[day.id]?.startTime.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor={`${day.id}-end`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        End Time
                      </label>
                      <input
                        type="time"
                        id={`${day.id}-end`}
                        disabled={!watchAll[day.id]?.available}
                        {...register(`${day.id}.endTime`, {
                          required: watchAll[day.id]?.available
                            ? 'End time is required'
                            : false,
                          validate: (value) => {
                            if (!watchAll[day.id]?.available) return true
                            return (
                              value > watchAll[day.id]?.startTime ||
                              'End time must be after start time'
                            )
                          },
                        })}
                        className={`w-full border ${errors[day.id]?.endTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${!watchAll[day.id]?.available ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      />
                      {errors[day.id]?.endTime && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[day.id]?.endTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Set your available teaching hours for each day of the week
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon size={18} className="mr-2" />
                    Save Availability
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Your availability settings help the
          administration create optimal teaching schedules. Please keep your
          availability up-to-date to ensure scheduling accuracy.
        </p>
      </div>
    </div>
  )
}
export default AvailabilityForm
*/
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircleIcon, ClockIcon, SaveIcon } from 'lucide-react';

const AvailabilityForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      monday: {
        available: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      tuesday: {
        available: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      wednesday: {
        available: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      thursday: {
        available: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      friday: {
        available: true,
        startTime: '09:00',
        endTime: '17:00',
      },
      saturday: {
        available: false,
        startTime: '09:00',
        endTime: '13:00',
      },
      sunday: {
        available: false,
        startTime: '09:00',
        endTime: '13:00',
      },
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Watch all values to enable/disable time inputs based on availability
  const watchAll = watch();

  const days = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' },
  ];

  const onSubmit = (data) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Availability updated:', data);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Update Availability</h2>
        <p className="text-gray-600">Set your weekly teaching availability</p>
      </div>

      {submitSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
          <CheckCircleIcon className="mr-3 h-5 w-5 text-green-500 mt-0.5" />
          <span>Your availability has been updated successfully.</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            {days.map((day) => (
              <div key={day.id} className="p-4 border rounded-md bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex items-center mb-4 md:mb-0 md:w-1/4">
                    <input
                      type="checkbox"
                      id={`${day.id}-available`}
                      {...register(`${day.id}.available`)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`${day.id}-available`}
                      className="ml-2 block text-sm font-medium text-gray-700"
                    >
                      {day.label}
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-3/4">
                    <div>
                      <label
                        htmlFor={`${day.id}-start`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Start Time
                      </label>
                      <input
                        type="time"
                        id={`${day.id}-start`}
                        disabled={!watchAll[day.id]?.available}
                        {...register(`${day.id}.startTime`, {
                          required: watchAll[day.id]?.available
                            ? 'Start time is required'
                            : false,
                        })}
                        className={`w-full border ${errors[day.id]?.startTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${!watchAll[day.id]?.available ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      />
                      {errors[day.id]?.startTime && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[day.id]?.startTime.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor={`${day.id}-end`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        End Time
                      </label>
                      <input
                        type="time"
                        id={`${day.id}-end`}
                        disabled={!watchAll[day.id]?.available}
                        {...register(`${day.id}.endTime`, {
                          required: watchAll[day.id]?.available
                            ? 'End time is required'
                            : false,
                          validate: (value) => {
                            if (!watchAll[day.id]?.available) return true;
                            return (
                              value > watchAll[day.id]?.startTime ||
                              'End time must be after start time'
                            );
                          },
                        })}
                        className={`w-full border ${errors[day.id]?.endTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${!watchAll[day.id]?.available ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      />
                      {errors[day.id]?.endTime && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[day.id]?.endTime.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <ClockIcon className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Set your available teaching hours for each day of the week
                </span>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
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
                    Saving...
                  </>
                ) : (
                  <>
                    <SaveIcon size={18} className="mr-2" />
                    Save Availability
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Your availability settings help the
          administration create optimal teaching schedules. Please keep your
          availability up-to-date to ensure scheduling accuracy.
        </p>
      </div>
    </div>
  );
};

export default AvailabilityForm;