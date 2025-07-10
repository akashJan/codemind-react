import { FiSearch, FiFilter, FiRefreshCw } from "react-icons/fi";

const VehicleToolbar = ({
  searchQuery,
  setSearchQuery,
  onAddVehicle,
  onRefresh,
  showDriverList,
  setShowDriverList,
  assignedUsers,
  onApplyFilters,
  onDriverToggle,
  selectedDrivers,
  setSelectedDrivers,
}) => {
  return (
    <div className="row mb-3">
      <div className="col-md-8 col-12 mb-2 mb-md-0">
        <div className="input-group">
          <span className="input-group-text">
            <FiSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search vehicles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setShowDriverList(!showDriverList)}
          >
            <FiFilter className="me-1" /> Filter
          </button>

          {/* Driver Filter List */}
          {showDriverList && (
            <div
              className="position-absolute bg-white border rounded shadow p-3 mt-1"
              style={{ zIndex: 1050, width: "100%" }}
            >
              <div className="d-flex justify-content-between">
                <strong className="mb-2 d-block">Filter by Driver</strong>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDriverList(false)}
                  // onClick={onApplyFilters}
                />
              </div>

              {assignedUsers.length === 0 ? (
                <div className="text-muted">No data found</div>
              ) : (
                assignedUsers.map((name, index) => (
                  <div key={index} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`driver-${index}`}
                      checked={selectedDrivers.includes(name)}
                      onChange={() => onDriverToggle(name)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`driver-${index}`}
                    >
                      {name}
                    </label>
                  </div>
                ))
              )}

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  className="btn btn-primary btn-sm"
                  size="sm"
                  onClick={() => {
                    setSelectedDrivers([]); // Clear all selections
                  }}
                >
                  Clear Filters
                </button>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={onApplyFilters}
                  disabled={assignedUsers.length === 0}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onRefresh}
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>
      <div className="col-md-4 col-12 text-md-end">
        <button
          className="btn btn-primary w-100 w-md-auto"
          onClick={onAddVehicle}
        >
          Register New Vehicle
        </button>
      </div>
    </div>
  );
};

export default VehicleToolbar;
