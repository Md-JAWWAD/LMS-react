import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function DataTable({dataRow, dataColumn}) {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={dataRow}
        columns={dataColumn}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
}
