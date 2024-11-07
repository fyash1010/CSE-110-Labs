import { SetStateAction, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {
  const { budget, setBudget } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  // Fetch expenses on component mount
  useEffect(() => {
    loadBudget();
  }, []);
  
  // Function to load expenses and handle errors
  const loadBudget = async () => {
  try {
    const budget = await fetchBudget();
      setBudget(budget);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    updateBudget(newBudget);
    setBudget(newBudget);
    setIsEditing(false);
  };

  const handleInputChange = (e: any) => {
    setNewBudget(e.target.value);
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <div className="d-flex align-items-center">
          <input
            type="number"
            value={newBudget}
            onChange={handleInputChange}
            className="form-control me-2"
            style={{ width: '100px' }}
          />
          <button className="btn btn-success btn-sm" onClick={handleSaveClick}>
            Save  
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          <div>Budget: ${budget}</div>
          <button className="btn btn-primary btn-sm ms-3" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default Budget;
