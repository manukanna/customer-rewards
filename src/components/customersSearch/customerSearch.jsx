import {CustomerSearchPropTypes} from "../utils/proptypes";


export const CustomerSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="d-flex justify-content-end">
      <div className="my-3 col-3">
        <input
          type="text"
          className="form-control" 
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};


CustomerSearch.propTypes = CustomerSearchPropTypes;