import { useState, useEffect } from "react";
import { FiBell, FiUser, FiSearch } from "react-icons/fi";
import PackageCard from "../components/PackageCard";

export default function Dashboard() {
  const [packages, setPackages] = useState([
    {
      id: 1,
      title: "Basic Portrait",
      price: "$299",
      duration: "1 hour",
      features: ["10 edited photos", "Studio session", "High-resolution files"],
      imageUrl: "/mnt/data/Screenshot 2025-11-24 182549.png",
    },
    {
      id: 2,
      title: "Wedding Premium",
      price: "$2499",
      duration: "8 hours",
      features: ["Full day coverage", "300+ edited photos", "Photobook included"],
      imageUrl: null,
    },
  ]);

  const [bookings] = useState([
    { id: 1, client: "Anna", event: "Wedding", date: "2025-11-30" },
    { id: 2, client: "Mark", event: "Birthday", date: "2025-11-28" },
    { id: 3, client: "Luna", event: "Studio Shoot", date: "2025-12-15" },
  ]);

  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  useEffect(() => {
    const today = new Date();
    const next7 = new Date(today);
    next7.setDate(today.getDate() + 7);

    const upcoming = bookings.filter((b) => {
      const d = new Date(b.date);
      return d >= today && d <= next7;
    });

    setNotifications(
      upcoming.map((b) => ({
        id: b.id,
        message: `${b.client}'s ${b.event} is coming up (${b.date})`,
        date: b.date,
      }))
    );
  }, [bookings]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [pkgName, setPkgName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [features, setFeatures] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function handleCreatePackage(e) {
    e.preventDefault();

    const newPkg = {
      id: Date.now(),
      title: pkgName,
      price: `$${price}`,
      duration,
      features: features.split("\n").filter((f) => f.trim() !== ""),
      imageUrl: imageUrl || null,
    };

    setPackages((prev) => [...prev, newPkg]);

    setPkgName("");
    setPrice("");
    setDuration("");
    setFeatures("");
    setImageUrl("");

    setShowAddModal(false);
  }

  function handleDelete(pkg) {
    if (!confirm(`Delete "${pkg.title}"? This can't be undone.`)) return;
    setPackages((prev) => prev.filter((p) => p.id !== pkg.id));
  }

  return (
    <div className="p-8 max-w-[1200px] mx-auto">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Photography Packages</h1>
          <p className="text-gray-500">Manage your studio packages and pricing</p>
        </div>

        <div className="flex items-center gap-6">

          <div className="relative">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-64">
              <FiSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none ml-2 w-full"
              />
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(!showNotifDropdown)}
              className="relative text-2xl"
            >
              <FiBell />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-[1px] rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {showNotifDropdown && (
              <div className="absolute right-0 mt-3 w-72 bg-white shadow-xl rounded-xl p-4 border animate-slideDown z-50">
                <h3 className="font-semibold text-lg mb-2">Notifications</h3>

                {notifications.length === 0 ? (
                  <p className="text-gray-500 text-sm">No upcoming events.</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 mb-2 bg-gray-100 rounded-lg border-l-4 border-purple-500"
                    >
                      <p className="text-sm">{n.message}</p>
                      <span className="text-xs text-gray-500">{n.date}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="text-2xl">
            <FiUser />
          </div>

        </div>
      </div>

      {/* Add Package Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-xl shadow hover:bg-purple-700 flex items-center gap-2"
        >
          <span className="text-2xl leading-none">＋</span> Add Package
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((p) => (
          <PackageCard
            key={p.id}
            title={p.title}
            price={p.price}
            duration={p.duration}
            features={p.features}
            imageUrl={p.imageUrl}
            onDelete={() => handleDelete(p)}
          />
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900/40 flex items-center justify-center z-[9999]">
          <div className="bg-white w-[480px] rounded-2xl shadow-xl p-6 relative animate-fadeIn">

            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-4">Add New Package</h2>

            <form onSubmit={handleCreatePackage} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Package Name *</label>
                <input
                  type="text"
                  value={pkgName}
                  onChange={(e) => setPkgName(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Price ($) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Duration *</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Features (one per line)</label>
                <textarea
                  rows="4"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold mt-3"
              >
                Create Package
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
