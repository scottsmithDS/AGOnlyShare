'use strict';

const columnDefs = [
    {headerName: "Price", field: "price"},
];
// filter types
const FILTER_TYPES = {
    number: 'agNumberColumnFilter',
    string: 'agTextColumnFilter'
};

const gridDiv = document.querySelector('#myGrid');

const loadData = (source) => {


    fetch("data/" + source + ".json")
        .then(response => response.json())
        .then(json => {

            const rowData = [];

            /** Generate column definitions from data keys **/
            const firstRow = json[ Object.keys(json)[0] ];
            const columnDefs = Object.keys(firstRow).map(key => ({'headerName': key, 'field': key, sortable : true, filter : FILTER_TYPES[typeof firstRow[key]], filterParams: {filterOptions: ['equals', 'notEqual', 'contains', 'notContains', 'startsWith', 'endsWith', 'lessThan', 'lessThanOrEqual', 'greaterThan', 'greaterThanOrEqual', 'inRange', 'empty']} }) );

            /** original JSON data are hash { id: {..data}}.
             * ag-grid require array
             * convert hash to array
             */
            Object.keys(json).map(key => {
                const obj = json[key];
                obj.id = key;
                rowData.push( obj )
            });

            // let the grid know which columns and what data to use
            const gridOptions = {
                columnDefs,
                rowData
            };

            const gridDiv = document.querySelector('#myGrid');
            gridDiv.innerHTML = ""

            const grid = new agGrid.Grid(gridDiv, gridOptions)

        });

}

const selectSource = (e) => {

    if (e.target.value !== '') {
        loadData(e.target.value)
    }
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {

    agGrid.LicenseManager.setLicenseKey("For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-1_August_2020_[v2]_MTU5NjIzNjQwMDAwMA==a2b78cead8a2b63a91ab007e2627e795");

    const sourceSelector = document.querySelector('#source');
    sourceSelector.addEventListener ("change", selectSource);

    // loadData('Ecuador')

});

// function getSelectedRows() {
//     var selectedNodes = gridOptions.api.getSelectedNodes()
//     var selectedData = selectedNodes.map( function(node) { return node.data })
//     var selectedDataStringPresentation = selectedData.map( function(node) { return node.make + ' ' + node.model }).join(', ')
//     alert('Selected nodes: ' + selectedDataStringPresentation)}