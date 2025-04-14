// Class for group elements
class GroupElem {
  constructor(groupName) {
    this.groupName = groupName;
  }
  
  render() {
    // Create list item with jQuery
    const element = $("<li></li>").text(this.groupName);
    return element;
  }
}

// Class for item elements
class Item {
  constructor(name, price, image, description, group) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.description = description;
    this.group = group;
  }
  
  render() {
    // Create item div
    const element = $("<div></div>")
      .addClass("item")
      .attr("data-group", this.group);
    
    // Add name
    $("<h4></h4>").text(this.name).appendTo(element);
    
    // Add image
    $("<img>")
      .attr("src", this.image)
      .css({
        "width": "50px",
        "height": "50px",
        "display": "block",
        "margin": "10px 0"
      })
      .appendTo(element);
    
    // Add price
    $("<p></p>").text(this.price).appendTo(element);
    
    return element;
  }
}


$(document).ready(function() {
  // Function to generate category instances and fill the list
  function generateCategories() {
    // Extract unique groups
    const uniqueGroups = new Set();
    
    hannaShop.forEach(item => {
      if (!uniqueGroups.has(item.group)) {
        uniqueGroups.add(item.group);
        const groupElem = new GroupElem(item.group);
        $("#groups").append(groupElem.render());
      }
    });
    
    // Find the longest category name to set consistent width
    let maxWidth = 0;
    $("#groups li").each(function() {
      const width = $(this).width();
      if (width > maxWidth) {
        maxWidth = width;
      }
    });
    
    // Add a buffer to the max width
    $("#groups li").width(maxWidth + 30);
  }
  
  // Function to generate item instances and fill the itemsGallery
  function generateItems() {
    hannaShop.forEach(item => {
      const itemObj = new Item(item.name, item.price, item.image, item.descr, item.group);
      $("#itemsGallery").append(itemObj.render());
    });
  }
  
  // Generate categories and items
  generateCategories();
  generateItems();
  
  // Event delegation for category hover
$("#groups").on("mouseenter", "li", function() {
  const category = $(this).text();
  // Highlight the category item
  $(this).css({
    "background-color": "orange", 
    "font-weight": "bold",
    "box-shadow": "2px 2px 4px rgba(0,0,0,0.2)"
  });
  
  // Highlight related products
  $(".item").each(function() {
    if ($(this).attr("data-group") === category) {
      $(this).css("box-shadow", "0 0 10px #FF0000");
    }
  });
});

$("#groups").on("mouseleave", "li", function() {
  $(this).css({
    "background-color": "", 
    "font-weight": "normal",
    "box-shadow": "none"
  });
  $(".item").css("box-shadow", "none");
});
  // Event delegation for item click
  $("#itemsGallery").on("click", ".item", function() {
    const name = $(this).find("h4").text();
    const item = hannaShop.find(item => item.name === name);
    $("#itemDescr").text(item.descr);
  });
});