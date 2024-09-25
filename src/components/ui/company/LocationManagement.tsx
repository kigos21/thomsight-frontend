import React, { useState } from "react";
import styles from "./LocationManagement.module.scss";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";

interface Location {
  id: number;
  name: string;
}

const LocationManagement: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: "Makati, Philippines" },
    { id: 2, name: "Makati, Philippines" },
    {
      id: 3,
      name: "Makati, Philippines, Makati, Philippines, Makati, Philippines",
    },
    { id: 4, name: "Makati, Philippines" },
    { id: 5, name: "Makati, Philippines" },
    { id: 6, name: "Makati, Philippines" },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [newLocation, setNewLocation] = useState("");

  const handleAddLocation = () => {
    if (newLocation) {
      setLocations([...locations, { id: Date.now(), name: newLocation }]);
      setNewLocation("");
      setShowAddForm(false);
    }
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setShowEditDialog(true);
  };

  const handleUpdateLocation = () => {
    if (editingLocation) {
      setLocations(
        locations.map((loc) =>
          loc.id === editingLocation.id ? editingLocation : loc
        )
      );
      setShowEditDialog(false);
      setEditingLocation(null);
    }
  };

  const handleDeleteLocation = (id: number) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  return (
    <div className={styles.locationManagement}>
      <div className={styles.sectionHeading}>
        <h3>Company Location</h3>
        <button
          className={styles.addLocationButton}
          onClick={() => setShowAddForm(true)}
        >
          <IconPlus stroke={1.5} size={20} />
          <p>Add Location</p>
        </button>
      </div>

      {showAddForm && (
        <div className={styles.addForm}>
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Enter new location"
            className={styles.inputText}
          />
          <button
            onClick={() => setShowAddForm(false)}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button onClick={handleAddLocation} className={styles.saveButton}>
            Add
          </button>
        </div>
      )}

      {showEditDialog && editingLocation && (
        <div
          className={styles.dialogBackdrop}
          onClick={() => setShowEditDialog(false)}
        >
          <div
            className={styles.editDialog}
            onClick={(e) => e.stopPropagation()}
          >
            <h4>Edit Location</h4>
            <div className={styles.editForm}>
              <input
                type="text"
                value={editingLocation.name}
                onChange={(e) =>
                  setEditingLocation({
                    ...editingLocation,
                    name: e.target.value,
                  })
                }
              />
              <div className={styles.saveAndCancelButtons}>
                <button
                  onClick={() => setShowEditDialog(false)}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateLocation}
                  className={styles.saveButton}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.locationGrid}>
        {locations.map((location) => (
          <div key={location.id} className={styles.locationItem}>
            {location.name}
            <button
              className={styles.editButton}
              onClick={() => handleEditLocation(location)}
            >
              <IconEdit />
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteLocation(location.id)}
            >
              <IconTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationManagement;
