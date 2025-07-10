import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, FiMail, FiPhone, FiMapPin, 
  FiLock, FiCreditCard, FiBell, FiShield,
  FiClock, FiTruck, FiCheckCircle, FiEdit,FiPackage,FiCalendar
} from 'react-icons/fi';
import { useAuth } from '../../auth/AuthProvider'; 
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const { token, user, logOut} = useAuth();
  const role = user?.role || 'Guest'; // Default to 'Guest' if no role is found
  const username = user?.name || 'Guest'; // Default to 'Guest' if no username is found
  // Sample user data
  const User = {
    name: "Aarav Sharma",
    role: "Admin",
    email: "aarav.sharma@gasagency.com",
    phone: "+91 98765 43210",
    address: "123 Gas Plaza, MG Road, Bangalore, Karnataka - 560001",
    joinDate: "15 March 2020",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastLogin: "Today, 09:45 AM"
  };

  // Sample activity data
  const activities = [
    { id: 1, action: "Processed Order #GA-1287", time: "10 mins ago", icon: <FiTruck />, color: "text-primary" },
    { id: 2, action: "Updated inventory levels", time: "45 mins ago", icon: <FiPackage />, color: "text-info" },
    { id: 3, action: "Approved new customer", time: "2 hours ago", icon: <FiUser />, color: "text-success" },
    { id: 4, action: "Changed system settings", time: "Yesterday", icon: <FiShield />, color: "text-warning" },
    { id: 5, action: "Processed 15 orders", time: "2 days ago", icon: <FiCheckCircle />, color: "text-primary" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="container-fluid py-4">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="row"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="col-12 mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">My Profile</h1>
            <div className="text-muted">
              Last login: {User.lastLogin}
            </div>
          </div>
        </motion.div>

        {/* Left Column - Profile Card */}
        <motion.div variants={itemVariants} className="col-lg-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body text-center p-4">
              <div className="position-relative mx-auto" style={{ width: '120px', height: '120px' }}>
                <img 
                  src={User.avatar} 
                  alt="Profile" 
                  className="rounded-circle img-thumbnail border-primary w-100 h-100"
                />
                <button 
                  className="btn btn-sm btn-primary rounded-circle position-absolute bottom-0 end-0"
                  style={{ width: '36px', height: '36px' }}
                >
                  <FiEdit size={14} />
                </button>
              </div>
              
              <h3 className="mt-4 mb-1">{user.name}</h3>
              <span className="badge bg-primary-soft text-primary">{user.role}</span>
              
              <div className="d-flex justify-content-center gap-3 mt-4">
                <button className="btn btn-primary">
                  <FiEdit className="me-1" /> Edit Profile
                </button>
                <button className="btn btn-outline-secondary">
                  <FiLock className="me-1" /> Change Password
                </button>
              </div>
              
              <hr className="my-4" />
              
              <div className="text-start">
                <h6 className="mb-3 text-uppercase text-muted">Account Information</h6>
                
                <div className="d-flex align-items-start mb-3">
                  <FiMail className="mt-1 me-2 text-muted" />
                  <div>
                    <small className="text-muted">Email</small>
                    <p className="mb-0">{User.email}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-3">
                  <FiPhone className="mt-1 me-2 text-muted" />
                  <div>
                    <small className="text-muted">Phone</small>
                    <p className="mb-0">{User.phone}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start mb-3">
                  <FiMapPin className="mt-1 me-2 text-muted" />
                  <div>
                    <small className="text-muted">Address</small>
                    <p className="mb-0">{User.address}</p>
                  </div>
                </div>
                
                <div className="d-flex align-items-start">
                  <FiCalendar className="mt-1 me-2 text-muted" />
                  <div>
                    <small className="text-muted">Member Since</small>
                    <p className="mb-0">{User.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column - Content */}
        <motion.div variants={itemVariants} className="col-lg-8">
          {/* Tabs */}
          <div className="card shadow-sm mb-4">
            <div className="card-body p-2">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <FiUser className="me-1" /> Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <FiShield className="me-1" /> Account Settings
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'activity' ? 'active' : ''}`}
                    onClick={() => setActiveTab('activity')}
                  >
                    <FiClock className="me-1" /> Activity Log
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'profile' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="card shadow-sm mb-4"
            >
              <div className="card-header d-flex justify-content-between align-items-center">
                <h6 className="mb-0">Personal Information</h6>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setEditMode(!editMode)}
                >
                  {editMode ? 'Cancel' : 'Edit Information'}
                </button>
              </div>
              <div className="card-body">
                {editMode ? (
                  <form>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" defaultValue={user.name} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" defaultValue={User.email} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" defaultValue={User.phone} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" defaultValue={User.address} />
                      </div>
                    </div>
                    <div className="text-end">
                      <button type="button" className="btn btn-primary">Save Changes</button>
                    </div>
                  </form>
                ) : (
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-muted">Full Name</label>
                      <p className="fw-semibold">{user.name}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-muted">Email</label>
                      <p className="fw-semibold">{User.email}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-muted">Phone Number</label>
                      <p className="fw-semibold">{User.phone}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label text-muted">Address</label>
                      <p className="fw-semibold">{User.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card shadow-sm mb-4">
                <div className="card-header">
                  <h6 className="mb-0">Security Settings</h6>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                    <div>
                      <h6 className="mb-1">Password</h6>
                      <p className="small text-muted mb-0">Last changed 3 months ago</p>
                    </div>
                    <button className="btn btn-outline-primary">Change Password</button>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                    <div>
                      <h6 className="mb-1">Two-Factor Authentication</h6>
                      <p className="small text-muted mb-0">Add extra security to your account</p>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="2faSwitch" />
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1">Login Notifications</h6>
                      <p className="small text-muted mb-0">Get notified for new logins</p>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="notifSwitch" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card shadow-sm">
                <div className="card-header">
                  <h6 className="mb-0">Notification Preferences</h6>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="orderNotif" defaultChecked />
                      <label className="form-check-label" htmlFor="orderNotif">
                        New orders
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="deliveryNotif" defaultChecked />
                      <label className="form-check-label" htmlFor="deliveryNotif">
                        Delivery status updates
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="stockNotif" defaultChecked />
                      <label className="form-check-label" htmlFor="stockNotif">
                        Low stock alerts
                      </label>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="promoNotif" />
                      <label className="form-check-label" htmlFor="promoNotif">
                        Promotions and offers
                      </label>
                    </div>
                  </div>
                  <div className="text-end mt-3">
                    <button className="btn btn-primary">Save Preferences</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="card shadow-sm"
            >
              <div className="card-header">
                <h6 className="mb-0">Recent Activity</h6>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {activities.map(activity => (
                    <motion.li 
                      key={activity.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="list-group-item border-0 px-0 py-3"
                    >
                      <div className="d-flex">
                        <div className={`icon-shape icon-sm rounded-3 ${activity.color}-soft ${activity.color} me-3`}>
                          {activity.icon}
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{activity.action}</h6>
                          <p className="small text-muted mb-0">
                            <FiClock className="me-1" /> {activity.time}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                <button className="btn btn-outline-primary w-100 mt-3">Load More Activities</button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;