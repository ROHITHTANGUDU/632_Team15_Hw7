let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let searchEle = document.getElementById("search");
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
let quantity1 = document.querySelector('.quantity1');
let cartItemsEle = document.getElementById("cart-items");
let totalEle = document.getElementById("total");
let valueElement = document.getElementById("value");
let numberElement = document.getElementById("number");
let buttonelement = document.getElementById("button1");
let exp = document.getElementById("addhere");
let iconELement = document.getElementById("copyicon");
let copystatusEle = document.getElementById("copystatus");
let wholecart = document.getElementById("cart");
let selectboxEle = document.getElementById("selectbox");
let toggleEle = document.getElementById("customSwitch1");

const orderNowButton = document.getElementById("order-now-button");
let veg = document.getElementById("veg-container");
let booleanvalue = false;





$ = function (id) {
    return document.getElementById(id);
}

var show = function (id) {
    $(id).style.display = 'block';
    document.body.style.overflow = "hidden";

}
var hide = function (id) {
    document.body.style.overflow = "visible";
    $(id).style.display = 'none';
}

var hideCopy = function (id) {
    copystatusEle.textContent = "";
    document.body.style.overflow = "visible";
    $(id).style.display = 'none';
}

function copyToClipboard(element) {
    /* Copy text into clipboard */
    if (element == "#p1") {
        navigator.clipboard.writeText
            ("FoodMunch15");
        document.getElementById("copyicon1").classList.remove("fa-bounce");
    }
    if (element == "#p2") {
        navigator.clipboard.writeText
            ("FoodMunch25");
        document.getElementById("copyicon2").classList.remove("fa-bounce");
    }
    if (element == "#p3") {
        navigator.clipboard.writeText
            ("FoodMunch30");
        document.getElementById("copyicon3").classList.remove("fa-bounce");
    }


    copystatusEle.textContent = "copied";

}


let array = [
    {
        item: "Crispy Corn",
        imageUrl: "images/cripsy_corn.jpeg",
        cost: 10.00,
        category: "Starters",
        itemCategory: "veg"

    },
    {
        item: "Chicken Curry",
        imageUrl: "images/Chicken-Curry.webp",
        cost: 20.00,
        category: "Main course",
        itemCategory: "non-veg"
    },
    {
        item: "Chicken Biryani",
        imageUrl: "images/cb.jpeg",
        cost: 30.00,
        category: "Main course",
        itemCategory: "non-veg"
    },
    {
        item: "Veg Biryani",
        imageUrl: "images/veg-biryani-recipe.jpeg",
        cost: 30.00,
        category: "Main course",
        itemCategory: "veg"
    },
    {
        item: "Chilli mushroom",
        imageUrl: "images/cm.jpeg",
        cost: 25.00,
        category: "Starters",
        itemCategory: "veg"
    },
    {
        item: "Chicken pakodi",
        imageUrl: "images/cp.jpeg",
        cost: 33.00,
        category: "Starters",
        itemCategory: "non-veg"
    },
    {
        item: "Chilli paneer",
        imageUrl: "images/cpaneer.jpeg",
        cost: 21.00,
        category: "Starters",
        itemCategory: "veg"
    },
    {
        item: "Ice-cream",
        imageUrl: "images/Vanilla-Ice-Cream.webp",
        cost: 26.00,
        category: "Desserts",
        itemCategory: "veg"
    }, {
        item: "Cheesecake",
        imageUrl: "images/baked-cherry-cheesecake.jpeg",
        cost: 26.00,
        category: "Desserts",
        itemCategory: "non-veg"
    }

];
let cartItemsArray = [];
let updatedarray = array;

function filterMenuItems(category, itemCategory, toggleChecked) {
    return array.filter((each) => {
        if (category === "select") {
            // If category is "select", display only vegetarian items when toggle is true
            return toggleChecked ? each.itemCategory === "veg" : true;
        }

        if (!toggleChecked) {
            // If toggle is off, display items based on the selected category
            return each.category === category;
        }

        // If toggle is on, display items based on both category and itemCategory
        return each.category === category && each.itemCategory === itemCategory;
    });
}

selectboxEle.addEventListener("change", function (event) {


    updatedarray = filterMenuItems(event.target.value, "veg", toggleEle.checked);

    exp.innerHTML = "";

    for (let each of updatedarray) {
        addtomenu(each);
    }
});

