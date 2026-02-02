
function formatData(card) {
    let {
    card_name,
    card_set_id,
    attribute,
    card_type,
    card_color,
    card_cost,
    card_power,
    card_text,
    sub_types,
    rarity,
    card_image
    } = card;


    document.getElementById("demo").innerHTML = rarity;
    if (!card_cost){
        card_cost = "0";
    }
    if (!card_power){
        card_power = "0000";
    }
    if (!attribute){
        attribute = "";
    }
    if (card_text === "NULL"){
        card_text = "";
    }
    if (!card_image){
        card_image = `./missingPictures/${card_set_id}.webp`;
        console.log(card_image);
    }
    
    document.getElementById("demo").innerHTML = `
        <strong>${card_name}</strong><br>
        Set: ${card_set_id}<br>    
        Type: ${card_type} <br>
        Color: ${card_color}<br>
        Cost: ${card_cost ?? "0"} <br>
        Power: ${card_power ?? "0000"}<br>
        Rarity: ${rarity}<br>
        Sub-types: ${sub_types}<br>
        Attribute: ${attribute}<br>
        Text: ${card_text}<br>
        <img src="${card_image}" alt="${card_name}" style="max-width: 200px;">
    `; 


}
