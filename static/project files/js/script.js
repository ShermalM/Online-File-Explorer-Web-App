
//loop through the children of tbody
const children = $('tbody').children();

//convert children object to an array
let children_array = [];
for(let i=0; i<children.length; i++){
    children_array.push(children[i]);
}

//build an array of objects
const items = [];
children_array.forEach(element => {
    const rowDetails = {
        name: element.getAttribute('data-name'),
        size: parseInt(element.getAttribute('data-size')),
        last_modified: parseInt(element.getAttribute('data-time')),
        html: element.outerHTML
    };
    items.push(rowDetails);
});

//Sort Status
const sortStatus = {
    name: 'none',       //none, up, down
//    size:,
 //   last_modified:
};

//functions to sort the array of objects
const sort_name = (items, option) => {
    items.sort((item1, item2) => {
        const name1 = item1.name.toUpperCase();
        const name2 = item2.name.toUpperCase();

        if(name1 < name2){
            return -1;
        }
        if(name1 > name2){
            return 1;
        }
        //equal names
        return 0;
    });
    if(option === 'down'){
        items.reverse();
    }
};

//fill table body with items
const fill_table_body = items => {
    const content = items.map(element => element.html).join('');
    $('tbody').html(content);
};


//event listeners
document.getElementById('table_head_row').addEventListener('click', event => {
    if(event.target){
        if(event.target.id === 'name'){
            //clear icons
            $('i').remove();

            if(['none','down'].includes(sortStatus.name)){
                //sort in ascending order
                sort_name(items,'up');
                sortStatus.name = 'up';
                //add icon
                event.target.innerHTML += '<i class="bi bi-arrow-up-circle-fill"></i>';
            }
            else if(sortStatus.name === 'up'){
                //sort in descending order
                sort_name(items,'down');
                sortStatus.name = 'down';
                //add icon
                event.target.innerHTML += '<i class="bi bi-arrow-down-circle-fill"></i>';
            }
            fill_table_body(items);
        }
    }
});