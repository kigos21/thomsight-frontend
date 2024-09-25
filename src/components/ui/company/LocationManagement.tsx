import React, { useEffect, useState } from "react";
import styles from "./LocationManagement.module.scss";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useParams, Navigate } from "react-router-dom";
import Spinner from "../Spinner";
import ErrorPage from "../../../pages/ErrorPage";
import { useCompanies } from "../../../contexts/CompaniesContext";
import { Location } from "../../../types/types";
import {
  addLocation,
  updateLocation,
  deleteLocation,
} from "../../../api/companyCRUD";

const LocationManagement: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [locations, setLocations] = useState<Location[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [newLocation, setNewLocation] = useState("");
  const { getCompanyBySlug, loading, error } = useCompanies();
  const company = getCompanyBySlug(slug || ""); // Provide a fallback

  useEffect(() => {
    if (company) {
      setLocations(company.locations || []);
    }
  }, [company]);

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <ErrorPage />;

  const handleAddLocation = async () => {
    if (newLocation && slug) {
      const response = await addLocation(slug, newLocation);
      if (response) {
        setLocations([...locations, response]);
        setNewLocation("");
        setShowAddForm(false);
      }
    }
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setShowEditDialog(true);
  };

  const handleUpdateLocation = async () => {
    if (editingLocation && slug) {
      const response = await updateLocation(
        slug,
        editingLocation.id,
        editingLocation.address
      );
      if (response) {
        setLocations(
          locations.map((loc) =>
            loc.id === editingLocation.id ? response : loc
          )
        );
        setShowEditDialog(false);
        setEditingLocation(null);
      }
    }
  };

  const handleDeleteLocation = async (id: number) => {
    if (slug) {
      await deleteLocation(slug, id);
      setLocations(locations.filter((loc) => loc.id !== id));
    }
  };

  if (!slug) {
    return <ErrorPage />;
  }

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
                value={editingLocation.address}
                onChange={(e) =>
                  setEditingLocation({
                    ...editingLocation,
                    address: e.target.value,
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
            {location.address}
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
