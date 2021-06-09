import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@material-ui/data-grid";
import { exportAccountList } from "../accountSlice";

export default function CustomToolbar({ dispatch }) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport onClick={() => dispatch(exportAccountList())} />
    </GridToolbarContainer>
  );
}
