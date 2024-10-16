import React, { useEffect, useState } from "react";
import styles from "./LocationManagement.module.scss";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
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
import ValidationError from "../../form/ValidationError";
import SuccessMessage from "../../form/SuccessMessage";

const LocationManagement: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [locations, setLocations] = useState<Location[]>([]);
  const { getCompanyBySlug, loading, error, updateCompany } = useCompanies();
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

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [createSuccess, setCreateSuccess] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);

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
    setCreateSuccess(false);
    setUpdateSuccess(false);
    setDeleteSuccess(false);

    if (slug) {
      const response = await addLocation(slug, newLocation);
      if (response) {
        const updatedCompany = {
          ...company!,
          locations: [...locations, response],
        };
        updateCompany(updatedCompany);
        setLocations([...locations, response]);
        setNewLocation("");
        setShowAddForm(false);
        setCreateErrorMessage(null);
        setCreateSuccess(true);
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
    setCreateSuccess(false);
    setUpdateSuccess(false);
    setDeleteSuccess(false);

    if (editingLocation && slug) {
      const response = await updateLocation(
        slug,
        editingLocation.id,
        editingLocation.address
      );
      if (response) {
        const updatedLocations = locations.map((loc) =>
          loc.id === editingLocation.id ? response : loc
        );
        const updatedCompany = { ...company!, locations: updatedLocations };
        updateCompany(updatedCompany);
        setLocations(updatedLocations);
        setShowEditDialog(false);
        setEditingLocation(null);
        setEditErrorMessage(null);
        setUpdateSuccess(true);
      }
      setUpdateLoading(false);
    }
  };

  const handleDeleteClick = (locationId: number) => {
    setLocationToDelete(locationId);
    setShowDeletePopup(true);
  };

  const handleDeleteLocation = async () => {
    setDeleteLoading(true);
    setCreateSuccess(false);
    setUpdateSuccess(false);
    setDeleteSuccess(false);
    if (locationToDelete && slug) {
      await deleteLocation(slug, locationToDelete);
      const updatedLocations = locations.filter(
        (loc) => loc.id !== locationToDelete
      );
      const updatedCompany = { ...company!, locations: updatedLocations };
      updateCompany(updatedCompany);
      setLocations(updatedLocations);
      setShowDeletePopup(false);
      setLocationToDelete(null);
      setDeleteLoading(false);
      setDeleteSuccess(true);
    }
  };

  if (!slug) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.locationManagement}>
      {createLoading && <Spinner message="Creating location..." />}
      {updateLoading && <Spinner message="Updating location..." />}
      {deleteLoading && <Spinner message="Deleting locaiton..." />}
      {createSuccess && (
        <SuccessMessage message="Location created successfully" />
      )}
      {updateSuccess && (
        <SuccessMessage message="Location updated successfully" />
      )}
      {deleteSuccess && (
        <SuccessMessage message="Location deleted successfully" />
      )}
      <div className={styles.sectionHeading}>
        <h3>Company Location</h3>
        <button
          className={styles.addLocationButton}
          onClick={() => {
            setCreateSuccess(false);
            setUpdateSuccess(false);
            setDeleteSuccess(false);
            setShowAddForm(true);
          }}
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
          <div className={styles.saveAndCancelButtons}>
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
        </div>
      )}
      {createErrorMessage && <ValidationError message={createErrorMessage} />}

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
                <ValidationError message={editErrorMessage} />
              )}
              <div className={styles.saveAndCancelButtonsPopUp}>
                <button
                  onClick={() => {
                    setShowEditDialog(false);
                    setEditErrorMessage(null);
                  }}
                  className={styles.cancelButtonPopUp}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateLocation}
                  className={styles.saveButtonPopUp}
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
              onClick={() => {
                setCreateSuccess(false);
                setUpdateSuccess(false);
                setDeleteSuccess(false);
                handleEditLocation(location);
              }}
            >
              <IconEdit className={styles.iconEdit} />
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => {
                setCreateSuccess(false);
                setUpdateSuccess(false);
                setDeleteSuccess(false);
                handleDeleteClick(location.id);
              }}
            >
              <IconTrash className={styles.iconDelete} />
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
