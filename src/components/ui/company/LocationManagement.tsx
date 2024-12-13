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
import { toast } from "react-toastify";
import EditLocationPopup from "./AddLocationPopup";

const LocationManagement: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [locations, setLocations] = useState<Location[]>([]);
  const { getCompanyBySlug, loading, error, updateCompany } = useCompanies();
  const company = getCompanyBySlug(slug as string);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  // const [newLocation, setNewLocation] = useState("");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState<number | null>(null);

  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [showAddPopup, setShowAddPopup] = useState(false);

  useEffect(() => {
    if (slug) {
      const fetchedCompany = getCompanyBySlug(slug);
      if (fetchedCompany) {
        setLocations(fetchedCompany.locations || []);
      }
    }
  }, [slug, getCompanyBySlug]);

  if (loading)
    return <Spinner message="Please wait while we render relevant data!" />;
  if (error) return <ErrorPage />;

  const handleAddLocation = async (address: string) => {
    if (!address.trim()) {
      toast.error("Location cannot be blank.");
      return;
    }
    if (address.length > 48) {
      toast.error("Location should not exceed 48 characters");
      return;
    }

    setCreateLoading(true);

    if (slug) {
      const response = await addLocation(slug, address);
      if (response) {
        const updatedCompany = {
          ...company!,
          locations: [...locations, response],
        };
        updateCompany(updatedCompany);
        setLocations([...locations, response]);
        setShowAddPopup(false);
        toast.success("Location added successfully");
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
      toast.error("Location address cannot be blank.");
      return;
    }
    if (editingLocation && editingLocation.address.length > 48) {
      toast.error("Location should not exceed 48 characters");
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
        const updatedLocations = locations.map((loc) =>
          loc.id === editingLocation.id ? response : loc
        );
        const updatedCompany = { ...company!, locations: updatedLocations };
        updateCompany(updatedCompany);
        setLocations(updatedLocations);
        setShowEditDialog(false);
        setEditingLocation(null);
        toast.success("Location updated successfully");
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
      toast.success("Location deleted successfully");
    }
  };

  return (
    <div className={styles.locationManagement}>
      {createLoading && <Spinner message="Creating location..." />}
      {updateLoading && <Spinner message="Updating location..." />}
      {deleteLoading && <Spinner message="Deleting location..." />}
      <div className={styles.sectionHeading}>
        <h3>Company Location</h3>
        <button
          className={styles.addLocationButton}
          onClick={() => {
            setShowAddPopup(true);
          }}
        >
          <IconPlus stroke={1.5} size={20} />
          <p>Add Location</p>
        </button>
      </div>

      {showAddPopup && (
        <EditLocationPopup
          isOpen={showAddPopup}
          onClose={() => setShowAddPopup(false)}
          onSave={handleAddLocation}
          initialAddress=""
        />
      )}

      {showEditDialog && editingLocation && (
        <div
          className={styles.dialogBackdrop}
          onClick={() => {
            setShowEditDialog(false);
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
              <div className={styles.saveAndCancelButtonsPopUp}>
                <button
                  onClick={() => {
                    setShowEditDialog(false);
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
                handleEditLocation(location);
              }}
            >
              <IconEdit className={styles.iconEdit} />
            </button>
            <button
              className={styles.deleteButton}
              onClick={() => {
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