toggleEle.addEventListener("click", function (event) {


    updatedarray = filterMenuItems(selectboxEle.value, "veg", event.target.checked);

    exp.innerHTML = "";

    for (let each of updatedarray) {
        addtomenu(each);
    }
});


searchEle.addEventListener("input", function (event) {

    let searchedarry = updatedarray.filter((each) => {
        return each.item.toLowerCase().includes(event.target.value.toLowerCase())
    })
    exp.innerHTML = "";

    for (let each of searchedarry) {
        addtomenu(each);
    }



})







for (let each of array) {
    addtomenu(each);
}

var checkoutCart = function (id) {
    const cartItemsJSON = JSON.stringify(cartItemsArray);
    localStorage.setItem("cartItems", cartItemsJSON);
    if (cartItemsArray.length > 0) {
        window.location.href = "checkout.html";
    }
    else {
        $(id).style.display = 'block';
        document.body.style.overflow = "hidden";
    }
}




var orderNow = function (id) {
    const cartItemsJSON = JSON.stringify(cartItemsArray);
    localStorage.setItem("cartItems", cartItemsJSON);
    if (cartItemsArray.length > 0) {
        window.location.href = "checkout.html";
    }
    else {
        $(id).style.display = 'block';
        document.body.style.overflow = "hidden";
    }
}

function addItemToCartArray(obj) {
    let cartItem = cartItemsArray.forEach(element => {
        if (element.item == obj.item) {
            element.count++;
            return element;
        }
    });

    if (!cartItem) {
        cartItem = { ...obj, count: 1 };
        cartItemsArray.push(cartItem);
    }
}

// function inCartBtnText(cartDetails) {
//     return ((cartDetails ? (cartDetails.count > 99 ? "99+" : cartDetails.count) : 0) + " in Cart");
// }

function getCartItem(itemName) {
    for (let item of cartItemsArray) {
        if (item.item == itemName) {
            return item;
        }
    }
}

