import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';

const ManageHealthTips = () => {
  const { backendUrl, aToken } = useContext(AdminContext);
  const [healthTips, setHealthTips] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    points: [''],
    icon: '',
    colorClass: '',
  });
  const [editId, setEditId] = useState(null);

  const fetchHealthTips = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/content/health-tips`);
      if (data.success) {
        setHealthTips(data.data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchHealthTips();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePointChange = (index, value) => {
    const newPoints = [...formData.points];
    newPoints[index] = value;
    setFormData({ ...formData, points: newPoints });
  };

  const addPoint = () => {
    setFormData({ ...formData, points: [...formData.points, ''] });
  };

  const removePoint = (index) => {
    const newPoints = formData.points.filter((_, i) => i !== index);
    setFormData({ ...formData, points: newPoints });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const { data } = await axios.put(
          `${backendUrl}/api/content/health-tips/${editId}`,
          formData,
          { headers: { Authorization: `Bearer ${aToken}` } }
        );
        if (data.success) {
          toast.success(data.message);
          fetchHealthTips();
          resetForm();
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/content/health-tips`,
          formData,
          { headers: { Authorization: `Bearer ${aToken}` } }
        );
        if (data.success) {
          toast.success(data.message);
          fetchHealthTips();
          resetForm();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      points: item.points,
      icon: item.icon || '',
      colorClass: item.colorClass || '',
    });
    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const { data } = await axios.delete(
          `${backendUrl}/api/content/health-tips/${id}`,
          { headers: { Authorization: `Bearer ${aToken}` } }
        );
        if (data.success) {
          toast.success(data.message);
          fetchHealthTips();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      points: [''],
      icon: '',
      colorClass: '',
    });
    setEditId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Health Tips</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Points</label>
            {formData.points.map((point, index) => (
              <div key={index} className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => handlePointChange(index, e.target.value)}
                  className="p-2 w-full border rounded-md"
                  required
                />
                {formData.points.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePoint(index)}
                    className="p-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addPoint}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md"
            >
              Add Point
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Icon (e.g., 🥗)</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Color Class (e.g., from-blue-500 to-indigo-600)</label>
            <input
              type="text"
              name="colorClass"
              value={formData.colorClass}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="p-2 bg-green-500 text-white rounded-md"
          >
            {editId ? 'Update' : 'Add'} Health Tip
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="p-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Health Tips</h2>
        {healthTips.length === 0 ? (
          <p>No health tips found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {healthTips.map((item) => (
              <div key={item._id} className="border p-4 rounded-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">Description: {item.description}</p>
                  <p className="text-sm">Points: {item.points.join(', ')}</p>
                  {item.icon && <p className="text-sm">Icon: {item.icon}</p>}
                  {item.colorClass && <p className="text-sm">Color Class: {item.colorClass}</p>}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 bg-blue-500 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageHealthTips;