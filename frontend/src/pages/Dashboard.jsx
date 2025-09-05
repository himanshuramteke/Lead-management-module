import { useEffect, useState } from "react";
import { getAllLeads, deleteLead, updateLead } from "../apis/leads";
import toast from "react-hot-toast";
import { Trash2, Edit, Phone, Mail, Building } from "lucide-react";

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLead, setEditingLead] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await getAllLeads();
      const leadsData = response?.data || [];
      setLeads(leadsData);
    } catch (error) {
      console.error("Error fetching leads:", error);
      toast.error("Failed to fetch leads.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      try {
        await deleteLead(id);
        toast.success("Lead deleted successfully.");
        fetchLeads();
      } catch {
        toast.error("Error deleting lead.");
      }
    }
  };

  const handleEdit = (lead) => {
    setEditingLead(lead._id);
    setEditForm({
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      company: lead.company || "",
      status: lead.status,
      priority: lead.priority,
      source: lead.source,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLead(editingLead, editForm);
      toast.success("Lead updated successfully.");
      setEditingLead(null);
      setEditForm({});
      fetchLeads();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating lead.");
    }
  };

  const handleCancelEdit = () => {
    setEditingLead(null);
    setEditForm({});
  };

  const getStatusColor = (status) => {
    const statusColors = {
      new: "bg-blue-600",
      contacted: "bg-yellow-600",
      qualified: "bg-green-600",
      proposal: "bg-purple-600",
      negotiation: "bg-orange-600",
      won: "bg-emerald-600",
      lost: "bg-red-600",
    };
    return statusColors[status] || "bg-gray-600";
  };

  const getPriorityColor = (priority) => {
    const priorityColors = {
      low: "text-green-400",
      medium: "text-yellow-400",
      high: "text-red-400",
    };
    return priorityColors[priority] || "text-gray-400";
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-orange-500 text-lg">Loading leads...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-500">Leads Dashboard</h2>
        <div className="text-sm text-gray-400">
          Total Leads:{" "}
          <span className="text-orange-400 font-semibold">{leads.length}</span>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="text-center text-gray-400 py-16">
          <Building size={64} className="mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl mb-2">No leads found</h3>
          <p>Create your first lead to get started!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {leads.map((lead) => (
                <tr
                  key={lead._id}
                  className="hover:bg-gray-700 transition-colors"
                >
                  {editingLead === lead._id ? (
                    <td colSpan="7" className="px-6 py-4">
                      <form onSubmit={handleUpdateSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="First Name"
                            value={editForm.firstName}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                firstName: e.target.value,
                              })
                            }
                            className="px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            value={editForm.lastName}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                lastName: e.target.value,
                              })
                            }
                            className="px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                email: e.target.value,
                              })
                            }
                            className="px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          />
                          <input
                            type="tel"
                            placeholder="Phone"
                            value={editForm.phone}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                phone: e.target.value,
                              })
                            }
                            className="px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Company"
                            value={editForm.company}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                company: e.target.value,
                              })
                            }
                            className="px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                          <select
                            value={editForm.status}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                status: e.target.value,
                              })
                            }
                            className="px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="proposal">Proposal</option>
                            <option value="negotiation">Negotiation</option>
                            <option value="won">Won</option>
                            <option value="lost">Lost</option>
                          </select>
                          <select
                            value={editForm.priority}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                priority: e.target.value,
                              })
                            }
                            className="px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                          <select
                            value={editForm.source}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                source: e.target.value,
                              })
                            }
                            className="px-3 py-2 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                            <option value="website">Website</option>
                            <option value="referral">Referral</option>
                            <option value="social_media">Social Media</option>
                            <option value="email_campaign">
                              Email Campaign
                            </option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                          >
                            Save Changes
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </td>
                  ) : (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-white">
                              {lead.firstName} {lead.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          <div className="flex items-center mb-1">
                            <Mail size={14} className="mr-2 text-gray-400" />
                            <a
                              href={`mailto:${lead.email}`}
                              className="hover:text-orange-400"
                            >
                              {lead.email}
                            </a>
                          </div>
                          <div className="flex items-center">
                            <Phone size={14} className="mr-2 text-gray-400" />
                            <a
                              href={`tel:${lead.phone}`}
                              className="hover:text-orange-400"
                            >
                              {lead.phone}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {lead.company || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(
                            lead.status
                          )}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-medium ${getPriorityColor(
                            lead.priority
                          )}`}
                        >
                          {lead.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-300 capitalize">
                          {lead.source?.replace("_", " ") || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(lead)}
                            className="text-orange-400 hover:text-orange-300 transition-colors"
                            title="Edit Lead"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(lead._id)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
