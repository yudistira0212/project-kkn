"use client";
interface ViewUserButtonProps {
  albumId: number;
}
const ViewUserButton: React.FC<ViewUserButtonProps> = ({ albumId }) => {
  const handleClick = () => alert(`user id: ${albumId}`);
  return (
    <>
      <button onClick={handleClick}>Lihat User</button>
    </>
  );
};
export default ViewUserButton;
