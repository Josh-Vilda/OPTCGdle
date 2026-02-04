
function formatData(card) {
    let {
    card_name,
    card_set_id,
    attribute,
    card_color,
    card_cost,
    card_power,
    card_text,
    sub_types,
    rarity,
    card_image,
    counter_amount
    } = card;


//DEALING WITH PARENTHESES IN CARD NAMES     
    console.log(card_name);
    card_name = card_name.replace(/\(([^)]*)\)/g, (match, inner) => {

        if (/\d/.test(inner) || /(FILM|Parallel|Winner|Tournament|Premium|Alternate|Reprint )/i.test(inner)) {
            return ""; // drop this whole (...) part
        }
        return match; // keep other parentheses
    }).trim();

//DEALING WITH P-XXX (X being any digit)    
    card_name = card_name.replace(' - '+card_set_id, "").trim();

    card_color = card_color.replace(' ','/');
    if (!card_cost){
        card_cost = "0";
    }
    if (!card_power){
        card_power = "0";
    }
    if (!attribute){
        attribute = "";
    }
    if (card_text === "NULL" || !card_text){
        card_text = "";
    }
    if (!card_image){
        card_image = `./missingPictures/${card_set_id}.webp`;
    }

    sub_types = formatCardType(sub_types);


    document.getElementById("demo").innerHTML = `
        <strong>${card_name}</strong><br>
        Set: ${card_set_id}<br>
        Color: ${card_color}<br>
        Cost: ${card_cost ?? "0"} <br>
        Power: ${card_power ?? "0"}<br>
        Counter: ${counter_amount ?? "0"}<br>  
        Rarity: ${rarity}<br>
        Sub-types: ${sub_types}<br>
        Attribute: ${attribute}<br>
        Text: ${card_text}<br>
        <img src="${card_image}" alt="${card_name}" style="max-width: 200px;">
    `; 
}

function formatCardType(type) {
    const subtypes = [
        "Accino Family",
        "Alabasta",
        "Alchemi",
        "Alvida Pirates",
        "Amazon Lily",
        "Animal",
        "Animal Kingdom Pirates",
        "Arlong Pirates",
        "Asuka Island",
        "Baroque Works",
        "Barto Club",
        "Baterilla",
        "Beautiful Pirates",
        "Bellamy Pirates",
        "Big Mom Pirates",
        "Biological Weapon",
        "Black Cat Pirates",
        "Blackbeard Pirates",
        "Blackbeard Pirates Allies",
        "Bluejam Pirates",
        "Bonney Pirates",
        "Botanist",
        "Bowin Island",
        "Brownbeard Pirates",
        "Buggy Pirates",
        "Buggy's Delivery",
        "CP0",
        "CP6",
        "CP7",
        "CP9",
        "Caribou Pirates",
        "Celestial Dragons",
        "Cross Guild",
        "Crown Island",
        "Donquixote Pirates",
        "Drake Pirates",
        "Dressrosa",
        "Drum Kingdom",
        "East Blue",
        "Egghead",
        "Eldoraggo Crew",
        "Evil Black Drum Kingdom",
        "FILM",
        "Fake Straw Hat Crew",
        "Fallen Monk Pirates",
        "Firetank Pirates",
        "Fish-Man",
        "Fish-Man Island",
        "Five Elders",
        "Flevance",
        "Flying Pirates",
        "Foolshout Island",
        "Former Arlong Pirates",
        "Former Baroque Works",
        "Former Big Mom Pirates",
        "Former CP9",
        "Former Navy",
        "Former Rocks Pirates",
        "Former Roger Pirates",
        "Former Rolling Pirates",
        "Former Rumbar Pirates",
        "Former Whitebeard Pirates",
        "Foxy Pirates",
        "Frost Moon Village",
        "GERMA 66",
        "Galley-La Company",
        "Gasparde Pirates",
        "Giant",
        "Goa Kingdom",
        "Golden Lion Pirates",
        "Grantesoro",
        "Gyro Pirates",
        "Happosui Army",
        "Hawkins Pirates",
        "Heart Pirates",
        "Homies",
        "Impel Down",
        "Jailer Beast",
        "Jaya",
        "Jellyfish Pirates",
        "Journalist",
        "Kid Pirates",
        "King of the Pirates",
        "Kingdom of GERMA",
        "Kingdom of Prodence",
        "Kouzuki Clan",
        "Krieg Pirates",
        "Kuja Pirates",
        "Kurozumi Clan",
        "Land of Wano",
        "Long Ring Long Land",
        "Lulucia Kingdom",
        "Lunarian",
        "Mary Geoise",
        "Mecha Island",
        "Merfolk",
        "Minks",
        "Monkey Mountain Alliance",
        "Monsters",
        "Mountain Bandits",
        "Muggy Kingdom",
        "Mugiwara Chase",
        "Music",
        "Navy",
        "Neo Navy",
        "Neptunian",
        "New Fish-Man Pirates",
        "New Giant Pirates",
        "ODYSSEY",
        "Ohara",
        "Omatsuri Island",
        "On-Air Pirates",
        "Peachbeard Pirates",
        "Plague",
        "Punk Hazard",
        "Red-Haired Pirates",
        "Revolutionary Army",
        "Rocks Pirates",
        "Roger Pirates",
        "Rumbar Pirates",
        "SMILE",
        "SWORD",
        "Sabaody Archipelago",
        "Scientist",
        "Seraphim",
        "Shandian Warrior",
        "Shipbuilding Town",
        "Sky Island",
        "Smile",
        "Sniper Island",
        "Spade Pirates",
        "Sprite",
        "Straw Hat Crew",
        "Supernovas",
        "The Akazaya Nine",
        "The Flying Fish Riders",
        "The Four Emperors",
        "The Franky Family",
        "The House of Lambs",
        "The Moon",
        "The Pirates Fest",
        "The Seven Warlords of the Sea",
        "The Sun Pirates",
        "The Tontattas",
        "The Vinsmoke Family",
        "Thriller Bark Pirates",
        "Treasure Pirates",
        "Trump Pirates",
        "Vassals",
        "Water Seven",
        "Weevil's Mother",
        "Whitebeard Pirates Allies",
        "Whitebeard Pirates",
        "Whole Cake Island",
        "Windmill Village",
        "World Government",
        "World Pirates",
        "Yonta Maria Fleet"
    ];

    const sortedSubtypes = [...subtypes].sort((a, b) => b.length - a.length);

    const found = [];
    let remaining = type;

    for (const st of sortedSubtypes) {
        if (remaining.includes(st)) {
            found.push(st);
            // Remove the matched subtype from remaining so it can't be matched again
            remaining = remaining.replace(st, "").trim();
        }
    }

    if (found.length === 0) return type;
    return found.join("/");
}



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function numberFormat(nb){
    if (nb <10){
        return "00"+nb;
    }
    else if(nb<100){
       return "0"+nb; 
    }
    else{
        return nb;
    }
}