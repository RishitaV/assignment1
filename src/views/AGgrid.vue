<template>
  <div>
    <ag-grid-vue
      style="width: 500px; height: 200px"
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
        { headerName: "Name", field: "title" },
        { headerName: "Available", field: "available" },
      ];
      this.rowData = this.books;        
  },
};
</script>
