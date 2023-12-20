import { useParams } from "react-router-dom";

const CurrencyPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default CurrencyPage;
