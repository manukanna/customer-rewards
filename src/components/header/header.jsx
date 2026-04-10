import "../utils/custome-styles.scss";

export const CustomerRewardsHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem("customerRewardsUserId");
    window.location.reload();
    }
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <span className="navbar-text fw-bold">
          Customer Rewards Summary
        </span>
        <span onClick={handleLogout} className="customer-cursor">
          Logout
        </span>
      </div>
    </nav>
  );
}