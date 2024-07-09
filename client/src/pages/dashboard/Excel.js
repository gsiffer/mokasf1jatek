import { useAppContext } from "../../context/appContext";

const Excel = () => {
  const { getExcel } = useAppContext();

  return (
    <button type="button" className="btn btn-height" onClick={() => getExcel()}>
      Convert to Excel
    </button>
  );
};

export default Excel;
