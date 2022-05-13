import Loader from "react-loader-spinner";
import { styles } from "../../constants/styles";
import { getData } from "../../common-lib/lib";

export const LoaderSpinner = ({ type = "Oval", width = 50, height = 50 }) => {
  return (
    <Loader
      type={type}
      color={getData(styles, ["common", "loader"])}
      width={width}
      height={height}
    />
  );
};
