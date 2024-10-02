import React, { useEffect, useState } from "react";
import styles from "./LocationManagement.module.scss";
import {
  IconAlertCircle,
  IconEdit,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import ErrorPage from "../../../pages/ErrorPage";
import { useCompanies } from "../../../contexts/CompaniesContext";
import { Location } from "../../../types/types";
import {
  addLocation,
  updateLocation,
  deleteLocation,
} from "../../../api/companyCRUD";
import DeletePopUp from "./DeletePopUp";

const LocationManagement: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [locations, setLocations] = useState<Location[]>([]);
  const { getCompanyBySlug, loading, error } = useCompanies();
  const company = getCompanyBySlug(slug || "");
  const [createErrorMessage, setCreateErrorMessage] = useState<string | null>(
    null
  );
  const [editErrorMessage, setEditErrorMessage] = useState<string | null>(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [newLocation, setNewLocation] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<number | null>(null);

  const [createLoading, setCreateLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    if (company) {
      setLocations(company.locations || []);
    }
  }, [company]);

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <ErrorPage />;

  const handleAddLocation = async () => {
    if (!newLocation.trim()) {
      setCreateErrorMessage("Location cannot be blank.");
      return;
    }

    setCreateLoading(true);

    if (slug) {
      const response = await addLocation(slug, newLocation);
      if (response) {
        setLocations([...locations, response]);
        setNewLocation("");
        setShowAddForm(false);
        setCreateErrorMessage(null);
      }
    }
    setCreateLoading(false);
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setShowEditDialog(true);
  };

  const handleUpdateLocation = async () => {
    if (editingLocation && !editingLocation.address.trim()) {
      setEditErrorMessage("Location address cannot be blank.");
      return;
    }

    setUpdateLoading(true);

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
        setEditErrorMessage(null);
      }
      setUpdateLoading(false);
    }
  };

  const handleDeleteClick = (locationId: number) => {
    setLocationToDelete(locationId);
    setShowDeletePopup(true);
  };

  const handleDeleteLocation = async () => {
    if (locationToDelete && slug) {
      await deleteLocation(slug, locationToDelete);
      setLocations(locations.filter((loc) => loc.id !== locationToDelete));
      setShowDeletePopup(false);
      setLocationToDelete(null);
    }
  };

  if (!slug) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.locationManagement}>
      {createLoading && <Spinner message="Creating location..." />}
      {updateLoading && <Spinner message="Updating location..." />}
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
            onClick={() => {
              setShowAddForm(false);
              setNewLocation("");
              setCreateErrorMessage(null);
            }}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button onClick={handleAddLocation} className={styles.saveButton}>
            Add
          </button>
        </div>
      )}
      {createErrorMessage && (
        <div className={styles.errorMessage}>
          <IconAlertCircle
            stroke={1.5}
            size={20}
            className={styles.errorIcon}
          />
          <p>{createErrorMessage}</p>
        </div>
      )}

      {showEditDialog && editingLocation && (
        <div
          className={styles.dialogBackdrop}
          onClick={() => {
            setShowEditDialog(false);
            setEditErrorMessage(null);
          }}
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
              {editErrorMessage && (
                <div className={styles.errorMessage}>
                  <IconAlertCircle
                    stroke={1.5}
                    size={20}
                    className={styles.errorIcon}
                  />
                  <p>{editErrorMessage}</p>
                </div>
              )}
              <div className={styles.saveAndCancelButtons}>
                <button
                  onClick={() => {
                    setShowEditDialog(false);
                    setEditErrorMessage(null);
                  }}
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
              onClick={() => handleDeleteClick(location.id)}
            >
              <IconTrash />
            </button>
          </div>
        ))}
      </div>

      {showDeletePopup && (
        <DeletePopUp
          isVisible={showDeletePopup}
          onClose={() => setShowDeletePopup(false)}
          onDelete={handleDeleteLocation}
          heading="Delete Location"
          details="Are you sure you want to delete this location?"
        />
      )}
    </div>
  );
};

export default LocationManagement;