function addtomenu(obj) {

    let costvalue = totalEle.textContent;
    let count;
    let { item, imageUrl, cost, itemCategory } = obj;
    let divelement1 = document.createElement("div");
    let divelement2 = document.createElement("div");
    divelement2.classList.add("h-100");
    let imageEle = document.createElement("img");

    let headerEle = document.createElement("h1");
    headerEle.textContent = item;
    if (itemCategory === "veg") {
        let greenDot = document.createElement("div");
        greenDot.classList.add("dot");
        greenDot.innerHTML = '<i class="fa-solid fa-circle fa-2xs circle" style="color: #17fd32;"></i>';
        headerEle.appendChild(greenDot);
    }
    else {
        let RedDot = document.createElement("div");
        RedDot.classList.add("dot");
        RedDot.innerHTML = '<i class="fa-solid fa-circle fa-2xs" style="color: #f21f07;"></i>';
        headerEle.appendChild(RedDot);

    }


    headerEle.classList.add("explore-menu-tittle");


    let buttonEle = document.createElement("button");
    buttonEle.textContent = "Add to Cart";
    buttonEle.value = obj.item
    buttonEle.classList.add("btn", "btn-primary");

    let cartDetails = null;

    let cartText = document.createElement("span");
    cartText.classList.add("btn", "ml-2", "bg-transprent");
    cartDetails = getCartItem(obj.item);
    cartText.textContent = inCartBtnText(cartDetails);

    function updateSubtotal(itemName, subTotalValue) {
        let subTotalElement = document.getElementById(`sub-${itemName}`);
        if (subTotalElement) {
            subTotalElement.textContent = `Sub-total: $${subTotalValue}`;
        }
    }

    buttonEle.addEventListener("click", function (event) {
        console.log(cartItemsArray.length);
        booleanvalue = true

        let parsednumber = parseInt(numberElement.textContent);
        let parsedvalue = parseInt(totalEle.textContent);
        let numberpara = document.getElementById(obj.item);
        let subTotalElement = document.createElement("p");
        subTotalElement.id = event.target.value
        let totaldivele = document.getElementById("finaltotal");

        let cartDetails = getCartItem(event.target.value);

        if (booleanvalue) {
            totaldivele.classList.add("d-block")
            totaldivele.classList.add( "ml-auto");
        }





        if (numberpara) {

            parsednumber++;
            numberElement.textContent = parsednumber;
            parsedvalue = parsedvalue + cost;
            totalEle.textContent = parsedvalue;
            let count = parseInt(numberpara.textContent);
            count++;



            numberpara.textContent = count;

            cartDetails.count = count;

            let subTotalValue = count * cost;
            updateSubtotal(obj.item, subTotalValue);
            // let subele = document.getElementById("sub");
            // subele.textContent = `Sub-total: $${count * cost}`;
            cartDetails = getCartItem(obj.item);
            if (cartDetails) {
                cartText.textContent = inCartBtnText(cartDetails);
            }

        }
        else {
            parsednumber++;
            numberElement.textContent = parsednumber;
            parsedvalue = parsedvalue + cost;
            totalEle.textContent = parsedvalue;
            let liElement = document.createElement("li");
            let imageELement = document.createElement("img");
            imageELement.src = imageUrl;
            imageELement.style.width = 60 + "px";
            imageELement.classList.add("round-image");
            let h5Element = document.createElement("h5");
            h5Element.textContent = item;
            if (obj.itemCategory === "veg") {
                let greenDot = document.createElement("div");
                greenDot.classList.add("dot1");
                greenDot.innerHTML = '<i class="fa-solid fa-circle fa-2xs circle" style="color: #17fd32;"></i>';
                h5Element.appendChild(greenDot);
            }
            else {
                let RedDot = document.createElement("div");
                RedDot.classList.add("dot1");
                RedDot.innerHTML = '<i class="fa-solid fa-circle fa-2xs" style="color: #f21f07;"></i>';
                h5Element.appendChild(RedDot);

            }

            h5Element.classList.add("h5-element", "h5width");
            let paraElement = document.createElement("p");
            paraElement.textContent = cost;
            paraElement.classList.add("h5-element");

            //count in cart
            let numberpara = document.createElement("p");
            let spanElement = document.createElement("span");
            spanElement.textContent = "$";
            numberpara.textContent = "1";
            numberpara.id = obj.item
            numberpara.classList.add("numberpara");
            spanElement.classList.add("spanele");

            addItemToCartArray(obj);

            subTotalElement.id = `sub-${obj.item}`;
            subTotalElement.textContent = `Sub-total: $${parseInt(numberpara.textContent) * cost}`;
            subTotalElement.classList.add("sub-total");


            //(-)Element
            // let minusElement = document.createElement("button");
            // minusElement.textContent = "-";
            // minusElement.classList.add("signbutton", "minus")
            // minusElement.addEventListener("click", function () {
            //     count = parseInt(numberpara.textContent);
            //     count--;
            //     numberpara.textContent = count;

            //     let parsednumber = parseInt(numberElement.textContent);
            //     if (parsednumber > 0) {
            //         parsednumber--;
            //         numberElement.textContent = parsednumber;
            //     }
            //     if (count >= 0) {
            //         let y = parseInt(totalEle.textContent);
            //         y = y - cost;
            //         totalEle.textContent = y;
            //         cartText.textContent = inCartBtnText(getCartItem(item));
            //     }
            //     let cartDetails = getCartItem(item);

            //     if (cartDetails && cartDetails.count > 0) {

            //         --cartDetails.count; // Decrease the count in the cart
            //         cartText.textContent = inCartBtnText(getCartItem(item));
            //     }

            //     if (count <= 0) {

            //         numberpara.textContent = "0";
            //         cartItemsEle.removeChild(liElement);
            //         cartItemsArray = cartItemsArray.filter(cartItem => cartItem.item !== item);

            //     }



            // })
            let minusElement = document.createElement("button");
            minusElement.textContent = "-";
            minusElement.classList.add("signbutton", "minus")
            minusElement.addEventListener("click", function () {
                count = parseInt(numberpara.textContent);
                count--;
                let totaldivele = document.getElementById("finaltotal");
                let currentNumber = parseInt(numberElement.textContent);
                if(currentNumber-1 === 0)
                {
                    console.log("none")
                  
                    totaldivele.classList.remove("d-block")
                }
                console.log("Totaldivele after:", totaldivele);

                if (count >= 0) {
                    let parsednumber = parseInt(numberElement.textContent);
                    if (parsednumber > 0) {
                        parsednumber--;
                        numberElement.textContent = parsednumber;
                    }

                    let y = parseInt(totalEle.textContent);
                    y = y - cost;
                    totalEle.textContent = y;

                    // Update the count and subtotal in the cart
                    numberpara.textContent = count;
                    let subTotalValue = count * cost;
                    subTotalElement.textContent = `Sub-total: $${subTotalValue}`;

                    let cartDetails = getCartItem(item);
                    cartDetails.count = count;

                    cartText.textContent = inCartBtnText(cartDetails);

                    if (count === 0) {
                        // If count becomes 0, remove the item from the cart
                        numberpara.textContent = "0";
                        cartItemsEle.removeChild(liElement);
                        cartItemsEle.removeChild(subTotalElement)
                        cartItemsArray = cartItemsArray.filter(cartItem => cartItem.item !== item);
                    }
                }
            });
            //(+)Element
            // let plusElement = document.createElement("button");
            // plusElement.textContent = "+";
            // plusElement.classList.add("signbutton");
            // plusElement.addEventListener("click", function () {
            //     count = parseInt(numberpara.textContent);
            //     count++;
            //     numberpara.textContent = count;
            //     let x = parseInt(totalEle.textContent);
            //     x = x + cost;
            //     totalEle.textContent = x;

            //     let parsednumber = parseInt(numberElement.textContent);
            //     parsednumber++;
            //     numberElement.textContent = parsednumber;
            //     cartText.textContent = inCartBtnText(getCartItem(item));
            //     let cartDetails = getCartItem(item);
            //     if (cartDetails && cartDetails.count >= 0) {

            //         cartDetails.count++; // Increase the count in the cart
            //         cartText.textContent = inCartBtnText(getCartItem(item));
            //     }

            // })
            let plusElement = document.createElement("button");
            plusElement.textContent = "+";
            plusElement.classList.add("signbutton");
            plusElement.addEventListener("click", function () {
                count = parseInt(numberpara.textContent);
                count++;

                let x = parseInt(totalEle.textContent);
                x = x + cost;
                totalEle.textContent = x;

                updateCountAndSubTotal(count);
            });

            function updateCountAndSubTotal(count) {
                numberpara.textContent = count;
                let cartDetails = getCartItem(item);

                if (count > 0) {
                    let subTotalValue = count * cost;
                    subTotalElement.textContent = `Sub-total: $${subTotalValue}`;
                    cartDetails.count = count;
                } else {
                    // If count is 0 or negative, remove the item from the cart
                    cartItemsEle.removeChild(liElement);
                    cartItemsArray = cartItemsArray.filter(cartItem => cartItem.item !== item);
                }

                cartText.textContent = inCartBtnText(cartDetails);
            }
            liElement.appendChild(imageELement);
            liElement.appendChild(h5Element);
            liElement.appendChild(spanElement);
            liElement.appendChild(paraElement);
            liElement.appendChild(minusElement);

            liElement.appendChild(numberpara);
            liElement.appendChild(plusElement);

            liElement.classList.add("d-flex", "flex-row", "mb-3", "list");
            cartItemsEle.appendChild(liElement);
            cartItemsEle.appendChild(subTotalElement)
            subTotalElement.classList.add("end")

            cartDetails = getCartItem(obj.item);
            cartText.textContent = inCartBtnText(cartDetails);

        }


    })
    imageEle.src = imageUrl;

    divelement1.classList.add("col-12", "col-md-6", "col-lg-3", "mb-3");
    divelement2.classList.add("explore-menu-card", "shadow", "mb-3");
    imageEle.classList.add("w-100", "image-border",);
    divelement2.appendChild(imageEle);
    divelement2.appendChild(headerEle);
    divelement2.appendChild(buttonEle);
    divelement2.appendChild(cartText);
    divelement1.appendChild(divelement2);
    exp.appendChild(divelement1);
    function inCartBtnText(cartDetails) {
        return ((cartDetails ? (cartDetails.count > 99 ? "99+" : cartDetails.count) : 0) + " in Cart");
    }

}



wholecart.addEventListener('click', () => {



    body.classList.add('active');
    openShopping.classList.add("none");
    quantity.classList.add("none");
    quantity1.classList.add("none");
    veg.classList.add("none");




})

closeShopping.addEventListener('click', () => {

    body.classList.remove('active');
    openShopping.classList.remove("none");
    quantity.classList.remove("none");
    quantity1.classList.remove("none");
    veg.classList.remove("none");
})


