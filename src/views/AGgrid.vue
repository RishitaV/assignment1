<template>
  <div>
    <ag-grid-vue
      class="ag-theme-alpine grid"
      :columnDefs="columnDefs"
      :rowData="rowData"
    />
  </div>
</template>

<script>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";

export default {
  name: "AGgrid",
  components: {
    AgGridVue,
  },
  props: ["books"],
  data() {
    return {
      columnDefs: [],
      rowData: [],
    };
  },
  mounted() {
    this.columnDefs = [
      { headerName: "Name", field: "bookName" },
      { headerName: "Issuer", field: "userName" },
      { headerName: "Due Date", field: "bookIssueDate" },
      { headerName: "Issue Date", field: "bookDueDate" },
      { headerName: "Contact", field: "userContact" },
    ];
    this.rowData = this.books;
  },
};
</script>

<style scoped>
.grid {
  width: 90vw;
  height: 200px;
}
</style>
