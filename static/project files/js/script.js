
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
    name: 'none',               //none, up, down
    size: 'none',               //none, up, down
    last_modified: 'none'       //none, up, down
};

//functions to sort the array of objects
const sort = (items, option, type) => {
    items.sort((item1, item2) => {
        let value1, value2;
        if(type === 'name'){
            value1 = item1.name.toUpperCase();
            value2 = item2.name.toUpperCase();
        }else if(type === 'size'){
            value1 = item1.size;
            value2 = item2.size;
        }else{
            value1 = item1.last_modified;
            value2 = item2.last_modified;
        }

        if(value1 < value2){
            return -1;
        }
        if(value1 > value2){
            return 1;
        }
        //equal values
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
            //clear icons
            $('i').remove();

            if(['none','down'].includes(sortStatus[event.target.id])){      //event.target.id either name, size, last_modified
                //sort in ascending order
                sort(items,'up', event.target.id);
                sortStatus[event.target.id] = 'up';
                //add icon
                event.target.innerHTML += '<i class="bi bi-arrow-up-circle-fill"></i>';
            }
            else if(sortStatus[event.target.id] === 'up'){
                //sort in descending order
                sort(items,'down', event.target.id);
                sortStatus[event.target.id] = 'down';
                //add icon
                event.target.innerHTML += '<i class="bi bi-arrow-down-circle-fill"></i>';
            }
            fill_table_body(items);
    }
});