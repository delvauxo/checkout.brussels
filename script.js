<script>

function countProperties(obj) {
    var count = 0;

    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            ++count;
    }

    return count;
}

// PRELOAD collection images.
// @params : myUrls[]
function preloader(myUrls) {
    var myImages = new Array()
    function preload() {
        for (i = 0; i < preload.arguments.length; i++) {
            myImages[i] = new Image()
            myImages[i].src = preload.arguments[i]
        }
    }
    preload.apply(null, myUrls);
}

// Delaying preloading until after the page loads. 
// To do this, we simply wrap the script in a function and use addLoadEvent() to make it work.
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

// Simulate a click on the first <li> element of the collection's list.
function simulateMainFrameFirstLiClick() {
  if(document.querySelector('#checkout-collection-products-container > ul > li')) {
    // console.log(document.querySelector('#checkout-collection-products-container > ul > li'));
    document.querySelector('#checkout-collection-products-container > ul > li figure > img').click();
  }
}

// Get Main Frame Image.
var $mainFrameImage = document.getElementById("MainFrameImage");
// console.log($mainFrameImage);
// Get product available CONTAINER.
var $productAvailableContainer = document.getElementById("checkout-product-available-container");
// console.log($productAvailableContainer);
// Get buy now BUTTON.
var $buttonBuyNowForm = document.getElementById("product_configure_form");
// console.log($buttonBuyNowForm);
// Get buy now BUTTON action URL.
if (typeof($buttonBuyNowForm) != 'undefined' && $buttonBuyNowForm != null) {
    var $buttonBuyNowFormActionURL = $buttonBuyNowForm.getAttribute("action");
    // console.log($buttonBuyNowFormActionURL);
}
// Get price to show element if product is available.
if(document.getElementById("checkout-product-available-price")) {
    var $priceShow = document.getElementById("checkout-product-available-price").children;
    // console.log($priceShow);
}
// Get title to show element.
if (document.getElementById("checkout-product-title-main-container")) {
    var $titleShow = document.getElementById("checkout-product-title-main-container").children;
    // console.log($titleShow);
}
// Get size to show element.
if (document.getElementById("checkout-product-size")) {
    var $sizeShow = document.getElementById("checkout-product-size");
    // console.log($sizeShow[0]);
}


