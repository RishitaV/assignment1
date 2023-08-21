<template>
  <div>
    <ag-grid-vue
      style="width: 90vw; height: 200px"
      class="ag-theme-alpine"
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
  props: ['books'],
  data() {
   return {
     columnDefs: [],
     rowData: [],
   };
 },
  created() {
    },
  async mounted() {
      this.columnDefs = [
        { headerName: "Name", field: "bName" },
        { headerName: "Issuer", field: "uName" },
        { headerName: "Due Date", field: "issueDate" },
        { headerName: "Issue Date", field: "dueDate" },
        { headerName: "Contact", field: "uContact" },
      ];
      this.rowData = this.books;        
  },
};
</script>
