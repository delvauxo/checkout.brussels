const fetch = require('node-fetch');

// URLs.
var url_1 = "https://check-out.webshopapp.com/nike-dunk-low-veneer.ajax" // US 5.5 (EU 38)
var url_2 = "https://check-out.webshopapp.com/air-jordan-1-high-japan-gs.ajax" // US 6.5Y (EU 39)
var url_3 = "https://check-out.webshopapp.com/nike-x-off-white-vapor-street-black-pink-w.ajax" // W US 9.5 / US 8 (EU 41)
var url_4 = "https://check-out.webshopapp.com/yeezy-700-v3-arzareth.ajax" // US 4.5 (EU 36 2/3)
var url_5 = "https://check-out.webshopapp.com/nike-x-off-white-air-force-1-td-volt.ajax" // US 1C (EU 16)

// Fetching and returning shoe size variants datas from URL.
fetch(url_4).then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {

            // Function returning shoe sizes sorted numerically.
            function shoeSizesSorted() {
                
                // Get shoe variants datas.
                let shoeVariants = data.variants;
                // console.log(shoeVariants);

                // Create new empty array.
                let variantsArray = new Array();
                for (const key in shoeVariants) {
                    // Store ID, SIZE and PRICE in array.
                    variantsArray.push([
                        shoeVariants[key].id, 
                        shoeVariants[key].title, 
                        shoeVariants[key].price.price_incl_money_without_currency
                    ]);
                }
                // console.log(variantsArray);

                // Create new empty array.
                let sizesArray = new Array();
                for (let i = 0; i <= variantsArray.length -1; i++){
                    // Store IDs in array.
                    sizesArray.push(variantsArray[i][1]);
                };
                // console.log(sizesArray);

                // Sorting product sizes.
                sizesArray.sort((a, b) => {
                    // As long as there is the letters "US", 
                    // followed by a space, followed by a floating point number, the regex will work.
                    return +a.match(/US\s([\d\.]*)/)[1] - +b.match(/US\s([\d\.]*)/)[1];
                });
                // console.log(sizesArray);

                // Create new empty array.
                let result = new Array();
                sizesArray.forEach(function(key) {
                    var found = false;
                    // Returns the elements of an array that meet the condition specified in a callback function.
                    variantsArray = variantsArray.filter(function(item) {
                        // Comparing variant sizes string equal sorted sizes string.
                        if(!found && item[1] == key) {
                            result.push(item);
                            found = true;
                            return false;
                        } else 
                            return true;
                    });
                })
                // console.log(result);
                return result;
            }
            
            // Call function.
            let finalResult = shoeSizesSorted();
            console.log(finalResult);
        });
    }
});