import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';

const ManageFirstAid = () => {
  const { backendUrl, aToken } = useContext(AdminContext);
  const [firstAidItems, setFirstAidItems] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    steps: [''],
    note: '',
    icon: '',
  });
  const [editId, setEditId] = useState(null);

  const fetchFirstAidItems = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/content/first-aid`);
      if (data.success) {
        setFirstAidItems(data.data);
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    fetchFirstAidItems();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const addStep = () => {
    setFormData({ ...formData, steps: [...formData.steps, ''] });
  };

  const removeStep = (index) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    setFormData({ ...formData, steps: newSteps });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const { data } = await axios.put(
          `${backendUrl}/api/content/first-aid/${editId}`,
          formData,
          { headers: { Authorization: `Bearer ${aToken}` } }
        );
        if (data.success) {
          toast.success('First aid item updated successfully', {
            position: "top-center",
            autoClose: 3000,
          });
          fetchFirstAidItems();
          resetForm();
        } else {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/content/first-aid`,
          formData,
          { headers: { Authorization: `Bearer ${aToken}` } }
        );
        if (data.success) {
          toast.success('First aid item added successfully', {
            position: "top-center",
            autoClose: 3000,
          });
          fetchFirstAidItems();
          resetForm();
        } else {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 3000,
          });
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'An error occurred', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      category: item.category,
      title: item.title,
      steps: item.steps,
      note: item.note || '',
      icon: item.icon || '',
    });
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    toast.warn(
      ({ closeToast }) => (
        <div className="flex flex-col items-center gap-2">
          <p>Are you sure you want to delete this first aid item?</p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                console.log(`Attempting to delete first aid item with ID: ${id}`);
                try {
                  const response = await axios.delete(
                    `${backendUrl}/api/content/first-aid/${id}`,
                    { headers: { Authorization: `Bearer ${aToken}` } }
                  );
                  console.log('Delete response:', response.data);
                  if (response.data.success) {
                    toast.success('First aid item deleted successfully', {
                      position: "top-center",
                      autoClose: 3000,
                    });
                    fetchFirstAidItems();
                  } else {
                    toast.error(response.data.message || 'Failed to delete first aid item', {
                      position: "top-center",
                      autoClose: 3000,
                    });
                  }
                } catch (error) {
                  console.error('Delete error:', error);
                  toast.error(error.response?.data?.message || error.message || 'An error occurred while deleting', {
                    position: "top-center",
                    autoClose: 3000,
                  });
                } finally {
                  closeToast();
                }
              }}
              className="p-2 bg-red-500 text-white rounded-md hover:scale-105 transition-transform"
            >
              Yes
            </button>
            <button
              onClick={() => {
                console.log('Deletion cancelled');
                closeToast();
              }}
              className="p-2 bg-gray-500 text-white rounded-md hover:scale-105 transition-transform"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  const resetForm = () => {
    setFormData({
      category: '',
      title: '',
      steps: [''],
      note: '',
      icon: '',
    });
    setEditId(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage First Aid Content</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
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
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Steps</label>
            {formData.steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  className="p-2 w-full border rounded-md"
                  required
                />
                {formData.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="p-2 bg-red-500 text-white rounded-md"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="mt-2 p-2 bg-blue-500 text-white rounded-md"
            >
              Add Step
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Note (Optional)</label>
            <input
              type="text"
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Icon (e.g., FaHeartbeat)</label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
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
            {editId ? 'Update' : 'Add'} First Aid
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
        <h2 className="text-2xl font-semibold mb-4">First Aid Items</h2>
        {firstAidItems.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {firstAidItems.map((item) => (
              <div key={item._id} className="border p-4 rounded-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">Category: {item.category}</p>
                  <p className="text-sm">Steps: {item.steps.join(', ')}</p>
                  {item.note && <p className="text-sm text-red-600">Note: {item.note}</p>}
                  {item.icon && <p className="text-sm">Icon: {item.icon}</p>}
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

export default ManageFirstAid;