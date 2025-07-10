import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import useTeamMembers from "./hooks/useTeamMembers";
import TeamTable from "./TeamTable";
import TeamSearch from "./TeamSearch";
import TeamActions from "./TeamActions";
import AddModal from "./teamModals/AddModal";
import EditModal from "./teamModals/EditModal";
import DeleteModal from "./teamModals/DeleteModal";

const Team = () => {
  const {
    teamMembers,
    loading,
    error,
    pagination,
    fetchTeamMembers,
    handleDelete,
    handleSave,
    role,
  } = useTeamMembers();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);

  const searchedMembers = useMemo(() => {
    return (filtersApplied ? filteredMembers : teamMembers).filter((member) =>
      member["Employee Name"]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, filteredMembers, teamMembers, filtersApplied]);

  const applyFilters = () => {
    const filtered = teamMembers.filter((member) => {
      const matchesRole =
        !selectedRole ||
        String(member.Role).toLowerCase() === selectedRole.toLowerCase();

      const matchesStatus =
        !statusFilter ||
        (statusFilter === "active" && member.status === true) ||
        (statusFilter === "inactive" && member.status === false);

      return matchesRole && matchesStatus;
    });

    setFilteredMembers(filtered);
    setFiltersApplied(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container-fluid p-3 p-md-4"
      style={{
        background: "linear-gradient(180deg, #e8ecf1 0%, #dcd9e6 100%)",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        minHeight: "calc(100vh - 66px)",
      }}
    >
      <ToastContainer />

      {!isEditing && !isAdding && (
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4 gap-3">
          <TeamSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <TeamActions setIsAdding={setIsAdding} />
        </div>
      )}

      <AnimatePresence mode="wait">
        {isEditing && selectedMember ? (
          <EditModal
            member={selectedMember}
            onSave={handleSave}
            onClose={() => setIsEditing(false)}
          />
        ) : isAdding ? (
          <AddModal onSave={handleSave} onClose={() => setIsAdding(false)} />
        ) : (
          <>
            <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
              {/* Role Dropdown */}
              <select
                className="form-select"
                style={{ maxWidth: "200px" }}
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">All Roles</option>
                {role.map((role) => (
                  <option key={role.id} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
              </select>

              {/* Status Dropdown */}
              <select
                className="form-select"
                style={{ maxWidth: "200px" }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Apply Button */}
              <button className="btn btn-primary" onClick={applyFilters}>
                Apply Filters
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSelectedRole("");
                  setStatusFilter("");
                  setFiltersApplied(false);
                }}
              >
                Clear Filters
              </button>
            </div>

            <TeamTable
              members={
                (filtersApplied ? filteredMembers : teamMembers,
                searchedMembers)
              }
              loading={loading}
              error={error}
              pagination={pagination}
              fetchTeamMembers={fetchTeamMembers}
              onEdit={(member) => {
                setSelectedMember(member);
                setIsEditing(true);
              }}
              onDelete={(member) => {
                setMemberToDelete(member);
                setShowDeleteModal(true);
              }}
            />
          </>
        )}
      </AnimatePresence>

      {showDeleteModal && memberToDelete && (
        <DeleteModal
          member={memberToDelete}
          onDelete={async () => {
            const success = await handleDelete(memberToDelete.id);
            if (success) setShowDeleteModal(false);
          }}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </motion.div>
  );
};

export default Team;