function myFunction() {
    // On clicked image.
    document.addEventListener('click', function(e) {
        e = e || window.event;
         var target = e.target; 
        if(target.className == 'checkout-img-clicked'){

            // Reset Cart button display.
            $productAvailableContainer.classList.remove("checkout-product-available-on");
            $productAvailableContainer.classList.add("checkout-product-available-off");

            // Get clicked image Src.
            var clickedImgSrc = target.getAttribute('data-src');
            // console.log(clickedImgSrc);

            // Replace MainFrameImage's SRC with the just clicked image.
            // NATIVE JS.
            // $mainFrameImage.src = clickedImgSrc;
            // JQUERY (with fade effect).
            $('#MainFrameImage').fadeOut(100, function() {
                $("#MainFrameImage").attr('src', clickedImgSrc);
            }).fadeIn(200);

            // Get clicked image Variant title.
            var $ClickedImgVariantTitle = target.parentNode.parentNode.parentNode.getElementsByClassName('checkout-product-title')[0];
            // Get attribute.
            var $ClickedImgVariantTitleAttr = $ClickedImgVariantTitle.getAttribute("data-product-title");
            // console.log($ClickedImgVariantTitleAttr);

            // Get clicked image Variant SIZE title.
            var $ClickedImgVariantSizeTitle = target.parentNode.parentNode.parentNode.getElementsByClassName('checkout-product-variant-title')[0];
            // console.log($ClickedImgVariantSizeTitle);
            // Get attribute.
            var $ClickedImgVariantSizeTitleAttr = $ClickedImgVariantSizeTitle.getAttribute("data-product-variant-title");
            // console.log($ClickedImgVariantSizeTitleAttr);
            // Set product size to show if product is available.
            // $sizeShow.innerHTML = $ClickedImgVariantSizeTitleAttr;

            // Get clicked image vid product value.
            var $ClickedImgVariantVid = target.parentNode.parentNode.parentNode.getElementsByClassName('checkout-product-vid')[0];
            // Get attribute.
            var $ClickedImgVariantVidAttr = $ClickedImgVariantVid.getAttribute("data-product-vid");
            // console.log($ClickedImgVariantVidAttr);
            
            // Get clicked image URL product value.
            var $ClickedImgVariantUrl = target.parentNode.parentNode.parentNode.getElementsByClassName('checkout-product-url')[0];
            // Get attribute.
            var ClickedImgVariantUrlAttr = $ClickedImgVariantUrl.getAttribute("data-product-url");
            // Remove '.html'
            var ClickedImgVariantUrlNoExtension = ClickedImgVariantUrlAttr.split('.html')[0];
            // console.log(ClickedImgVariantUrlNoExtension);

            // Set buy now BUTTON action URL with clicked product VID.
            $buttonBuyNowForm.action = $buttonBuyNowFormActionURL + $ClickedImgVariantVidAttr;

            // Get product price value.
            var $ClickedImgVariantPriceValue = target.parentNode.parentNode.parentNode.getElementsByClassName('prod-card__price')[0].textContent;
            // console.log($ClickedImgVariantPriceValue);

            // Set product price to show if product is available.
            $priceShow[0].innerHTML = $ClickedImgVariantPriceValue;

            // Get product title value.
            var $ClickedImgVariantTitleValue = target.parentNode.parentNode.parentNode.getElementsByClassName('checkout-product-title')[0].textContent;
            // console.log($ClickedImgVariantTitleValue);

            // Set product title to show.
            $titleShow[0].innerHTML = $ClickedImgVariantTitleValue;

            // Set class 'is-active' on product card of the clicked element.
            var $productCardActive = document.getElementsByClassName('is-active');
            // console.log($productCardActive);
            if ($productCardActive.length == 1) {
                $productCardActive[0].classList.remove("is-active");
                target.parentNode.parentNode.parentNode.classList.add("is-active");
            } else {
                target.parentNode.parentNode.parentNode.classList.add("is-active");
            }

            // FETCHING DATAS.
            var url = `https://check-out.webshopapp.com/product/${ClickedImgVariantUrlNoExtension}.ajax`;

            fetch(url).then(function(response) {
            // console.log(response);
              if(response.ok) {
                response.json().then(function(data) {
                    // Do something.
                    console.log(data);
                    console.log(data.variants);
                    // Get product brand element.
                    var $productBrand = document.getElementById('checkout-product-brand');
                    // Setting brand's product title.
                    $productBrand.innerHTML = data.brand.title;

                    // Function returning shoe sizes sorted numerically.
                    function shoeSizesSort() {
                        
                        // Get shoe variants datas.
                        let shoeVariants = data.variants;
                        // console.log(shoeVariants);

                        // Create new empty array.
                        let variantsArray = new Array();
                        for (const key in shoeVariants) {
                            // Store ID, SIZE, PRICE and STOCK availability in array.
                            variantsArray.push([
                                shoeVariants[key].id, 
                                shoeVariants[key].title, 
                                shoeVariants[key].price.price_incl_money_without_currency,
                                shoeVariants[key].stock.on_stock
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
                    var shoeSizesSorted = shoeSizesSort();
                    // console.log(shoeSizesSorted);

                    // Create sizes to display in template.
                    var htmlSize = '';
                    for (const key in shoeSizesSorted) {
                        // Set variant NAME (size) in variable.
                        var productVariantSizeTitle = shoeSizesSorted[key][1].split('Size : ')[1];
                        // Set variant ID in variable.
                        var productVariantId = shoeSizesSorted[key][0];
                        // Set variant PRICE in variable.
                        var productVariantPrice = shoeSizesSorted[key][2];
                        // Set variant STOCK in variable.
                        var productVariantStock = shoeSizesSorted[key][3];
                        // Insert <input> into HTML.
                        htmlSize += `<input type="button" `;
                        htmlSize += `id="select-${productVariantId}" `;
                        htmlSize += `class="checkout-product-selected-size flex-item" `;
                        htmlSize += `variantId="${productVariantId}" `;
                        htmlSize += `value="${productVariantSizeTitle}" `;
                        htmlSize += `data-select-product-price="${productVariantPrice}" `;
                        htmlSize += `data-select-product-stock="${productVariantStock}" `;
                        htmlSize += `onclick="clickButtonUpdateDatasOnPage()"`;
                        htmlSize += `>`;

                    }

                    // Insert SIZE to show in HTML.
                    $sizeShow.innerHTML = htmlSize;
                });
              } else {
              console.log('Network error.');
              }
            })
            .catch(function(error) {
             console.log('Fetch operation failed: ' + error.message);
            })
        }
    }, {once: true});
}

// Getting CURRENT URL.
// `https://check-out.webshopapp.com/collection/.ajax + ?[filter params]`
var filterUrlFetch = window.location.protocol + "//" + window.location.host + window.location.pathname + '.ajax' + window.location.search
// console.log(filterUrlFetch);

// FETCHING DATAS.
fetch(filterUrlFetch).then(function(response) {
  // console.log(response);
  if(response.ok) {
    response.json().then(function(data) {
        // Do something.
        console.log(data);
        // ON SCROLL TO BOTTOM OF <UL>.
        var scrollRequestCount = data.page;
        $('#checkout-collection-products-container').on('scroll', function() {
            if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                if (scrollRequestCount < data.pages) {
                    // alert('End of DIV is reached!');
                    // Increase the products page number.
                    scrollRequestCount++;
                    // console.log('page count : ' + scrollRequestCount);
                    // Fetch next page datas.
                    var filterUrlFetchPage = window.location.protocol + "//" + window.location.host + window.location.pathname + 'page' + scrollRequestCount + '.ajax' + window.location.search
                    // console.log(filterUrlFetchPage);
                    // FETCH DATA FOR EACH PAGE.
                    fetch(filterUrlFetchPage).then(response => {
                        // console.log(response);
                        if (response.ok) {
                            response.json().then(data => {
                                console.log(data);
                                // If products exists.
                                if(data.products) {
                                    // console.log(data.products);
                                    // Init new array for new images to be preloaded.
                                    var myNewUrls = [];
                                    for (var i = 0; i < data.products.length; i++) {
                                        // Getting 300x300 size image product URL.
                                        var dataProductImage300 = data.products[i].image.replace("50x50x2", "300x300x2");
                                        // console.log(dataProductImage300);
                                        // Getting FULL size image product URL.
                                        var dataProductImageFull = data.products[i].image.replace("50x50x2", "");
                                        // console.log(dataProductImageFull);
                                        var html = '';
                                        html += `<li class="col-6 col-3@md">`;
                                        html += `<div class="prod-card checkout-prod-card-effect-hover">`;
                                        html += `<div class="prod-card__img-wrapper">`;
                                        html += `<!-- <a href="${data.products[i].url}"> -->`;
                                        html += `<figure class="media-wrapper media-wrapper--3:4 bg-contrast-lower">`;
                                        html += `<img class="checkout-img-clicked" src="${dataProductImage300}" data-src="${dataProductImageFull}" title="${data.products[i].fulltitle}" onclick="myFunction()">`;
                                        html += `</figure>`;
                                        html += `<!-- </a> -->`;
                                        html += `<div class="prod-card__img-overlay"></div>`;
                                        html += `</div>`;
                                        html += `<div class="padding-sm text-center checkout-collection-products-infos-hide">`;
                                        // Product name.
                                        html += `<h1 class="text-base margin-bottom-xs ">`;
                                        html += `<a href="${data.products[i].url}" class="product-card__title checkout-product-title">`;
                                        html += `${data.products[i].title}`;
                                        html += `</a>`;
                                        html += `</h1>`;
                                        // Product ID.
                                        html += `<div class="margin-bottom-xs checkout-product-id" data-product-id="${data.products[i].id}">ID - ${data.products[i].id}</div>`;
                                        // Product VID.
                                        html += `<div class="margin-bottom-xs checkout-product-vid" data-product-vid="${data.products[i].vid}">VID - ${data.products[i].vid}</div>`;
                                        // Product URL. <====== VERIFY IF SHORT URL IS NEEDED instead of FULL URL.
                                        html += `<div class="margin-bottom-xs checkout-product-url" data-product-url="${data.products[i].url}">URL - ${data.products[i].url}</div>`;
                                        // Product PRICE.
                                        html += `<div class="margin-bottom-xs checkout-product-price" data-product-price="${data.products[i].price.price}">`;
                                        html += `<ins class="prod-card__price">0,00 EUR</ins>`;
                                        html += `</div>`;
                                        // Product AVAILABLE.
                                        if (data.products[i].available) {
                                            html += `<div class="margin-bottom-xs checkout-product-available-yes">`;
                                        } else {
                                            html += `<div class="margin-bottom-xs checkout-product-available-no">`;
                                        }
                                        html += `</div>`;
                                        // Product VARIANT TITLE.
                                        html += `<div class="margin-bottom-xs checkout-product-variant-title" data-product-variant-title="${data.products[i].variant}">${data.products[i].variant}</div>`;
                                        html += `</div>`;
                                        html += `</div>`;
                                        html += `</li>`;
                                        // Add products at the end of the current list.
                                        $('#checkout-collection-products-container > ul li:last-of-type').after(html);
                                        // Preload new full size images.
                                        myNewUrls.push(dataProductImageFull);
                                        // console.log(myNewUrls);
                                        // Preload Collections original size images.
                                        addLoadEvent(preloader(myNewUrls));
                                    }
                                }
                            })
                        } else {
                            console.log('Network error.');
                        }
                    })
                    .catch(function(error) {
                        console.log('Fetch operation failed: ' + error.message);
                    })
                    // DISPLAY NAME (for example) OF EACH PRODUCT OF CURRENT PAGE.
                }
            }
        });
    });
  } else {
  console.log('Network error.');
  }
})
.catch(function(error) {
 console.log('Fetch operation failed: ' + error.message);
})


// Getting current CART URL.
if (document.getElementById('product_configure_form')) {
    var currentCartURL = document.getElementById('product_configure_form').action;
    // console.log(currentCartURL.split('add/'));
}

function clickButtonUpdateDatasOnPage() {
    
    // On selected size.
    document.addEventListener('click', function(e) {
        e = e || window.event;
         var target = e.target; 
        // Get variant ID.
        var SelectedVariantID = target.getAttribute("variantId");
        // Get cart URL.
        var rawCartURL = currentCartURL.split('add/')[0];
        var newCartURL = rawCartURL + 'add/' + SelectedVariantID;
        // console.log(newCartURL);
        // Set selected product variant ID on add cart URL button.
        document.getElementById('product_configure_form').action = newCartURL;
        // Get price
        var newPrice = document.getElementById(`select-${SelectedVariantID}`).getAttribute('data-select-product-price');
        // console.log('selected product price : ' + newPrice);
        // Get all sizes elements.
        var myBtnCheck = document.querySelectorAll('.checkout-product-selected-size');
        // Remove any existing disabled state for size select.
        if (myBtnCheck) {
            for (var i = 0; i < myBtnCheck.length; i++) {
                var disabled = myBtnCheck[i].hasAttribute('disabled');
                if (disabled) {
                    myBtnCheck[i].removeAttribute('disabled');
                }
            }
        }
        //  Set disabled state on selected size btn.
        document.getElementById(`select-${SelectedVariantID}`).setAttribute('disabled', 'true');
        // Set selected product size price.
        $priceShow[0].innerHTML = newPrice + ' EUR';
        // Get product availability status.
        var $ClickedImgVariantAvailabilityStatus = target.getAttribute("data-select-product-stock");
        // If product is AVAILABLE show add to cart button.
        if ($ClickedImgVariantAvailabilityStatus == 'true') {
            $productAvailableContainer.classList.remove("checkout-product-available-off");
            $productAvailableContainer.classList.remove("checkout-product-available-on");
            $productAvailableContainer.classList.add("checkout-product-available-on");
        } else {
            $productAvailableContainer.classList.remove("checkout-product-available-off");
            $productAvailableContainer.classList.remove("checkout-product-available-on");
            $productAvailableContainer.classList.add("checkout-product-available-off");
        }
    }, {once: true});
}


// ON DOCUMENT READY.
$(document).ready(function() { 

///////// REDIRECTION.
// // Get Canonical URL from header.
// var $canUrl = document.querySelector("head > link[rel='canonical']");
// var canUrlValue = $canUrl.getAttribute("href");
// console.log(canUrlValue);
// // Make a redirection if not on page :
// // collection
// // cart
// // checkout
// if (!(canUrlValue == 'https://check-out.webshopapp.com/collection/' || canUrlValue == 'https://check-out.webshopapp.com/cart/' || canUrlValue == 'https://check-out.webshopapp.com/checkout/onestep/')) {
//     window.location.href = "https://check-out.webshopapp.com/collection/";
// }

// Set First result on main frame.
simulateMainFrameFirstLiClick();


// Get Collection's images.
var collectionList = $('#checkout-collection-products-container > ul li figure img');
// console.log(collectionList);
var myUrls = [];
for (var i = 0; i < collectionList.length; i++) {
    myUrls.push(collectionList[i].attributes[10].nodeValue);
}

// Preload Collections original size images.
addLoadEvent(preloader(myUrls));

});

</script>