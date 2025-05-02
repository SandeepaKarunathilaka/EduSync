import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function Update() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { idd } = useParams();

  // ✅ Fetch the specific record
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/records`);
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }

        const selected = data.find((rec) => rec._id === idd);
        if (selected) {
          setFormData(selected);
        } else {
          setPublishError("Record not found");
        }
      } catch (error) {
        setPublishError("Failed to fetch data");
      }
    };

    fetchData();
  }, [idd]);

  // ✅ Submit the updated record
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/records/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      alert("Successfully updated!");
      navigate("/record");
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[500px]">
        <h1 className="text-3xl font-bold text-center text-black mb-6 uppercase">Update Record</h1>

        {publishError && (
          <p className="text-red-600 text-center mb-4">{publishError}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            className="bg-slate-100 p-3 rounded-lg"
            type="text"
            placeholder="Student ID"
            id="sId"
            value={formData.sId || ""}
            onChange={(e) => setFormData({ ...formData, sId: e.target.value })}
            required
          />

          <input
            className="bg-slate-100 p-3 rounded-lg"
            type="text"
            placeholder="Name"
            id="name"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <select
            name="gender"
            id="gender"
            className="bg-slate-100 p-3 rounded-lg"
            value={formData.gender || ""}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            className="bg-slate-100 p-3 rounded-lg"
            type="text"
            placeholder="Intake"
            id="intake"
            value={formData.intake || ""}
            onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
            required
          />

          <input
            className="bg-slate-100 p-3 rounded-lg"
            type="text"
            placeholder="Batch"
            id="batch"
            value={formData.batch || ""}
            onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
            required
          />

          <input
            className="bg-slate-100 p-3 rounded-lg"
            type="text"
            placeholder="Operations"
            id="operations"
            value={formData.operations || ""}
            onChange={(e) => setFormData({ ...formData, operations: e.target.value })}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg uppercase font-semibold"
          >
            Submit
          </button>

          <Link to="/record" className="text-center text-blue-600 hover:underline mt-2">
            Back to Records
          </Link>
        </form>
      </div>
    </div>
  );
}
